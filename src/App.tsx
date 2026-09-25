/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { GAMES_CATALOG } from './data/games';
import { Game, GameCategory, CloakPreset } from './types/game';
import { Header } from './components/Header';
import { GameCard } from './components/GameCard';
import { GamePlayer } from './components/GamePlayer';
import { CustomGameModal } from './components/CustomGameModal';
import { CloakDisguise } from './components/CloakDisguise';
import { SettingsModal } from './components/SettingsModal';
import { safeStorage } from './utils/storage';
import {
  Gamepad2,
  Play,
  ArrowUpDown,
  Bookmark,
  Code2
} from 'lucide-react';

export default function App() {
  const [activeGame, setActiveGame] = useState<Game | null>(null);
  const [category, setCategory] = useState<GameCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'popular' | 'rating' | 'newest' | 'az'>('popular');

  // Local storage state: Favorites
  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const saved = safeStorage.getItem('nova_arcade_favorites');
      return saved ? JSON.parse(saved) : ['polytrack'];
    } catch {
      return ['polytrack'];
    }
  });

  // Local storage state: Custom games
  const [customGames, setCustomGames] = useState<Game[]>(() => {
    try {
      const saved = safeStorage.getItem('nova_arcade_custom_games');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Modals & Cloak State
  const [isCustomModalOpen, setIsCustomModalOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isCloakActive, setIsCloakActive] = useState(false);
  const [cloakPreset, setCloakPreset] = useState<CloakPreset>(() => {
    return (safeStorage.getItem('nova_arcade_cloak_preset') as CloakPreset) || 'classroom';
  });
  const [panicKey, setPanicKey] = useState<string>(() => {
    return safeStorage.getItem('nova_arcade_panic_key') || ']';
  });

  // Save favorites & custom games
  useEffect(() => {
    safeStorage.setItem('nova_arcade_favorites', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    safeStorage.setItem('nova_arcade_custom_games', JSON.stringify(customGames));
  }, [customGames]);

  useEffect(() => {
    safeStorage.setItem('nova_arcade_cloak_preset', cloakPreset);
  }, [cloakPreset]);

  useEffect(() => {
    safeStorage.setItem('nova_arcade_panic_key', panicKey);
  }, [panicKey]);

  // Global hotkeys: Panic Key & Search shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Toggle Cloak with panicKey
      if (e.key === panicKey) {
        e.preventDefault();
        setIsCloakActive((prev) => !prev);
        return;
      }

      // Quick search focus with '/'
      if (e.key === '/' && document.activeElement?.tagName !== 'INPUT' && document.activeElement?.tagName !== 'TEXTAREA') {
        e.preventDefault();
        const searchInput = document.querySelector<HTMLInputElement>('header input[type="text"]');
        searchInput?.focus();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [panicKey]);

  const handleToggleFavorite = useCallback((id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  }, []);

  const handleSaveCustomGame = useCallback((newGame: Game) => {
    setCustomGames((prev) => [newGame, ...prev]);
    setActiveGame(newGame);
  }, []);

  const handleClearData = useCallback(() => {
    safeStorage.removeItem('nova_arcade_favorites');
    safeStorage.removeItem('nova_arcade_custom_games');
    setFavorites([]);
    setCustomGames([]);
  }, []);

  // Combine built-in games and custom games
  const allGames = useMemo(() => {
    return [...customGames, ...GAMES_CATALOG];
  }, [customGames]);

  // Filter & sort
  const filteredGames = useMemo(() => {
    return allGames
      .filter((game) => {
        // Category filter
        if (category === 'favorites') {
          if (!favorites.includes(game.id)) return false;
        } else if (category === 'custom') {
          if (!game.isCustom) return false;
        } else if (category !== 'all') {
          if (game.category !== category) return false;
        }

        // Search query filter
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchTitle = game.title.toLowerCase().includes(q);
          const matchCategory = game.category.toLowerCase().includes(q);
          const matchDesc = game.description.toLowerCase().includes(q);
          return matchTitle || matchCategory || matchDesc;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'popular') return b.plays - a.plays;
        if (sortBy === 'rating') return b.rating - a.rating;
        if (sortBy === 'newest') return b.releaseYear - a.releaseYear;
        return a.title.localeCompare(b.title);
      });
  }, [allGames, category, searchQuery, sortBy, favorites]);

  // Featured game for the hero banner when in 'all' category without search query
  const featuredGame = useMemo(() => {
    return allGames[0] || null;
  }, [allGames]);

  return (
    <div className="min-h-screen bg-[#06080e] text-slate-100 flex flex-col font-sans selection:bg-cyan-500/25 selection:text-cyan-200">
      {/* Panic Cloak Fullscreen Disguise */}
      {isCloakActive && (
        <CloakDisguise
          preset={cloakPreset}
          hotkey={panicKey}
          onRestore={() => setIsCloakActive(false)}
        />
      )}

      {/* Main Header */}
      <Header
        currentCategory={category}
        onSelectCategory={(cat) => {
          setCategory(cat);
          if (activeGame) setActiveGame(null);
        }}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onOpenCustomModal={() => setIsCustomModalOpen(true)}
        onOpenSettings={() => setIsSettingsOpen(true)}
        onTriggerCloak={() => setIsCloakActive(true)}
        onGoHome={() => {
          setActiveGame(null);
          setCategory('all');
          setSearchQuery('');
        }}
        isHome={activeGame === null}
        favoritesCount={favorites.length}
        customGamesCount={customGames.length}
        panicKey={panicKey}
      />

      {/* Main Body View */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 py-6">
        {activeGame ? (
          /* Active Game Iframe Player */
          <GamePlayer
            game={activeGame}
            onBack={() => setActiveGame(null)}
            isFavorite={favorites.includes(activeGame.id)}
            onToggleFavorite={handleToggleFavorite}
            onSelectRelatedGame={(related) => setActiveGame(related)}
            allGames={allGames}
          />
        ) : (
          /* Game Catalog & Directory */
          <div className="space-y-8">
            {/* Featured Hero Showcase (Shown when browsing All without search) */}
            {category === 'all' && !searchQuery && featuredGame && (
              <section className="relative rounded-2xl overflow-hidden border border-white/[0.08] bg-[#0a0e18] shadow-2xl group">
                {/* Background Ambient Artwork with Fade */}
                {featuredGame.thumbnailUrl && (
                  <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                    <img
                      src={featuredGame.thumbnailUrl}
                      alt={featuredGame.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover opacity-20 filter blur-sm scale-105 group-hover:scale-110 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#0a0e18] via-[#0a0e18]/90 to-transparent" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0e18] via-transparent to-[#0a0e18]/40" />
                  </div>
                )}

                <div className="relative z-10 p-6 sm:p-10 flex flex-col lg:flex-row items-center justify-between gap-8">
                  {/* Left: Info & Launch */}
                  <div className="max-w-xl space-y-4">
                    {/* Unboxed Metadata Kicker (Anti-Pill Discipline) */}
                    <div className="flex items-center gap-2 text-xs font-mono tracking-wider uppercase text-cyan-400 font-semibold">
                      <span>Featured Title</span>
                      <span aria-hidden="true" className="text-slate-600">·</span>
                      <span className="text-slate-300 capitalize">{featuredGame.category}</span>
                      <span aria-hidden="true" className="text-slate-600">·</span>
                      <span className="text-amber-400 font-medium">★ {featuredGame.rating.toFixed(2)}</span>
                    </div>

                    <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight text-balance">
                      {featuredGame.title}
                    </h1>

                    <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-lg">
                      {featuredGame.description}
                    </p>

                    <div className="flex items-center gap-3 pt-2">
                      <button
                        onClick={() => setActiveGame(featuredGame)}
                        className="px-6 py-2.5 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold text-sm tracking-wide shadow-lg shadow-cyan-500/20 transition-all hover:scale-[1.02] cursor-pointer flex items-center gap-2"
                      >
                        <Play className="w-4 h-4 fill-current ml-0.5" />
                        <span>Play Now</span>
                      </button>
                      <button
                        onClick={(e) => handleToggleFavorite(featuredGame.id, e)}
                        className={`px-4 py-2.5 rounded-xl border text-sm font-medium transition-all cursor-pointer flex items-center gap-2 ${
                          favorites.includes(featuredGame.id)
                            ? 'bg-amber-500/15 text-amber-400 border-amber-500/30'
                            : 'bg-white/[0.04] hover:bg-white/[0.08] text-slate-300 border-white/10'
                        }`}
                      >
                        <Bookmark className={`w-4 h-4 ${favorites.includes(featuredGame.id) ? 'fill-current' : ''}`} />
                        <span>{favorites.includes(featuredGame.id) ? 'Bookmarked' : 'Bookmark'}</span>
                      </button>
                    </div>
                  </div>

                  {/* Right: High-Res Interactive Visual Card */}
                  <div
                    onClick={() => setActiveGame(featuredGame)}
                    className="w-full lg:w-96 aspect-video rounded-xl overflow-hidden border border-white/10 shadow-2xl relative cursor-pointer group/preview hover:border-cyan-500/50 transition-all"
                  >
                    {featuredGame.thumbnailUrl ? (
                      <img
                        src={featuredGame.thumbnailUrl}
                        alt={featuredGame.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover/preview:scale-105 transition-transform duration-500 ease-out"
                      />
                    ) : (
                      <div className="w-full h-full bg-slate-900 flex items-center justify-center font-mono font-bold text-cyan-400 text-xl">
                        {featuredGame.title}
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80" />
                    <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs">
                      <span className="font-semibold text-white tracking-wide flex items-center gap-1.5">
                        <Play className="w-3.5 h-3.5 fill-cyan-400 text-cyan-400" />
                        Click to Launch
                      </span>
                      <span className="font-mono text-cyan-300 text-[11px]">
                        {featuredGame.releaseYear}
                      </span>
                    </div>
                  </div>
                </div>
              </section>
            )}

            {/* Catalog Controls Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/[0.06] pb-3.5">
              <div>
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  <span className="capitalize">
                    {category === 'all'
                      ? 'Catalog'
                      : category === 'favorites'
                      ? 'Your Favorites'
                      : category === 'custom'
                      ? 'Custom Embeds'
                      : `${category} Games`}
                  </span>
                  <span className="text-xs font-mono text-slate-400 font-normal">
                    ({filteredGames.length})
                  </span>
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  High-performance unblocked games with instant loading and native keyboard controls
                </p>
              </div>

              {/* Sort by dropdown */}
              <div className="flex items-center gap-2 self-start sm:self-auto text-xs">
                <span className="text-slate-400 flex items-center gap-1">
                  <ArrowUpDown className="w-3.5 h-3.5 text-slate-500" />
                  Sort:
                </span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="bg-[#0c101b] border border-white/10 rounded-lg px-2.5 py-1 text-slate-200 text-xs font-medium focus:outline-none focus:border-cyan-500 cursor-pointer"
                >
                  <option value="popular">Most Popular</option>
                  <option value="rating">Highest Rated</option>
                  <option value="newest">Release Year</option>
                  <option value="az">Alphabetical A-Z</option>
                </select>
              </div>
            </div>

            {/* Games Grid - Sleek 3-Column Minimalist Presentation */}
            {filteredGames.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredGames.map((game) => (
                  <GameCard
                    key={game.id}
                    game={game}
                    isFavorite={favorites.includes(game.id)}
                    onToggleFavorite={handleToggleFavorite}
                    onPlayGame={(g) => setActiveGame(g)}
                  />
                ))}
              </div>
            ) : allGames.length === 0 ? (
              /* All Games Cleared State */
              <div className="bg-[#0a0e18] border border-white/[0.08] rounded-2xl p-10 text-center max-w-lg mx-auto my-8 shadow-2xl">
                <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 mx-auto mb-4">
                  <Gamepad2 className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-white text-base mb-1.5">No Games In Catalog</h3>
                <p className="text-xs text-slate-400 mb-6 leading-relaxed max-w-sm mx-auto">
                  Embed any web game, iframe snippet, or HTML project directly into your personal sandbox.
                </p>
                <div className="flex items-center justify-center">
                  <button
                    onClick={() => setIsCustomModalOpen(true)}
                    className="px-4 py-2 rounded-lg bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold text-xs cursor-pointer transition-colors flex items-center justify-center gap-2"
                  >
                    <Code2 className="w-4 h-4" />
                    <span>Embed Game / Iframe</span>
                  </button>
                </div>
              </div>
            ) : (
              /* Filter / Search Empty State */
              <div className="bg-[#0a0e18] border border-white/[0.08] rounded-2xl p-12 text-center max-w-md mx-auto my-8">
                <div className="w-11 h-11 rounded-xl bg-slate-800 flex items-center justify-center text-slate-400 mx-auto mb-3">
                  <Gamepad2 className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-white text-base mb-1">No Games Found</h3>
                <p className="text-xs text-slate-400 mb-4 leading-relaxed">
                  {searchQuery
                    ? `No matches found for "${searchQuery}". Try searching for another keyword or check another category.`
                    : category === 'favorites'
                    ? "You haven't bookmarked any games yet! Click the bookmark icon on any game card to add it here."
                    : category === 'custom'
                    ? "No custom games embedded yet. Click 'Embed' to load any URL or paste HTML."
                    : 'No games available in this category.'}
                </p>
                {category === 'custom' && (
                  <button
                    onClick={() => setIsCustomModalOpen(true)}
                    className="px-4 py-2 rounded-lg bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold text-xs cursor-pointer transition-colors"
                  >
                    Embed Custom Game
                  </button>
                )}
              </div>
            )}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-white/[0.06] mt-16 py-6 text-center text-xs text-slate-400">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-mono font-bold text-white">NOVA ARCADE</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span>Minimalist Unblocked Gaming Sandbox</span>
          </div>
          <div className="flex items-center gap-4 text-slate-400 text-xs">
            <button
              onClick={() => setIsSettingsOpen(true)}
              className="hover:text-slate-200 transition-colors cursor-pointer"
            >
              Preferences
            </button>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <button
              onClick={() => setIsCloakActive(true)}
              className="hover:text-rose-300 transition-colors cursor-pointer"
            >
              Quick Cloak ({panicKey})
            </button>
          </div>
        </div>
      </footer>

      {/* Custom Game Embed Modal */}
      {isCustomModalOpen && (
        <CustomGameModal
          isOpen={isCustomModalOpen}
          onClose={() => setIsCustomModalOpen(false)}
          onSaveCustomGame={handleSaveCustomGame}
        />
      )}

      {/* Settings Modal */}
      {isSettingsOpen && (
        <SettingsModal
          isOpen={isSettingsOpen}
          onClose={() => setIsSettingsOpen(false)}
          preset={cloakPreset}
          onChangePreset={setCloakPreset}
          panicKey={panicKey}
          onChangePanicKey={setPanicKey}
          onClearData={handleClearData}
        />
      )}
    </div>
  );
}

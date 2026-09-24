/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import { GAMES_CATALOG } from './data/games';
import { Game, GameCategory, CloakPreset } from './types/game';
import { Header } from './components/Header';
import { GameCard } from './components/GameCard';
import { GamePlayer } from './components/GamePlayer';
import { CustomGameModal } from './components/CustomGameModal';
import { CloakDisguise } from './components/CloakDisguise';
import { SettingsModal } from './components/SettingsModal';
import {
  Gamepad2,
  Flame,
  Star,
  Clock,
  Sparkles,
  ArrowUpDown,
  Bookmark,
  Shield,
  Code2,
  RefreshCw
} from 'lucide-react';

export default function App() {
  const [activeGame, setActiveGame] = useState<Game | null>(null);
  const [category, setCategory] = useState<GameCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'popular' | 'rating' | 'newest' | 'az'>('popular');

  // Local storage state: Favorites
  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('nova_arcade_favorites');
      return saved ? JSON.parse(saved) : ['openttd-online'];
    } catch {
      return ['openttd-online'];
    }
  });

  // Local storage state: Custom games
  const [customGames, setCustomGames] = useState<Game[]>(() => {
    try {
      const saved = localStorage.getItem('nova_arcade_custom_games');
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
    return (localStorage.getItem('nova_arcade_cloak_preset') as CloakPreset) || 'classroom';
  });
  const [panicKey, setPanicKey] = useState<string>(() => {
    return localStorage.getItem('nova_arcade_panic_key') || ']';
  });

  // Save favorites & custom games
  useEffect(() => {
    localStorage.setItem('nova_arcade_favorites', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem('nova_arcade_custom_games', JSON.stringify(customGames));
  }, [customGames]);

  useEffect(() => {
    localStorage.setItem('nova_arcade_cloak_preset', cloakPreset);
  }, [cloakPreset]);

  useEffect(() => {
    localStorage.setItem('nova_arcade_panic_key', panicKey);
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

  const handleToggleFavorite = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleSaveCustomGame = (newGame: Game) => {
    setCustomGames((prev) => [newGame, ...prev]);
    setActiveGame(newGame);
  };

  const handleClearData = () => {
    localStorage.removeItem('nova_arcade_favorites');
    localStorage.removeItem('nova_arcade_custom_games');
    localStorage.removeItem('blockfall_best');
    localStorage.removeItem('snake_deluxe_best');
    localStorage.removeItem('2048_deluxe_best');
    localStorage.removeItem('dino_runner_hi');
    localStorage.removeItem('flappy_retro_best');
    setFavorites([]);
    setCustomGames([]);
    alert('All local arcade data and records have been cleared.');
  };

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
    <div className="min-h-screen bg-[#070a13] text-slate-100 flex flex-col font-sans selection:bg-cyan-500 selection:text-slate-950">
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
            {/* Featured Hero Banner (Shown only on All category with no search query) */}
            {category === 'all' && !searchQuery && featuredGame && (
              <section className="relative rounded-2xl overflow-hidden border border-slate-800 bg-gradient-to-r from-slate-900 via-[#0d1424] to-[#0f172a] p-6 sm:p-8 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="max-w-xl space-y-3">
                  <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-cyan-400">
                    <Sparkles className="w-4 h-4 text-cyan-400" />
                    <span>Featured Unblocked Title</span>
                    <span aria-hidden="true">·</span>
                    <span className="text-slate-400">Zero Lag · No Ads</span>
                  </div>

                  <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
                    {featuredGame.title}
                  </h1>

                  <p className="text-sm text-slate-300 leading-relaxed">
                    {featuredGame.description}
                  </p>

                  <div className="flex items-center gap-3 pt-2">
                    <button
                      onClick={() => setActiveGame(featuredGame)}
                      className="px-6 py-2.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black text-sm tracking-wide shadow-lg shadow-cyan-500/25 transition-all hover:scale-102 cursor-pointer flex items-center gap-2"
                    >
                      <Gamepad2 className="w-4 h-4" />
                      <span>Play Now</span>
                    </button>
                    <button
                      onClick={(e) => handleToggleFavorite(featuredGame.id, e)}
                      className={`px-4 py-2.5 rounded-lg border text-sm font-semibold transition-colors cursor-pointer flex items-center gap-2 ${
                        favorites.includes(featuredGame.id)
                          ? 'bg-amber-500/10 text-amber-400 border-amber-500/40'
                          : 'bg-slate-800/80 text-slate-300 border-slate-700 hover:bg-slate-700'
                      }`}
                    >
                      <Bookmark className="w-4 h-4" />
                      <span>{favorites.includes(featuredGame.id) ? 'Saved' : 'Bookmark'}</span>
                    </button>
                  </div>
                </div>

                {/* Hero Visual Preview */}
                <div
                  onClick={() => setActiveGame(featuredGame)}
                  className="w-full md:w-80 aspect-video rounded-xl bg-slate-950 border border-slate-700/60 flex items-center justify-center p-6 text-center cursor-pointer group hover:border-cyan-500 transition-colors relative overflow-hidden"
                >
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center text-cyan-400 font-mono text-2xl font-black shadow-xl group-hover:scale-110 transition-transform"
                    style={{
                      backgroundColor: `${featuredGame.accentColor}22`,
                      border: `2px solid ${featuredGame.accentColor}`
                    }}
                  >
                    {featuredGame.title.slice(0, 2).toUpperCase()}
                  </div>
                  <div className="absolute inset-0 bg-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="bg-cyan-500 text-slate-950 font-bold px-3 py-1.5 rounded-lg text-xs shadow-lg">
                      Launch Game
                    </span>
                  </div>
                </div>
              </section>
            )}

            {/* Catalog Controls Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-4">
              <div>
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <span className="capitalize">
                    {category === 'all'
                      ? 'All Unblocked Games'
                      : category === 'favorites'
                      ? 'Your Bookmarked Favorites'
                      : category === 'custom'
                      ? 'Custom Iframe Games'
                      : `${category} Games`}
                  </span>
                  <span className="text-xs font-mono text-slate-400 font-normal">
                    ({filteredGames.length})
                  </span>
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  Real HTML5 and canvas games embedded in responsive sandbox iframes
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
                  className="bg-slate-900 border border-slate-700/80 rounded-lg px-3 py-1.5 text-slate-200 font-medium focus:outline-none focus:border-cyan-500 cursor-pointer"
                >
                  <option value="popular">Most Popular</option>
                  <option value="rating">Highest Rated</option>
                  <option value="newest">Release Year</option>
                  <option value="az">Alphabetical A-Z</option>
                </select>
              </div>
            </div>

            {/* Games Grid */}
            {filteredGames.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
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
              <div className="bg-[#0f1422] border border-slate-800/80 rounded-2xl p-10 text-center max-w-lg mx-auto my-8 shadow-2xl">
                <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 mx-auto mb-4">
                  <Gamepad2 className="w-7 h-7" />
                </div>
                <h3 className="font-bold text-white text-lg mb-1.5">All Games Cleared</h3>
                <p className="text-xs text-slate-400 mb-6 leading-relaxed max-w-sm mx-auto">
                  All catalog games and previously embedded titles have been completely cleared. You can embed any web game, iframe snippet, or HTML project directly into your personal sandbox.
                </p>
                <div className="flex items-center justify-center">
                  <button
                    onClick={() => setIsCustomModalOpen(true)}
                    className="px-5 py-2.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs cursor-pointer transition-colors shadow-lg shadow-cyan-500/20 flex items-center justify-center gap-2"
                  >
                    <Code2 className="w-4 h-4" />
                    <span>Embed Game / Iframe</span>
                  </button>
                </div>
              </div>
            ) : (
              /* Filter / Search Empty State */
              <div className="bg-[#0f1422] border border-slate-800/80 rounded-2xl p-12 text-center max-w-md mx-auto my-8">
                <div className="w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center text-slate-400 mx-auto mb-3">
                  <Gamepad2 className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-white text-base mb-1">No Games Found</h3>
                <p className="text-xs text-slate-400 mb-4 leading-relaxed">
                  {searchQuery
                    ? `No matches found for "${searchQuery}". Try searching for another keyword or check another category.`
                    : category === 'favorites'
                    ? "You haven't bookmarked any games yet! Click the bookmark icon on any game card to add it here."
                    : category === 'custom'
                    ? "No custom games embedded yet. Click 'Embed Game' to load any URL or paste HTML."
                    : 'No games available in this category.'}
                </p>
                {category === 'custom' ? (
                  <button
                    onClick={() => setIsCustomModalOpen(true)}
                    className="px-4 py-2 rounded-lg bg-cyan-500 text-slate-950 font-bold text-xs cursor-pointer hover:bg-cyan-400 transition-colors"
                  >
                    Embed Custom Game
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      setCategory('all');
                      setSearchQuery('');
                    }}
                    className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs transition-colors cursor-pointer"
                  >
                    View All Games
                  </button>
                )}
              </div>
            )}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="mt-16 border-t border-slate-800/80 bg-[#090d16] text-xs text-slate-400 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-mono font-bold text-slate-300">Nova Arcade Hub</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span>Self-Contained HTML5 & Iframe Game Player</span>
          </div>

          <div className="flex items-center gap-4 text-slate-500 text-[11px]">
            <span>Press <kbd className="px-1.5 py-0.5 bg-slate-800 rounded font-mono text-slate-300">{panicKey}</kbd> for Panic Cloak</span>
            <span aria-hidden="true">·</span>
            <button
              onClick={() => setIsCustomModalOpen(true)}
              className="hover:text-cyan-400 transition-colors cursor-pointer"
            >
              Add Custom Iframe
            </button>
            <span aria-hidden="true">·</span>
            <button
              onClick={() => setIsSettingsOpen(true)}
              className="hover:text-cyan-400 transition-colors cursor-pointer"
            >
              Settings
            </button>
          </div>
        </div>
      </footer>

      {/* Custom Game Embed Modal */}
      <CustomGameModal
        isOpen={isCustomModalOpen}
        onClose={() => setIsCustomModalOpen(false)}
        onSaveCustomGame={handleSaveCustomGame}
      />

      {/* Settings Modal */}
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        preset={cloakPreset}
        onChangePreset={setCloakPreset}
        panicKey={panicKey}
        onChangePanicKey={setPanicKey}
        onClearData={handleClearData}
      />
    </div>
  );
}

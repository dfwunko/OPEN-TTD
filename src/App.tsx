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
import { resolveAssetUrl } from './utils/paths';
import { customEmbedManager } from './utils/customEmbeds';
import {
  Gamepad2,
  Play,
  ArrowUpDown,
  Bookmark,
  Code2,
  RotateCcw,
  Sparkles,
  Layers,
  Undo2,
  X,
  Plus,
  AlertTriangle
} from 'lucide-react';

interface ToastInfo {
  id: number;
  message: string;
  actionLabel?: string;
  onAction?: () => void;
}

export default function App() {
  const [activeGame, setActiveGame] = useState<Game | null>(null);
  const [category, setCategory] = useState<GameCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'popular' | 'rating' | 'newest' | 'az'>('popular');

  // Local storage state: Favorites
  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const saved = safeStorage.getItem('nova_arcade_favorites');
      const parsed = saved ? JSON.parse(saved) : null;
      return Array.isArray(parsed) ? parsed : ['eaglercraft-1-8'];
    } catch {
      return ['eaglercraft-1-8'];
    }
  });

  // Custom games loaded via customEmbedManager
  const [customGames, setCustomGames] = useState<Game[]>(() => {
    return customEmbedManager.getCustomGames();
  });

  // Modals & Cloak State
  const [isCustomModalOpen, setIsCustomModalOpen] = useState(false);
  const [customModalTab, setCustomModalTab] = useState<'url' | 'html' | 'restore'>('url');
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isCloakActive, setIsCloakActive] = useState(false);
  const [cloakPreset, setCloakPreset] = useState<CloakPreset>(() => {
    return (safeStorage.getItem('nova_arcade_cloak_preset') as CloakPreset) || 'classroom';
  });
  const [panicKey, setPanicKey] = useState<string>(() => {
    return safeStorage.getItem('nova_arcade_panic_key') || ']';
  });

  // Notification Toast state (e.g. for Undo delete, recovery confirmation)
  const [toast, setToast] = useState<ToastInfo | null>(null);

  const showToast = useCallback((message: string, actionLabel?: string, onAction?: () => void) => {
    const id = Date.now();
    setToast({ id, message, actionLabel, onAction });
  }, []);

  // Auto-dismiss toast after 6 seconds
  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => {
      setToast((cur) => (cur?.id === toast.id ? null : cur));
    }, 6000);
    return () => clearTimeout(timer);
  }, [toast]);

  // Network connection status
  const [isOffline, setIsOffline] = useState(() => (typeof navigator !== 'undefined' ? !navigator.onLine : false));

  useEffect(() => {
    const handleOnline = () => {
      setIsOffline(false);
      showToast('Connection restored. Online mirrors and assets ready.');
    };
    const handleOffline = () => {
      setIsOffline(true);
      showToast('You are offline. Remote game embeds may not connect.');
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [showToast]);

  // Save favorites & cloak configuration
  useEffect(() => {
    safeStorage.setItem('nova_arcade_favorites', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    safeStorage.setItem('nova_arcade_cloak_preset', cloakPreset);
  }, [cloakPreset]);

  useEffect(() => {
    safeStorage.setItem('nova_arcade_panic_key', panicKey);
  }, [panicKey]);

  // Keep custom games saved and backed up
  useEffect(() => {
    customEmbedManager.saveCustomGames(customGames);
  }, [customGames]);

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

  // Combine built-in games and custom games
  const allGames = useMemo(() => {
    const safeCustom = Array.isArray(customGames) ? customGames : [];
    return [...safeCustom, ...GAMES_CATALOG];
  }, [customGames]);

  // Update URL hash when active game changes
  const handleSelectGame = useCallback((game: Game | null) => {
    setActiveGame(game);
    if (game) {
      if (!window.location.hash.includes(`game=${game.id}`)) {
        window.location.hash = `game=${game.id}`;
      }
    } else {
      if (window.location.hash.includes('game=')) {
        history.replaceState(null, '', window.location.pathname + window.location.search);
      }
    }
  }, []);

  const handleSaveCustomGame = useCallback((newGame: Game) => {
    setCustomGames((prev) => {
      const filtered = prev.filter((g) => g.id !== newGame.id);
      return [newGame, ...filtered];
    });
    handleSelectGame(newGame);
    showToast(`Saved and launched "${newGame.title}"!`);
  }, [handleSelectGame, showToast]);

  // Delete custom embed with archive and undo option
  const handleDeleteCustomGame = useCallback((game: Game, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    customEmbedManager.archiveDeletedGame(game);
    setCustomGames((prev) => prev.filter((g) => g.id !== game.id));
    if (activeGame?.id === game.id) {
      handleSelectGame(null);
    }
    showToast(`Removed "${game.title}".`, 'Undo', () => {
      setCustomGames((cur) => [game, ...cur]);
      showToast(`Restored "${game.title}"!`);
    });
  }, [activeGame, handleSelectGame, showToast]);

  // Restore curated preset embeds (2048, Snake, Flappy, Plasma)
  const handleRestorePresets = useCallback(() => {
    const res = customEmbedManager.restoreDefaultPresets(customGames);
    setCustomGames(res.updated);
    showToast(`Restored ${res.addedCount} embed presets!`);
  }, [customGames, showToast]);

  // Recover all deleted/backed-up embeds
  const handleRecoverGames = useCallback((recovered: Game[]) => {
    const existingIds = new Set(customGames.map((g) => g.id));
    const toAdd = recovered.filter((g) => !existingIds.has(g.id));
    const merged = [...toAdd, ...customGames];
    customEmbedManager.saveCustomGames(merged);
    setCustomGames(merged);
    showToast(`Successfully recovered ${toAdd.length} custom embeds!`);
  }, [customGames, showToast]);

  // Clear data safely with snapshot backup
  const handleClearData = useCallback(() => {
    customEmbedManager.recordClearedSafetyBackup(customGames);
    const prevCustom = [...customGames];
    const prevFavs = [...favorites];

    safeStorage.removeItem('nova_arcade_favorites');
    safeStorage.removeItem('nova_arcade_custom_games');
    setFavorites([]);
    setCustomGames([]);
    if (activeGame) handleSelectGame(null);

    showToast('Records cleared. Safety backup preserved.', 'Undo', () => {
      setFavorites(prevFavs);
      setCustomGames(prevCustom);
      showToast('Restored all favorites and embeds!');
    });
  }, [customGames, favorites, activeGame, handleSelectGame, showToast]);

  // Sync active game with URL hash (#game=id) or search query (?game=id)
  useEffect(() => {
    const parseGameFromUrl = () => {
      const hashMatch = window.location.hash.match(/game=([a-zA-Z0-9_-]+)/);
      const searchParams = new URLSearchParams(window.location.search);
      const gameId = hashMatch ? hashMatch[1] : searchParams.get('game');
      if (gameId) {
        const found = allGames.find((g) => g.id === gameId);
        if (found) {
          setActiveGame(found);
          return;
        }
      } else if (activeGame) {
        setActiveGame(null);
      }
    };

    parseGameFromUrl();
    window.addEventListener('hashchange', parseGameFromUrl);
    return () => window.removeEventListener('hashchange', parseGameFromUrl);
  }, [allGames]);

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

  // Count recoverable embeds in archive or safety backup
  const recoverableCount = useMemo(() => {
    const archived = customEmbedManager.getArchivedDeletedGames();
    const backup = customEmbedManager.getRecoverableBackupGames();
    const existingIds = new Set(customGames.map((g) => g.id));
    const unique = [...archived, ...backup].filter(
      (v, i, a) => !existingIds.has(v.id) && a.findIndex((t) => t.id === v.id || t.title === v.title) === i
    );
    return unique.length;
  }, [customGames]);

  // Featured game for the hero banner when in 'all' category without search query
  const featuredGame = useMemo(() => {
    return allGames[0] || null;
  }, [allGames]);

  const openCustomModalWithTab = (tab: 'url' | 'html' | 'restore') => {
    setCustomModalTab(tab);
    setIsCustomModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-black text-neutral-100 flex flex-col font-sans selection:bg-neutral-800 selection:text-white">
      {/* Panic Cloak Fullscreen Disguise */}
      {isCloakActive && (
        <CloakDisguise
          preset={cloakPreset}
          hotkey={panicKey}
          onRestore={() => setIsCloakActive(false)}
        />
      )}

      {/* Offline Alert Banner */}
      {isOffline && (
        <aside
          role="alert"
          aria-live="assertive"
          className="bg-amber-500/15 border-b border-amber-500/30 px-4 py-2.5 text-xs text-amber-200 flex items-center justify-between gap-4 font-mono z-50 sticky top-0 backdrop-blur-md"
        >
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 animate-pulse" />
            <span>
              <strong className="font-semibold text-amber-300">Offline Warning:</strong> Your device lost its internet connection. Remote game mirrors may fail to load until reconnected.
            </span>
          </div>
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="px-2.5 py-1 rounded bg-amber-500/20 hover:bg-amber-500/30 text-amber-200 border border-amber-500/30 font-semibold shrink-0 cursor-pointer transition-colors"
          >
            Retry Connection
          </button>
        </aside>
      )}

      {/* Main Header */}
      <Header
        currentCategory={category}
        onSelectCategory={(cat) => {
          setCategory(cat);
          if (activeGame) handleSelectGame(null);
        }}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onOpenCustomModal={() => openCustomModalWithTab('url')}
        onOpenSettings={() => setIsSettingsOpen(true)}
        onTriggerCloak={() => setIsCloakActive(true)}
        onGoHome={() => {
          handleSelectGame(null);
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
            onBack={() => handleSelectGame(null)}
            isFavorite={favorites.includes(activeGame.id)}
            onToggleFavorite={handleToggleFavorite}
            onSelectRelatedGame={(related) => handleSelectGame(related)}
            allGames={allGames}
          />
        ) : (
          /* Game Catalog & Directory */
          <div className="space-y-8">
            {/* Featured Hero Showcase (Shown when browsing All without search) */}
            {category === 'all' && !searchQuery && featuredGame && (
              <section className="relative rounded-xl overflow-hidden border border-neutral-850 bg-[#080808] group">
                {/* Background Ambient Artwork with Fade */}
                {featuredGame.thumbnailUrl && (
                  <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                    <img
                      src={resolveAssetUrl(featuredGame.thumbnailUrl)}
                      alt={featuredGame.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover opacity-10 filter blur-md scale-105 group-hover:scale-110 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#080808] via-[#080808]/90 to-transparent" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-transparent to-[#080808]/40" />
                  </div>
                )}

                <div className="relative z-10 p-6 sm:p-8 flex flex-col lg:flex-row items-center justify-between gap-8">
                  {/* Left: Info & Launch */}
                  <div className="max-w-xl space-y-3.5">
                    {/* Unboxed Metadata Kicker (Anti-Pill Discipline) */}
                    <div className="flex items-center gap-2 text-xs font-mono tracking-wider uppercase text-neutral-500 font-medium">
                      <span>Featured</span>
                      <span aria-hidden="true" className="text-neutral-700">·</span>
                      <span className="text-neutral-400 capitalize">{featuredGame.category}</span>
                      <span aria-hidden="true" className="text-neutral-700">·</span>
                      <span className="text-amber-500 font-medium">★ {featuredGame.rating.toFixed(2)}</span>
                    </div>

                    <h1 className="text-2xl sm:text-4xl font-bold tracking-tight text-white leading-tight">
                      {featuredGame.title}
                    </h1>

                    <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed max-w-lg">
                      {featuredGame.description}
                    </p>

                    <div className="flex items-center gap-2.5 pt-1 text-xs">
                      <button
                        onClick={() => handleSelectGame(featuredGame)}
                        className="px-5 py-2 rounded-md bg-white hover:bg-neutral-200 text-black font-semibold tracking-wide transition-all cursor-pointer flex items-center gap-2"
                      >
                        <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                        <span>Play Now</span>
                      </button>
                      <button
                        onClick={(e) => handleToggleFavorite(featuredGame.id, e)}
                        className={`px-3.5 py-2 rounded-md border text-xs font-medium transition-all cursor-pointer flex items-center gap-2 ${
                          favorites.includes(featuredGame.id)
                            ? 'bg-amber-950/20 text-amber-400 border-amber-800/40'
                            : 'bg-neutral-900 hover:bg-neutral-800 text-neutral-300 border-neutral-800'
                        }`}
                      >
                        <Bookmark className={`w-3.5 h-3.5 ${favorites.includes(featuredGame.id) ? 'fill-current' : ''}`} />
                        <span>{favorites.includes(featuredGame.id) ? 'Bookmarked' : 'Bookmark'}</span>
                      </button>
                    </div>
                  </div>

                  {/* Right: High-Res Interactive Visual Card */}
                  <div
                    onClick={() => handleSelectGame(featuredGame)}
                    className="w-full lg:w-80 aspect-video rounded-lg overflow-hidden border border-neutral-800 relative cursor-pointer group/preview hover:border-neutral-600 transition-all bg-black"
                  >
                    {featuredGame.thumbnailUrl ? (
                      <img
                        src={resolveAssetUrl(featuredGame.thumbnailUrl)}
                        alt={featuredGame.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover/preview:scale-105 transition-transform duration-500 ease-out"
                      />
                    ) : (
                      <div className="w-full h-full bg-neutral-900 flex items-center justify-center font-mono font-bold text-white text-lg">
                        {featuredGame.title}
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-90" />
                    <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-[11px]">
                      <span className="font-medium text-white tracking-wide flex items-center gap-1.5">
                        <Play className="w-3 h-3 fill-white text-white" />
                        Launch
                      </span>
                      <span className="font-mono text-neutral-400">
                        {featuredGame.releaseYear}
                      </span>
                    </div>
                  </div>
                </div>
              </section>
            )}

            {/* Catalog Controls Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-900 pb-3.5">
              <div>
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  <span className="capitalize">
                    {category === 'all'
                      ? 'Catalog'
                      : category === 'favorites'
                      ? 'Your Favorites'
                      : category === 'custom'
                      ? 'Custom Embeds & Sandbox'
                      : `${category} Games`}
                  </span>
                  <span className="text-xs font-mono text-neutral-500 font-normal">
                    ({filteredGames.length})
                  </span>
                </h2>
                <p className="text-xs text-neutral-400 mt-0.5">
                  {category === 'custom'
                    ? 'Your personal library of custom embedded web games and HTML5 canvas apps'
                    : 'High-performance unblocked games with instant loading and native keyboard controls'}
                </p>
              </div>

              {/* Action Toolbar for Custom Category or Sorting */}
              <div className="flex flex-wrap items-center gap-2 self-start sm:self-auto text-xs">
                {category === 'custom' && (
                  <div className="flex items-center gap-2 mr-2">
                    <button
                      onClick={() => openCustomModalWithTab('url')}
                      className="px-3 py-1.5 rounded-lg bg-white hover:bg-neutral-200 text-black font-bold flex items-center gap-1.5 transition-colors cursor-pointer shadow-sm"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Embed New</span>
                    </button>

                    <button
                      onClick={handleRestorePresets}
                      className="px-3 py-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-850 text-neutral-200 border border-neutral-800 font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                      title="Restore curated offline games (2048, Snake, Flappy, Plasma)"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-neutral-300" />
                      <span>Restore Presets</span>
                    </button>

                    {recoverableCount > 0 && (
                      <button
                        onClick={() => openCustomModalWithTab('restore')}
                        className="px-3 py-1.5 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                        title="Recover deleted embeds from archive"
                      >
                        <RotateCcw className="w-3.5 h-3.5 text-amber-400" />
                        <span>Recover ({recoverableCount})</span>
                      </button>
                    )}

                    <button
                      onClick={() => openCustomModalWithTab('restore')}
                      className="px-2.5 py-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-850 text-neutral-400 hover:text-white border border-neutral-800 font-semibold flex items-center gap-1 transition-colors cursor-pointer"
                      title="Backup & Restore Options"
                    >
                      <Layers className="w-3.5 h-3.5" />
                      <span>Backup</span>
                    </button>
                  </div>
                )}

                {/* Sort by dropdown */}
                <div className="flex items-center gap-2">
                  <span className="text-neutral-400 flex items-center gap-1">
                    <ArrowUpDown className="w-3.5 h-3.5 text-neutral-500" />
                    Sort:
                  </span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as any)}
                    className="bg-[#0a0a0a] border border-neutral-800 rounded-lg px-2.5 py-1 text-neutral-200 text-xs font-medium focus:outline-none focus:border-neutral-500 cursor-pointer"
                  >
                    <option value="popular">Most Popular</option>
                    <option value="rating">Highest Rated</option>
                    <option value="newest">Release Year</option>
                    <option value="az">Alphabetical A-Z</option>
                  </select>
                </div>
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
                    onPlayGame={(g) => handleSelectGame(g)}
                    onDeleteCustomGame={game.isCustom ? handleDeleteCustomGame : undefined}
                  />
                ))}
              </div>
            ) : category === 'custom' ? (
              /* Custom Category Specific Empty / Recovery Hub State */
              <div className="bg-[#0a0a0a] border border-neutral-800 rounded-2xl p-8 sm:p-12 text-center max-w-xl mx-auto my-8 shadow-2xl space-y-6">
                <div className="w-14 h-14 rounded-2xl bg-neutral-900 border border-neutral-800 flex items-center justify-center text-white mx-auto shadow-inner">
                  <Code2 className="w-7 h-7" />
                </div>

                <div>
                  <h3 className="font-bold text-white text-lg mb-1.5">No Custom Embeds Active</h3>
                  <p className="text-xs text-neutral-400 leading-relaxed max-w-md mx-auto">
                    You can restore offline presets, recover previously deleted embeds, or embed any web URL or HTML code directly.
                  </p>
                </div>

                {/* Primary Recovery & Restore Actions */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-md mx-auto">
                  <button
                    onClick={handleRestorePresets}
                    className="p-3.5 rounded-xl bg-neutral-900 hover:bg-neutral-850 border border-neutral-800 text-white font-bold text-xs flex flex-col items-center justify-center gap-1.5 transition-all cursor-pointer shadow-sm group"
                  >
                    <Sparkles className="w-5 h-5 text-white group-hover:scale-110 transition-transform" />
                    <span>Restore 4 Default Presets</span>
                    <span className="text-[10px] text-neutral-400 font-normal">2048, Snake, Flappy & Plasma</span>
                  </button>

                  <button
                    onClick={() => openCustomModalWithTab('restore')}
                    className="p-3.5 rounded-xl bg-neutral-900 hover:bg-neutral-850 border border-neutral-800 text-neutral-200 font-bold text-xs flex flex-col items-center justify-center gap-1.5 transition-all cursor-pointer group"
                  >
                    <RotateCcw className="w-5 h-5 text-amber-400 group-hover:rotate-45 transition-transform" />
                    <span>Recover Deleted / Archive</span>
                    <span className="text-[10px] text-neutral-400 font-normal">
                      {recoverableCount > 0 ? `${recoverableCount} games recoverable` : 'Restore saved backups'}
                    </span>
                  </button>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                  <button
                    onClick={() => openCustomModalWithTab('url')}
                    className="px-4 py-2 rounded-lg bg-white hover:bg-neutral-200 text-black font-bold text-xs cursor-pointer transition-colors flex items-center gap-1.5 shadow-sm"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Embed New Game</span>
                  </button>

                  <button
                    onClick={() => openCustomModalWithTab('restore')}
                    className="px-4 py-2 rounded-lg bg-neutral-900 hover:bg-neutral-850 border border-neutral-800 text-neutral-300 font-semibold text-xs cursor-pointer transition-colors flex items-center gap-1.5"
                  >
                    <Layers className="w-3.5 h-3.5 text-neutral-400" />
                    <span>Import JSON Backup</span>
                  </button>
                </div>
              </div>
            ) : allGames.length === 0 ? (
              /* All Games Cleared State */
              <div className="bg-[#0a0a0a] border border-neutral-800 rounded-2xl p-10 text-center max-w-lg mx-auto my-8 shadow-2xl">
                <div className="w-12 h-12 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-center text-white mx-auto mb-4">
                  <Gamepad2 className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-white text-base mb-1.5">No Games In Catalog</h3>
                <p className="text-xs text-neutral-400 mb-6 leading-relaxed max-w-sm mx-auto">
                  Embed any web game, iframe snippet, or HTML project directly into your personal sandbox.
                </p>
                <div className="flex items-center justify-center gap-3">
                  <button
                    onClick={() => openCustomModalWithTab('url')}
                    className="px-4 py-2 rounded-lg bg-white hover:bg-neutral-200 text-black font-bold text-xs cursor-pointer transition-colors flex items-center justify-center gap-2"
                  >
                    <Code2 className="w-4 h-4" />
                    <span>Embed Game / Iframe</span>
                  </button>
                  <button
                    onClick={handleRestorePresets}
                    className="px-4 py-2 rounded-lg bg-neutral-900 border border-neutral-800 text-white hover:bg-neutral-850 font-bold text-xs cursor-pointer transition-colors flex items-center justify-center gap-2"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>Restore Presets</span>
                  </button>
                </div>
              </div>
            ) : (
              /* Filter / Search Empty State */
              <div className="bg-[#0a0a0a] border border-neutral-800 rounded-2xl p-12 text-center max-w-md mx-auto my-8">
                <div className="w-11 h-11 rounded-xl bg-neutral-900 flex items-center justify-center text-neutral-400 mx-auto mb-3 border border-neutral-800">
                  <Gamepad2 className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-white text-base mb-1">No Games Found</h3>
                <p className="text-xs text-neutral-400 mb-4 leading-relaxed">
                  {searchQuery
                    ? `No matches found for "${searchQuery}". Try searching for another keyword or check another category.`
                    : category === 'favorites'
                    ? "You haven't bookmarked any games yet! Click the bookmark icon on any game card to add it here."
                    : 'No games available in this category.'}
                </p>
              </div>
            )}
          </div>
        )}
      </main>

      {/* Floating Notification Toast (with Undo action) */}
      {toast && (
        <aside
          role="status"
          aria-live="polite"
          className="fixed bottom-6 right-6 z-50 max-w-sm bg-[#0d0d0d] border border-neutral-700 rounded-xl p-3.5 shadow-2xl flex items-center justify-between gap-3 text-xs animate-in slide-in-from-bottom-3 duration-300"
        >
          <div className="text-neutral-200 font-medium truncate">{toast.message}</div>
          <div className="flex items-center gap-2 shrink-0">
            {toast.actionLabel && toast.onAction && (
              <button
                onClick={() => {
                  toast.onAction?.();
                  setToast(null);
                }}
                className="px-2.5 py-1 rounded bg-white hover:bg-neutral-200 text-black font-bold text-xs transition-colors cursor-pointer flex items-center gap-1"
              >
                <Undo2 className="w-3 h-3" />
                <span>{toast.actionLabel}</span>
              </button>
            )}
            <button
              onClick={() => setToast(null)}
              className="p-1 rounded text-neutral-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </aside>
      )}

      {/* Footer */}
      <footer className="border-t border-neutral-900 bg-black mt-16 py-6 text-center text-xs text-neutral-400">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-mono font-bold text-white">NOVA ARCADE</span>
            <span aria-hidden="true" className="text-neutral-700">·</span>
            <span>Minimalist Unblocked Gaming Sandbox</span>
          </div>
          <div className="flex items-center gap-4 text-neutral-400 text-xs">
            <button
              onClick={() => openCustomModalWithTab('restore')}
              className="hover:text-white transition-colors cursor-pointer flex items-center gap-1"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Restore Embeds</span>
            </button>
            <span aria-hidden="true" className="text-neutral-700">·</span>
            <button
              onClick={() => setIsSettingsOpen(true)}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Preferences
            </button>
            <span aria-hidden="true" className="text-neutral-700">·</span>
            <button
              onClick={() => setIsCloakActive(true)}
              className="hover:text-rose-400 transition-colors cursor-pointer"
            >
              Panic Stealth [{panicKey}]
            </button>
          </div>
        </div>
      </footer>

      {/* Custom Game Embed & Recovery Modal */}
      <CustomGameModal
        isOpen={isCustomModalOpen}
        initialTab={customModalTab}
        onClose={() => setIsCustomModalOpen(false)}
        onSaveCustomGame={handleSaveCustomGame}
        customGames={customGames}
        onRestorePresets={handleRestorePresets}
        onRecoverGames={handleRecoverGames}
        onImportSuccess={(count) => showToast(`Successfully imported ${count} custom embeds!`)}
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
        onRestorePresets={handleRestorePresets}
        onOpenCustomEmbedsModal={() => openCustomModalWithTab('restore')}
        recoverableCount={recoverableCount}
        onRecoverEmbeds={() => {
          const recoverable = [
            ...customEmbedManager.getArchivedDeletedGames(),
            ...customEmbedManager.getRecoverableBackupGames()
          ];
          handleRecoverGames(recoverable);
        }}
      />
    </div>
  );
}

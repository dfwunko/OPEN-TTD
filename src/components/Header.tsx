import React from 'react';
import { GameCategory, CloakPreset } from '../types/game';
import {
  Search,
  Code2,
  Shield,
  SlidersHorizontal,
  Bookmark,
  X
} from 'lucide-react';

interface HeaderProps {
  currentCategory: GameCategory;
  onSelectCategory: (category: GameCategory) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onOpenCustomModal: () => void;
  onOpenSettings: () => void;
  onTriggerCloak: () => void;
  onGoHome: () => void;
  isHome?: boolean;
  favoritesCount: number;
  customGamesCount: number;
  panicKey: string;
}

const CATEGORIES: { id: GameCategory; label: string }[] = [
  { id: 'all', label: 'All Catalog' },
  { id: 'favorites', label: 'Favorites' },
  { id: 'arcade', label: 'Arcade' },
  { id: 'action', label: 'Action' },
  { id: 'puzzle', label: 'Puzzle' },
  { id: 'skill', label: 'Skill & Strategy' },
  { id: 'retro', label: 'Retro' },
  { id: 'custom', label: 'Custom Sandbox' }
];

export const Header: React.FC<HeaderProps> = ({
  currentCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  onOpenCustomModal,
  onOpenSettings,
  onTriggerCloak,
  onGoHome,
  favoritesCount,
  customGamesCount,
  panicKey
}) => {
  return (
    <header className="sticky top-0 z-40 bg-black/90 backdrop-blur-md border-b border-neutral-900 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex flex-col gap-3">
        {/* Top bar */}
        <div className="flex items-center justify-between gap-4">
          {/* Brand */}
          <div
            className="flex items-center gap-2 cursor-pointer select-none"
            onClick={onGoHome}
            title="Nova Arcade Home"
          >
            <span className="text-base font-bold tracking-tight text-white font-mono">
              NOVA<span className="text-neutral-500 font-normal">.ARCADE</span>
            </span>
          </div>

          {/* Search bar */}
          <div className="flex-1 max-w-md hidden md:block">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-neutral-500 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                placeholder="Search catalog... (/)"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full bg-[#080808] border border-neutral-850 rounded-md pl-9 pr-8 py-1.5 text-xs text-neutral-200 placeholder-neutral-500 focus:outline-none focus:border-neutral-600 transition-all font-sans"
              />
              {searchQuery ? (
                <button
                  onClick={() => onSearchChange('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-neutral-200 transition-colors cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              ) : (
                <kbd className="hidden lg:inline-block absolute right-2.5 top-1/2 -translate-y-1/2 px-1.5 py-0.5 text-[10px] font-mono text-neutral-600 bg-neutral-900 border border-neutral-800 rounded">
                  /
                </kbd>
              )}
            </div>
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-2 text-xs">
            <button
              onClick={onOpenCustomModal}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-white border border-neutral-800 transition-colors cursor-pointer"
            >
              <Code2 className="w-3.5 h-3.5 text-neutral-400" />
              <span>Embed</span>
            </button>

            <button
              onClick={onTriggerCloak}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-rose-950/20 hover:bg-rose-950/40 text-rose-300 border border-rose-900/40 font-medium transition-colors cursor-pointer"
            >
              <Shield className="w-3.5 h-3.5 text-rose-400" />
              <span>Panic</span>
              <kbd className="hidden sm:inline-block text-[10px] font-mono opacity-60">
                [{panicKey}]
              </kbd>
            </button>

            <button
              onClick={onOpenSettings}
              className="p-1.5 rounded-md bg-neutral-900 hover:bg-neutral-800 text-neutral-400 hover:text-neutral-200 border border-neutral-800 transition-colors cursor-pointer"
              title="Settings"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Mobile Search Input */}
        <div className="md:hidden relative">
          <Search className="w-3.5 h-3.5 text-neutral-500 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            placeholder="Search catalog..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full bg-[#080808] border border-neutral-850 rounded-md pl-8 pr-8 py-1.5 text-xs text-neutral-100 placeholder-neutral-500 focus:outline-none focus:border-neutral-600"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-neutral-200"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Category Navigation */}
        <nav
          aria-label="Game categories"
          className="flex items-center gap-1 overflow-x-auto scrollbar-none py-0.5 text-xs"
        >
          {CATEGORIES.map((cat) => {
            const isActive = currentCategory === cat.id;
            let badgeCount: number | null = null;
            if (cat.id === 'favorites' && favoritesCount > 0) badgeCount = favoritesCount;
            if (cat.id === 'custom' && customGamesCount > 0) badgeCount = customGamesCount;

            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className={`whitespace-nowrap px-3 py-1 rounded-md text-xs transition-colors cursor-pointer flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-neutral-100 text-black font-semibold'
                    : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-900/60'
                }`}
              >
                {cat.id === 'favorites' && (
                  <Bookmark className={`w-3 h-3 ${isActive ? 'text-amber-600 fill-amber-600' : 'text-amber-500'}`} />
                )}
                <span>
                  {cat.label}
                  {badgeCount !== null && ` (${badgeCount})`}
                </span>
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
};

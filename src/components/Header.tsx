import React from 'react';
import {
  Gamepad2,
  Search,
  ShieldAlert,
  Code2,
  Bookmark,
  SlidersHorizontal,
  X
} from 'lucide-react';
import { GameCategory } from '../types/game';

interface HeaderProps {
  currentCategory: GameCategory;
  onSelectCategory: (cat: GameCategory) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onOpenCustomModal: () => void;
  onOpenSettings: () => void;
  onTriggerCloak: () => void;
  favoritesCount: number;
  customGamesCount: number;
  panicKey: string;
}

const CATEGORIES: { id: GameCategory; label: string }[] = [
  { id: 'all', label: 'All Games' },
  { id: 'arcade', label: 'Arcade' },
  { id: 'retro', label: 'Retro' },
  { id: 'action', label: 'Action' },
  { id: 'puzzle', label: 'Puzzle' },
  { id: 'driving', label: 'Driving' },
  { id: 'skill', label: 'Skill' },
  { id: 'favorites', label: 'Favorites' },
  { id: 'custom', label: 'Custom Iframe' }
];

export const Header: React.FC<HeaderProps> = ({
  currentCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  onOpenCustomModal,
  onOpenSettings,
  onTriggerCloak,
  favoritesCount,
  customGamesCount,
  panicKey
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#090d16]/95 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5 flex flex-col gap-3">
        {/* Top brand & utility bar */}
        <div className="flex items-center justify-between gap-4">
          {/* Brand */}
          <div
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => {
              onSelectCategory('all');
              onSearchChange('');
            }}
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-600 to-blue-500 flex items-center justify-center text-white shadow-lg shadow-cyan-500/20 group-hover:scale-105 transition-transform">
              <Gamepad2 className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-black tracking-tight text-white font-mono">
                  NOVA<span className="text-cyan-400">.ARCADE</span>
                </span>
                <span className="text-[10px] uppercase font-mono tracking-widest text-emerald-400 bg-emerald-950/60 px-1.5 py-0.5 rounded border border-emerald-800/60">
                  UNBLOCKED
                </span>
              </div>
              <p className="text-xs text-slate-400">
                HTML5 & Iframe Game Portal · Zero Blockers
              </p>
            </div>
          </div>

          {/* Search bar */}
          <div className="flex-1 max-w-md hidden md:block">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search games by title, genre, or keyword... (/)"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full bg-slate-900/90 border border-slate-700/80 rounded-lg pl-9 pr-9 py-2 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => onSearchChange('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2">
            {/* Custom Iframe Game Button */}
            <button
              onClick={onOpenCustomModal}
              title="Load custom URL or HTML code in an iframe sandbox"
              className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-colors cursor-pointer"
            >
              <Code2 className="w-4 h-4 text-cyan-400" />
              <span>Embed Game</span>
            </button>

            {/* Panic / Cloak Button */}
            <button
              onClick={onTriggerCloak}
              title={`Instantly disguise this tab as Google Classroom or Google Drive (Shortcut: ${panicKey})`}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-red-950/70 hover:bg-red-900/90 text-red-200 border border-red-800/80 text-xs font-bold transition-all shadow-sm cursor-pointer hover:shadow-red-900/20"
            >
              <ShieldAlert className="w-4 h-4 text-red-400 animate-pulse" />
              <span>Panic Cloak</span>
              <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] bg-red-900/80 rounded border border-red-700 text-red-200 font-mono">
                {panicKey}
              </kbd>
            </button>

            {/* Settings button */}
            <button
              onClick={onOpenSettings}
              title="Settings & Cloak Presets"
              className="p-2 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700/80 transition-colors cursor-pointer"
            >
              <SlidersHorizontal className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Mobile Search Input */}
        <div className="md:hidden relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search games..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 rounded-lg pl-9 pr-8 py-1.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Categories segmented bar */}
        <nav
          aria-label="Game categories"
          className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs"
        >
          {CATEGORIES.map((cat) => {
            const isActive = currentCategory === cat.id;
            let countLabel = '';
            if (cat.id === 'favorites' && favoritesCount > 0) {
              countLabel = ` (${favoritesCount})`;
            } else if (cat.id === 'custom' && customGamesCount > 0) {
              countLabel = ` (${customGamesCount})`;
            }

            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className={`whitespace-nowrap px-3.5 py-1.5 rounded-lg font-medium transition-colors cursor-pointer flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-cyan-500 text-slate-950 font-bold shadow-sm shadow-cyan-500/20'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                {cat.id === 'favorites' && (
                  <Bookmark className={`w-3.5 h-3.5 ${isActive ? 'text-slate-950' : 'text-amber-400'}`} />
                )}
                {cat.id === 'custom' && (
                  <Code2 className={`w-3.5 h-3.5 ${isActive ? 'text-slate-950' : 'text-cyan-400'}`} />
                )}
                <span>
                  {cat.label}
                  {countLabel}
                </span>
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
};

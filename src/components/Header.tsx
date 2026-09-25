import React from 'react';
import {
  Gamepad2,
  Search,
  Shield,
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
  onGoHome: () => void;
  isHome: boolean;
  favoritesCount: number;
  customGamesCount: number;
  panicKey: string;
}

const CATEGORIES: { id: GameCategory; label: string }[] = [
  { id: 'all', label: 'All Games' },
  { id: 'driving', label: 'Driving' },
  { id: 'retro', label: 'Retro & Voxel' },
  { id: 'action', label: 'Action' },
  { id: 'puzzle', label: 'Platformer' },
  { id: 'skill', label: 'Survival' },
  { id: 'arcade', label: 'Tycoon' },
  { id: 'favorites', label: 'Favorites' },
  { id: 'custom', label: 'Custom Embeds' }
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
  isHome,
  favoritesCount,
  customGamesCount,
  panicKey
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#06080e]/90 backdrop-blur-xl border-b border-white/[0.06] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5 flex flex-col gap-2">
        {/* Top brand & utility bar */}
        <div className="flex items-center justify-between gap-4">
          {/* Brand */}
          <div
            className="flex items-center gap-2.5 cursor-pointer group select-none"
            onClick={onGoHome}
            title="Return to Home Catalog"
          >
            <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 group-hover:border-cyan-400/50 group-hover:scale-105 transition-all">
              <Gamepad2 className="w-4 h-4" />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-base font-extrabold tracking-tight text-white font-mono">
                NOVA<span className="text-cyan-400">ARCADE</span>
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]" title="Systems Online" />
            </div>
          </div>

          {/* Search bar */}
          <div className="flex-1 max-w-sm hidden md:block">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                placeholder="Search games... (Press /)"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full bg-[#0d121c] border border-white/[0.08] rounded-lg pl-9 pr-9 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500/60 focus:ring-1 focus:ring-cyan-500/30 transition-all font-sans"
              />
              <div className="absolute right-2.5 top-1/2 -translate-y-1/2 flex items-center">
                {searchQuery ? (
                  <button
                    onClick={() => onSearchChange('')}
                    className="text-slate-400 hover:text-white transition-colors cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <kbd className="hidden lg:inline-block px-1.5 py-0.5 text-[10px] font-mono text-slate-500 bg-white/[0.04] border border-white/[0.08] rounded">
                    /
                  </kbd>
                )}
              </div>
            </div>
          </div>

          {/* Action controls */}
          <div className="flex items-center gap-1.5">
            {/* Custom Iframe Game Button */}
            <button
              onClick={onOpenCustomModal}
              title="Embed any external web game or iframe"
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] text-slate-300 hover:text-white text-xs font-medium border border-white/[0.08] transition-all cursor-pointer"
            >
              <Code2 className="w-3.5 h-3.5 text-cyan-400" />
              <span>Embed</span>
            </button>

            {/* Panic / Cloak Button */}
            <button
              onClick={onTriggerCloak}
              title={`Stealth Disguise (Shortcut: ${panicKey})`}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 border border-rose-500/25 text-xs font-semibold transition-all cursor-pointer"
            >
              <Shield className="w-3.5 h-3.5 text-rose-400" />
              <span>Panic</span>
              <kbd className="hidden sm:inline-block px-1 py-0.2 text-[10px] bg-rose-950/60 rounded border border-rose-800 text-rose-300 font-mono">
                {panicKey}
              </kbd>
            </button>

            {/* Settings button */}
            <button
              onClick={onOpenSettings}
              title="Settings & Cloak Preferences"
              className="p-1.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] text-slate-400 hover:text-white border border-white/[0.08] transition-all cursor-pointer"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Mobile Search Input */}
        <div className="md:hidden relative">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            placeholder="Search games..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full bg-[#0d121c] border border-white/[0.08] rounded-lg pl-8 pr-8 py-1.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Interactive Categories Segmented Bar */}
        <nav
          aria-label="Game categories"
          className="flex items-center gap-1 overflow-x-auto scrollbar-none py-0.5 text-xs"
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
                className={`whitespace-nowrap px-3 py-1 rounded-md text-xs font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-cyan-500/15 text-cyan-300 font-semibold border border-cyan-500/30'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.03]'
                }`}
              >
                {cat.id === 'favorites' && (
                  <Bookmark className={`w-3 h-3 ${isActive ? 'text-amber-400 fill-amber-400' : 'text-amber-400'}`} />
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

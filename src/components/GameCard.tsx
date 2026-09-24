import React from 'react';
import { Play, Star, Bookmark, ExternalLink } from 'lucide-react';
import { Game } from '../types/game';

interface GameCardProps {
  game: Game;
  isFavorite: boolean;
  onToggleFavorite: (id: string, e: React.MouseEvent) => void;
  onPlayGame: (game: Game) => void;
  highScore?: number;
}

export const GameCard: React.FC<GameCardProps> = ({
  game,
  isFavorite,
  onToggleFavorite,
  onPlayGame,
  highScore
}) => {
  return (
    <article
      onClick={() => onPlayGame(game)}
      className="group relative bg-[#0f1422] border border-slate-800 hover:border-cyan-500/60 rounded-xl overflow-hidden transition-all duration-200 hover:-translate-y-1 hover:shadow-xl hover:shadow-cyan-950/20 cursor-pointer flex flex-col justify-between"
    >
      {/* Thumbnail / Visual graphic banner */}
      <div className="relative aspect-video w-full overflow-hidden bg-slate-950 flex items-center justify-center border-b border-slate-800/80">
        {/* Dynamic game illustration background */}
        <div
          className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity"
          style={{
            background: `radial-gradient(circle at center, ${game.accentColor} 0%, transparent 70%)`
          }}
        />

        {/* Game Icon Graphic */}
        <div className="relative z-10 flex flex-col items-center justify-center p-4 text-center">
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center mb-2 shadow-lg transition-transform duration-200 group-hover:scale-110"
            style={{
              backgroundColor: `${game.accentColor}22`,
              border: `1.5px solid ${game.accentColor}66`,
              color: game.accentColor
            }}
          >
            <span className="font-mono text-xl font-black">
              {game.title.slice(0, 2).toUpperCase()}
            </span>
          </div>
          <span className="text-[11px] font-mono tracking-wider uppercase text-slate-400">
            {game.category}
          </span>
        </div>

        {/* Favorite Bookmark Button */}
        <button
          aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          onClick={(e) => onToggleFavorite(game.id, e)}
          className={`absolute top-2.5 right-2.5 z-20 p-2 rounded-lg backdrop-blur-md transition-colors cursor-pointer ${
            isFavorite
              ? 'bg-amber-500/90 text-slate-950 shadow-md'
              : 'bg-slate-900/80 text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          <Bookmark className="w-4 h-4 fill-current" />
        </button>

        {/* Hover Play Overlay */}
        <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center z-10">
          <div className="w-12 h-12 rounded-full bg-cyan-500 text-slate-950 flex items-center justify-center shadow-lg shadow-cyan-500/40 transform scale-75 group-hover:scale-100 transition-transform">
            <Play className="w-6 h-6 fill-current ml-0.5" />
          </div>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Title */}
          <h3 className="font-bold text-base text-slate-100 group-hover:text-cyan-400 transition-colors line-clamp-1">
            {game.title}
          </h3>

          {/* Description */}
          <p className="mt-1.5 text-xs text-slate-400 line-clamp-2 leading-relaxed">
            {game.description}
          </p>
        </div>

        {/* Unboxed Metadata (Zero-pill discipline per frontend-design guidelines) */}
        <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-1.5">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span className="font-semibold text-slate-200">{game.rating.toFixed(1)}</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span>{game.plays.toLocaleString()} plays</span>
          </div>

          {highScore !== undefined && highScore > 0 ? (
            <div className="text-emerald-400 font-mono text-[11px] font-medium">
              Best: {highScore.toLocaleString()}
            </div>
          ) : (
            <span className="text-slate-500 font-mono text-[11px]">
              {game.releaseYear}
            </span>
          )}
        </div>
      </div>
    </article>
  );
};

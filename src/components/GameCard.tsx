import React, { useState } from 'react';
import { Star, Bookmark, Play, ArrowRight } from 'lucide-react';
import { Game } from '../types/game';
import { resolveAssetUrl } from '../utils/paths';

interface GameCardProps {
  game: Game;
  isFavorite: boolean;
  onToggleFavorite: (id: string, e: React.MouseEvent) => void;
  onPlayGame: (game: Game) => void;
}

export const GameCard: React.FC<GameCardProps> = React.memo(({
  game,
  isFavorite,
  onToggleFavorite,
  onPlayGame,
}) => {
  const [imgError, setImgError] = useState(false);

  return (
    <article
      onClick={() => onPlayGame(game)}
      className="group relative bg-[#0a0e18] border border-white/[0.07] hover:border-cyan-500/40 rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/60 cursor-pointer flex flex-col justify-between"
    >
      {/* Visual Thumbnail Banner */}
      <div className="relative aspect-video w-full overflow-hidden bg-slate-950 border-b border-white/[0.06]">
        {game.thumbnailUrl && !imgError ? (
          <img
            src={resolveAssetUrl(game.thumbnailUrl)}
            alt={game.title}
            width={480}
            height={270}
            referrerPolicy="no-referrer"
            loading="lazy"
            decoding="async"
            onError={() => setImgError(true)}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          />
        ) : (
          <div
            className="w-full h-full flex items-center justify-center"
            style={{
              background: `radial-gradient(circle at center, ${game.accentColor}25 0%, #06090f 80%)`
            }}
          >
            <span className="font-mono text-2xl font-black text-cyan-400">
              {game.title.slice(0, 2).toUpperCase()}
            </span>
          </div>
        )}

        {/* Ambient Dark Gradient Scrim */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0e18] via-transparent to-black/20 opacity-80 pointer-events-none" />

        {/* Favorite Bookmark Button */}
        <button
          type="button"
          aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          onClick={(e) => onToggleFavorite(game.id, e)}
          className={`absolute top-2.5 right-2.5 z-20 p-2 rounded-xl backdrop-blur-md transition-all cursor-pointer ${
            isFavorite
              ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/25 scale-105'
              : 'bg-black/50 hover:bg-black/80 text-slate-300 hover:text-white border border-white/10'
          }`}
        >
          <Bookmark className={`w-3.5 h-3.5 ${isFavorite ? 'fill-current' : ''}`} />
        </button>

        {/* Play Icon Affordance on Hover */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-10 pointer-events-none">
          <div className="w-11 h-11 rounded-full bg-cyan-400 text-slate-950 flex items-center justify-center shadow-lg shadow-cyan-500/40 transform scale-90 group-hover:scale-100 transition-transform duration-300">
            <Play className="w-4 h-4 fill-current ml-0.5" />
          </div>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between gap-3.5">
        <div>
          {/* Quiet Unboxed Metadata Kicker (Anti-Pill Discipline) */}
          <div className="flex items-center gap-1.5 text-[11px] font-mono tracking-wider uppercase text-cyan-400 font-semibold mb-1">
            <span>{game.category}</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span className="text-slate-400 font-normal">{game.releaseYear}</span>
            {game.badge && (
              <>
                <span aria-hidden="true" className="text-slate-600">·</span>
                <span className="text-slate-400 font-normal">{game.badge}</span>
              </>
            )}
          </div>

          {/* Title */}
          <h3 className="font-bold text-base text-white group-hover:text-cyan-400 transition-colors line-clamp-1">
            {game.title}
          </h3>

          {/* Description */}
          <p className="mt-1 text-xs text-slate-400 line-clamp-2 leading-relaxed">
            {game.description}
          </p>
        </div>

        {/* Footer: Rating, Plays & Launch Action */}
        <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between text-xs">
          <div className="flex items-center gap-1.5 text-slate-400 font-mono tabular-nums">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span className="font-semibold text-slate-200">{game.rating.toFixed(2)}</span>
            <span aria-hidden="true" className="text-slate-700">·</span>
            <span className="text-[11px] text-slate-400 font-sans">{game.plays.toLocaleString()} plays</span>
          </div>

          <div className="flex items-center gap-1 text-cyan-400 font-semibold text-xs group-hover:translate-x-0.5 transition-transform">
            <span>Play</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </div>
      </div>
    </article>
  );
});

import React, { useState } from 'react';
import { Star, Bookmark, Play, ArrowRight, Trash2 } from 'lucide-react';
import { Game } from '../types/game';
import { resolveAssetUrl } from '../utils/paths';

interface GameCardProps {
  game: Game;
  isFavorite: boolean;
  onToggleFavorite: (id: string, e: React.MouseEvent) => void;
  onPlayGame: (game: Game) => void;
  onDeleteCustomGame?: (game: Game, e: React.MouseEvent) => void;
}

export const GameCard: React.FC<GameCardProps> = React.memo(({
  game,
  isFavorite,
  onToggleFavorite,
  onPlayGame,
  onDeleteCustomGame,
}) => {
  const [imgError, setImgError] = useState(false);

  return (
    <article
      onClick={() => onPlayGame(game)}
      className="group relative bg-[#0a0a0a] border border-neutral-800 hover:border-neutral-600 rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-black cursor-pointer flex flex-col justify-between"
    >
      {/* Visual Thumbnail Banner */}
      <div className="relative aspect-video w-full overflow-hidden bg-black border-b border-neutral-800">
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
            className="w-full h-full flex items-center justify-center bg-neutral-900"
            style={{
              background: `radial-gradient(circle at center, ${game.accentColor}20 0%, #050505 85%)`
            }}
          >
            <span className="font-mono text-2xl font-black text-white">
              {game.title.slice(0, 2).toUpperCase()}
            </span>
          </div>
        )}

        {/* Ambient Dark Gradient Scrim */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-black/40 opacity-90 pointer-events-none" />

        {/* Favorite Bookmark Button */}
        <button
          type="button"
          aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          onClick={(e) => onToggleFavorite(game.id, e)}
          className={`absolute top-2.5 right-2.5 z-20 p-2 rounded-xl backdrop-blur-md transition-all cursor-pointer ${
            isFavorite
               ? 'bg-amber-500 text-black shadow-lg shadow-amber-500/25 scale-105'
               : 'bg-black/60 hover:bg-black/90 text-neutral-300 hover:text-white border border-neutral-700'
          }`}
        >
          <Bookmark className={`w-3.5 h-3.5 ${isFavorite ? 'fill-current' : ''}`} />
        </button>

        {/* Delete Custom Embed Button */}
        {game.isCustom && onDeleteCustomGame && (
          <button
            type="button"
            aria-label="Remove custom embed"
            title="Remove embed (can be recovered from archive)"
            onClick={(e) => onDeleteCustomGame(game, e)}
            className="absolute top-2.5 left-2.5 z-20 p-2 rounded-xl backdrop-blur-md bg-black/60 hover:bg-red-500 text-neutral-300 hover:text-white border border-neutral-700 hover:border-red-400 transition-all cursor-pointer opacity-80 hover:opacity-100"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        )}

        {/* Play Icon Affordance on Hover */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-10 pointer-events-none">
          <div className="w-11 h-11 rounded-full bg-white text-black flex items-center justify-center shadow-2xl transform scale-90 group-hover:scale-100 transition-transform duration-300">
            <Play className="w-4 h-4 fill-current ml-0.5" />
          </div>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between gap-3.5">
        <div>
          {/* Quiet Unboxed Metadata Kicker (Anti-Pill Discipline) */}
          <div className="flex items-center gap-1.5 text-[11px] font-mono tracking-wider uppercase text-neutral-400 font-semibold mb-1">
            <span>{game.category}</span>
            <span aria-hidden="true" className="text-neutral-700">·</span>
            <span className="text-neutral-500 font-normal">{game.releaseYear}</span>
            {game.badge && (
              <>
                <span aria-hidden="true" className="text-neutral-700">·</span>
                <span className="text-neutral-400 font-normal">{game.badge}</span>
              </>
            )}
          </div>

          {/* Title */}
          <h3 className="font-bold text-base text-white group-hover:text-neutral-200 transition-colors line-clamp-1">
            {game.title}
          </h3>

          {/* Description */}
          <p className="mt-1 text-xs text-neutral-400 line-clamp-2 leading-relaxed">
            {game.description}
          </p>
        </div>

        {/* Footer: Rating, Plays & Launch Action */}
        <div className="pt-3 border-t border-neutral-850 flex items-center justify-between text-xs">
          <div className="flex items-center gap-1.5 text-neutral-400 font-mono tabular-nums">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span className="font-semibold text-neutral-200">{game.rating.toFixed(2)}</span>
            <span aria-hidden="true" className="text-neutral-700">·</span>
            <span className="text-[11px] text-neutral-500 font-sans">{game.plays.toLocaleString()} plays</span>
          </div>

          <div className="flex items-center gap-1 text-white font-semibold text-xs group-hover:translate-x-0.5 transition-transform">
            <span>Play</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </div>
      </div>
    </article>
  );
});

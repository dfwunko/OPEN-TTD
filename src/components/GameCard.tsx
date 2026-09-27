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
      className="group relative bg-[#080808] border border-neutral-850 hover:border-neutral-700 rounded-xl overflow-hidden transition-all duration-200 hover:-translate-y-0.5 cursor-pointer flex flex-col justify-between"
    >
      {/* Visual Thumbnail Banner */}
      <div className="relative aspect-video w-full overflow-hidden bg-black border-b border-neutral-850">
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
            className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300 ease-out"
          />
        ) : (
          <div
            className="w-full h-full flex items-center justify-center bg-neutral-900"
            style={{
              background: `radial-gradient(circle at center, ${game.accentColor}15 0%, #050505 85%)`
            }}
          >
            <span className="font-mono text-xl font-bold text-white">
              {game.title.slice(0, 2).toUpperCase()}
            </span>
          </div>
        )}

        {/* Ambient Dark Gradient Scrim */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-transparent to-black/30 opacity-90 pointer-events-none" />

        {/* Favorite Bookmark Button */}
        <button
          type="button"
          aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          onClick={(e) => onToggleFavorite(game.id, e)}
          className={`absolute top-2.5 right-2.5 z-20 p-1.5 rounded-md backdrop-blur-md transition-all cursor-pointer ${
            isFavorite
               ? 'bg-amber-500 text-black font-bold scale-105'
               : 'bg-black/60 hover:bg-black/90 text-neutral-400 hover:text-white border border-neutral-800'
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
            className="absolute top-2.5 left-2.5 z-20 p-1.5 rounded-md backdrop-blur-md bg-black/60 hover:bg-rose-900/80 text-neutral-400 hover:text-white border border-neutral-800 transition-all cursor-pointer"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        )}

        {/* Play Icon Affordance on Hover */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center z-10 pointer-events-none">
          <div className="w-9 h-9 rounded-full bg-white text-black flex items-center justify-center shadow-xl transform scale-90 group-hover:scale-100 transition-transform duration-200">
            <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
          </div>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-4 flex-1 flex flex-col justify-between gap-3">
        <div>
          {/* Quiet Unboxed Metadata Kicker (Anti-Pill Discipline) */}
          <div className="flex items-center gap-1.5 text-[11px] font-mono tracking-wider uppercase text-neutral-500 font-medium mb-1">
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
          <h3 className="font-semibold text-sm text-neutral-100 group-hover:text-white transition-colors line-clamp-1">
            {game.title}
          </h3>

          {/* Description */}
          <p className="mt-1 text-xs text-neutral-400 line-clamp-2 leading-relaxed">
            {game.description}
          </p>
        </div>

        {/* Footer: Rating & Action */}
        <div className="pt-2.5 border-t border-neutral-850 flex items-center justify-between text-xs">
          <div className="flex items-center gap-1.5 text-neutral-400 font-mono tabular-nums text-[11px]">
            <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
            <span className="font-medium text-neutral-300">{game.rating.toFixed(2)}</span>
            <span aria-hidden="true" className="text-neutral-700">·</span>
            <span className="text-neutral-500 font-sans">{game.plays.toLocaleString()} plays</span>
          </div>

          <div className="flex items-center gap-1 text-neutral-300 font-medium text-xs group-hover:text-white group-hover:translate-x-0.5 transition-all">
            <span>Play</span>
            <ArrowRight className="w-3 h-3" />
          </div>
        </div>
      </div>
    </article>
  );
});

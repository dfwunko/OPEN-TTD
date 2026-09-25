import React, { useState, useRef, useEffect } from 'react';
import {
  ArrowLeft,
  Maximize2,
  Minimize2,
  RotateCcw,
  ExternalLink,
  Bookmark,
  Share2,
  Tv,
  Star,
  Keyboard,
  Lightbulb,
  Info,
  Check,
  Play
} from 'lucide-react';
import { Game } from '../types/game';
import { safeStorage } from '../utils/storage';
import { resolveAssetUrl } from '../utils/paths';

interface GamePlayerProps {
  game: Game;
  onBack: () => void;
  isFavorite: boolean;
  onToggleFavorite: (id: string, e: React.MouseEvent) => void;
  onSelectRelatedGame: (game: Game) => void;
  allGames: Game[];
}

export const GamePlayer: React.FC<GamePlayerProps> = ({
  game,
  onBack,
  isFavorite,
  onToggleFavorite,
  onSelectRelatedGame,
  allGames
}) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isCssFullscreen, setIsCssFullscreen] = useState(false);
  const activeFullscreen = isFullscreen || isCssFullscreen;

  const [isTheater, setIsTheater] = useState(false);
  const [aspectRatio, setAspectRatio] = useState<'16/9' | '4/3' | '1/1' | 'fill'>(
    game.aspectRatio === '1/1' ? '1/1' : game.aspectRatio === '4/3' ? '4/3' : '16/9'
  );
  const [copiedLink, setCopiedLink] = useState(false);
  const [userRating, setUserRating] = useState<number | null>(null);
  const [ratingSubmitted, setRatingSubmitted] = useState(false);

  // Sync aspect ratio when game changes
  useEffect(() => {
    if (game.aspectRatio === '1/1') setAspectRatio('1/1');
    else if (game.aspectRatio === '4/3') setAspectRatio('4/3');
    else setAspectRatio('16/9');

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Track play count locally
    const storedPlays = parseInt(safeStorage.getItem(`plays_${game.id}`) || '0', 10);
    safeStorage.setItem(`plays_${game.id}`, String(storedPlays + 1));

    return () => {
      if (iframeRef.current) {
        try {
          iframeRef.current.src = 'about:blank';
        } catch {}
      }
    };
  }, [game.id, game.aspectRatio]);

  // Fullscreen change listener
  useEffect(() => {
    const handleFsChange = () => {
      const isNative = !!(document.fullscreenElement || (document as any).webkitFullscreenElement);
      setIsFullscreen(isNative);
      if (!isNative) {
        setIsCssFullscreen(false);
      }
    };
    document.addEventListener('fullscreenchange', handleFsChange);
    document.addEventListener('webkitfullscreenchange', handleFsChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFsChange);
      document.removeEventListener('webkitfullscreenchange', handleFsChange);
    };
  }, []);

  // Escape key listener for CSS fallback fullscreen
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isCssFullscreen) {
        setIsCssFullscreen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isCssFullscreen]);

  const handleToggleFullscreen = () => {
    if (!wrapperRef.current) return;
    if (!activeFullscreen) {
      const el = wrapperRef.current as any;
      const req = el.requestFullscreen || el.webkitRequestFullscreen || el.msRequestFullscreen;
      if (req) {
        try {
          const res = req.call(el);
          if (res && res.catch) {
            res.catch(() => {
              setIsCssFullscreen(true);
            });
          }
        } catch {
          setIsCssFullscreen(true);
        }
      } else {
        setIsCssFullscreen(true);
      }
    } else {
      if (document.fullscreenElement || (document as any).webkitFullscreenElement) {
        const exit = document.exitFullscreen || (document as any).webkitExitFullscreen;
        if (exit) {
          try {
            const res = exit.call(document);
            if (res && res.catch) res.catch(() => {});
          } catch {}
        }
      }
      setIsCssFullscreen(false);
      setIsFullscreen(false);
    }
  };

  const handleReloadIframe = () => {
    if (iframeRef.current) {
      const currentSrc = iframeRef.current.src;
      iframeRef.current.src = 'about:blank';
      setTimeout(() => {
        if (iframeRef.current) {
          iframeRef.current.src = currentSrc;
        }
      }, 50);
    }
  };

  const handlePopOutAboutBlank = () => {
    const win = window.open('about:blank', '_blank');
    if (!win) return;

    const doc = win.document;
    doc.title = 'Google Docs';

    const link = doc.createElement('link');
    link.rel = 'icon';
    link.type = 'image/png';
    link.href = 'https://ssl.gstatic.com/docs/documents/images/kix-favicon7.ico';
    doc.head.appendChild(link);

    const body = doc.body;
    body.style.margin = '0';
    body.style.padding = '0';
    body.style.overflow = 'hidden';
    body.style.background = '#000';

    const iframe = win.document.createElement('iframe');
    iframe.style.border = 'none';
    iframe.style.width = '100vw';
    iframe.style.height = '100vh';
    iframe.allow = 'autoplay; fullscreen; gamepad';

    if (game.customHtml) {
      iframe.srcdoc = game.customHtml;
    } else {
      iframe.src = resolveAssetUrl(game.src);
    }

    body.appendChild(iframe);
  };

  const handleShare = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url).then(() => {
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    });
  };

  const handleRate = (stars: number) => {
    setUserRating(stars);
    setRatingSubmitted(true);
    safeStorage.setItem(`rating_${game.id}`, String(stars));
    setTimeout(() => setRatingSubmitted(false), 2500);
  };

  // Related games from catalog
  const relatedGames = allGames
    .filter((g) => g.id !== game.id)
    .sort((a, b) => (a.category === game.category ? -1 : 1))
    .slice(0, 4);

  return (
    <div className={`w-full pb-16 ${isTheater ? 'max-w-none px-2 sm:px-6' : 'max-w-5xl mx-auto'}`}>
      {/* Top back & quick navigation */}
      <div className="flex items-center justify-between py-2 mb-3">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-300 hover:text-cyan-400 transition-colors cursor-pointer group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Catalog</span>
        </button>

        {/* Unboxed breadcrumb metadata */}
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-slate-400">
          <span className="text-cyan-400">{game.category}</span>
          <span aria-hidden="true" className="text-slate-600">·</span>
          <span>{game.releaseYear}</span>
        </div>
      </div>

      {/* Main Iframe Player Wrapper */}
      <div
        ref={wrapperRef}
        className={`relative bg-black overflow-hidden border border-white/[0.08] shadow-2xl flex flex-col ${
          activeFullscreen
            ? '!fixed !inset-0 !w-screen !h-screen !max-h-screen !z-[999999] !rounded-none !border-0 !m-0 !p-0'
            : 'rounded-2xl'
        }`}
      >
        {/* Floating Exit Fullscreen Button */}
        {activeFullscreen && (
          <button
            onClick={handleToggleFullscreen}
            className="absolute top-4 right-4 z-[1000000] flex items-center gap-1.5 bg-black/85 hover:bg-black text-white px-3.5 py-1.5 rounded-lg text-xs font-semibold backdrop-blur-md border border-white/20 shadow-2xl transition-all cursor-pointer group"
            title="Exit Fullscreen (Esc)"
          >
            <Minimize2 className="w-3.5 h-3.5 text-cyan-400 group-hover:scale-110 transition-transform" />
            <span>Exit Fullscreen</span>
          </button>
        )}

        {/* Iframe Viewport */}
        <div
          className={`relative w-full bg-slate-950 flex items-center justify-center transition-all ${
            activeFullscreen
              ? 'flex-1 h-full'
              : aspectRatio === '16/9'
              ? 'h-[640px] max-h-[85vh]'
              : aspectRatio === '4/3'
              ? 'aspect-[4/3] max-h-[78vh]'
              : aspectRatio === '1/1'
              ? 'aspect-square max-h-[80vh]'
              : 'h-[640px]'
          }`}
        >
          <iframe
            ref={iframeRef}
            id="game-iframe"
            title={game.iframeTitle || game.title}
            src={game.customHtml ? undefined : resolveAssetUrl(game.src)}
            srcDoc={game.customHtml}
            scrolling="no"
            className="GameContainerDesktop_gameIframe__6GEYI force-focus wh-full w-full h-full border-0 block"
            style={{
              width: game.iframeStyle?.width || '100%',
              height: activeFullscreen ? '100%' : (game.iframeStyle?.height || '100%'),
              border: 0,
              ...(game.iframeStyle || {})
            }}
            loading="eager"
            {...({ importance: 'high' } as any)}
            allowFullScreen
            data-lang="en"
            data-hj-allow-iframe="true"
            sandbox="allow-forms allow-modals allow-orientation-lock allow-pointer-lock allow-presentation allow-scripts allow-same-origin allow-downloads allow-popups allow-popups-to-escape-sandbox allow-top-navigation-by-user-activation allow-storage-access-by-user-activation"
            allow="autoplay; payment; fullscreen; microphone; focus-without-user-activation *; screen-wake-lock; gamepad; clipboard-read; clipboard-write; accelerometer; gyroscope; keyboard-map; encrypted-media *; picture-in-picture *; web-share *"
          />
        </div>

        {/* Sleek Minimalist Player Toolbar */}
        <div className="bg-[#090d16] border-t border-white/[0.06] px-4 py-2 flex items-center justify-between flex-wrap gap-2 text-xs text-slate-300">
          {/* Left: Title & unboxed category */}
          <div className="flex items-center gap-2">
            <span className="font-bold text-white text-sm">
              {game.title}
            </span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span className="text-xs text-slate-400 capitalize">{game.category}</span>
          </div>

          {/* Right: Controls */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* Aspect ratio selector */}
            {!activeFullscreen && (
              <div className="flex items-center bg-[#0d121e] border border-white/[0.08] rounded-lg p-0.5 text-[11px] font-mono">
                <button
                  onClick={() => setAspectRatio('16/9')}
                  className={`px-2 py-0.5 rounded transition-colors ${
                    aspectRatio === '16/9' ? 'bg-white/10 text-white font-bold' : 'text-slate-400 hover:text-white'
                  }`}
                  title="16:9 Widescreen"
                >
                  16:9
                </button>
                <button
                  onClick={() => setAspectRatio('4/3')}
                  className={`px-2 py-0.5 rounded transition-colors ${
                    aspectRatio === '4/3' ? 'bg-white/10 text-white font-bold' : 'text-slate-400 hover:text-white'
                  }`}
                  title="4:3 Box"
                >
                  4:3
                </button>
                <button
                  onClick={() => setAspectRatio('1/1')}
                  className={`px-2 py-0.5 rounded transition-colors ${
                    aspectRatio === '1/1' ? 'bg-white/10 text-white font-bold' : 'text-slate-400 hover:text-white'
                  }`}
                  title="1:1 Square"
                >
                  1:1
                </button>
              </div>
            )}

            {/* Reload button */}
            <button
              onClick={handleReloadIframe}
              title="Restart / Reload Game"
              className="p-1.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] text-slate-300 hover:text-white transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>

            {/* Theater Mode toggle */}
            {!activeFullscreen && (
              <button
                onClick={() => setIsTheater(!isTheater)}
                title={isTheater ? 'Default View' : 'Theater Mode (Expand View)'}
                className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                  isTheater
                    ? 'bg-cyan-500 text-slate-950 font-bold'
                    : 'bg-white/[0.04] hover:bg-white/[0.08] text-slate-300 hover:text-white'
                }`}
              >
                <Tv className="w-3.5 h-3.5" />
              </button>
            )}

            {/* Pop-out in about:blank */}
            <button
              onClick={handlePopOutAboutBlank}
              title="Open in stealth about:blank window"
              className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] text-slate-300 hover:text-white transition-colors cursor-pointer text-xs font-medium"
            >
              <ExternalLink className="w-3.5 h-3.5 text-cyan-400" />
              <span>About:Blank</span>
            </button>

            {/* Favorite bookmark */}
            <button
              onClick={(e) => onToggleFavorite(game.id, e)}
              title={isFavorite ? 'Remove Favorite' : 'Save as Favorite'}
              className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                isFavorite
                  ? 'bg-amber-500 text-slate-950 shadow-md'
                  : 'bg-white/[0.04] hover:bg-white/[0.08] text-slate-300 hover:text-white'
              }`}
            >
              <Bookmark className={`w-3.5 h-3.5 ${isFavorite ? 'fill-current' : ''}`} />
            </button>

            {/* Share Link */}
            <button
              onClick={handleShare}
              title="Copy Game Link"
              className="p-1.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] text-slate-300 hover:text-white transition-colors cursor-pointer"
            >
              {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
            </button>

            {/* Fullscreen button */}
            <button
              onClick={handleToggleFullscreen}
              title={activeFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold transition-all cursor-pointer"
            >
              {activeFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
              <span className="hidden sm:inline-block">
                {activeFullscreen ? 'Exit' : 'Fullscreen'}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Game Details & Controls Section */}
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 columns: Description & Instructions */}
        <div className="lg:col-span-2 space-y-6">
          {/* Header & Overview */}
          <div className="bg-[#0a0e18] border border-white/[0.07] rounded-2xl p-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/[0.06] pb-4">
              <div>
                <h1 className="text-2xl font-black text-white">{game.title}</h1>
                <div className="mt-1 flex items-center gap-2 text-xs font-mono text-slate-400">
                  <span className="capitalize">{game.category}</span>
                  <span aria-hidden="true" className="text-slate-600">·</span>
                  <span>Released {game.releaseYear}</span>
                  <span aria-hidden="true" className="text-slate-600">·</span>
                  <span>{game.plays.toLocaleString()} plays</span>
                </div>
              </div>

              {/* Star Rating Section */}
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-0.5">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => handleRate(star)}
                      className="cursor-pointer p-0.5 text-slate-600 hover:text-amber-400 transition-colors"
                      title={`Rate ${star} Stars`}
                    >
                      <Star
                        className={`w-4 h-4 ${
                          (userRating !== null && star <= userRating) ||
                          (userRating === null && star <= Math.round(game.rating))
                            ? 'text-amber-400 fill-amber-400'
                            : ''
                        }`}
                      />
                    </button>
                  ))}
                </div>
                <span className="text-xs font-semibold text-slate-300 font-mono">
                  {game.rating.toFixed(2)}
                </span>
                {ratingSubmitted && (
                  <span className="text-xs text-emerald-400 font-medium">
                    Saved
                  </span>
                )}
              </div>
            </div>

            <p className="mt-4 text-sm text-slate-300 leading-relaxed">
              {game.longDescription || game.description}
            </p>
          </div>

          {/* Instructions */}
          {game.instructions && game.instructions.length > 0 && (
            <div className="bg-[#0a0e18] border border-white/[0.07] rounded-2xl p-6">
              <h2 className="text-sm font-bold uppercase tracking-wider text-white flex items-center gap-2 mb-3">
                <Info className="w-4 h-4 text-cyan-400" />
                <span>How to Play</span>
              </h2>
              <ul className="space-y-2.5">
                {game.instructions.map((inst, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-xs text-slate-300 leading-relaxed">
                    <span className="w-5 h-5 rounded-md bg-white/[0.04] border border-white/[0.08] text-cyan-400 font-mono text-[11px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                      {i + 1}
                    </span>
                    <span>{inst}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Pro Tips */}
          {game.tips && game.tips.length > 0 && (
            <div className="bg-[#0a0e18] border border-white/[0.07] rounded-2xl p-6">
              <h2 className="text-sm font-bold uppercase tracking-wider text-white flex items-center gap-2 mb-3">
                <Lightbulb className="w-4 h-4 text-amber-400" />
                <span>Tips & Strategy</span>
              </h2>
              <ul className="space-y-2">
                {game.tips.map((tip, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-slate-300 leading-relaxed">
                    <span className="text-amber-400 shrink-0 font-bold">·</span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Right column: Keyboard Controls Guide & Related Games */}
        <div className="space-y-6">
          {/* Keyboard Controls Guide */}
          <div className="bg-[#0a0e18] border border-white/[0.07] rounded-2xl p-6">
            <h2 className="text-sm font-bold uppercase tracking-wider text-white flex items-center gap-2 mb-4">
              <Keyboard className="w-4 h-4 text-emerald-400" />
              <span>Keyboard Controls</span>
            </h2>

            <div className="divide-y divide-white/[0.06]">
              {game.controls.map((ctrl, i) => (
                <div key={i} className="py-2.5 flex items-center justify-between gap-3 text-xs">
                  <span className="text-slate-400">{ctrl.action}</span>
                  <kbd className="px-2 py-0.5 bg-[#0f1424] border border-white/[0.1] rounded font-mono text-slate-200 text-xs font-semibold">
                    {ctrl.key}
                  </kbd>
                </div>
              ))}
            </div>
          </div>

          {/* Related Games Suggestions with Real Artwork */}
          {relatedGames.length > 0 && (
            <div className="bg-[#0a0e18] border border-white/[0.07] rounded-2xl p-6">
              <h2 className="text-sm font-bold uppercase tracking-wider text-white mb-3">
                More Titles
              </h2>
              <div className="space-y-2.5">
                {relatedGames.map((rel) => (
                  <div
                    key={rel.id}
                    onClick={() => onSelectRelatedGame(rel)}
                    className="flex items-center gap-3 p-2 rounded-xl bg-white/[0.02] hover:bg-white/[0.06] border border-white/[0.06] hover:border-cyan-500/30 cursor-pointer transition-colors group"
                  >
                    <div className="w-16 h-11 rounded-lg overflow-hidden relative shrink-0 bg-slate-900 border border-white/[0.08]">
                      {rel.thumbnailUrl ? (
                        <img
                          src={resolveAssetUrl(rel.thumbnailUrl)}
                          alt={rel.title}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center font-mono font-bold text-xs text-cyan-400">
                          {rel.title.slice(0, 2).toUpperCase()}
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-bold text-slate-200 group-hover:text-cyan-400 truncate">
                        {rel.title}
                      </h4>
                      <p className="text-[11px] text-slate-400 font-mono capitalize">
                        {rel.category} · ★ {rel.rating.toFixed(1)}
                      </p>
                    </div>
                    <Play className="w-3.5 h-3.5 text-slate-500 group-hover:text-cyan-400 transition-colors shrink-0" />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

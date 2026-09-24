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
  Check
} from 'lucide-react';
import { Game } from '../types/game';

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
    const storedPlays = parseInt(localStorage.getItem(`plays_${game.id}`) || '0', 10);
    localStorage.setItem(`plays_${game.id}`, String(storedPlays + 1));
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
    // Classic stealth unblocked technique
    const win = window.open('about:blank', '_blank');
    if (!win) {
      alert('Pop-up was blocked. Please allow popups for this site.');
      return;
    }

    win.document.title = game.title;
    const body = win.document.body;
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
      iframe.src = game.src.startsWith('http') ? game.src : window.location.origin + game.src;
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
    localStorage.setItem(`rating_${game.id}`, String(stars));
    setTimeout(() => setRatingSubmitted(false), 2500);
  };

  // Related games from same category or random
  const relatedGames = allGames
    .filter((g) => g.id !== game.id)
    .sort((a, b) => (a.category === game.category ? -1 : 1))
    .slice(0, 4);

  return (
    <div className={`w-full pb-16 ${isTheater ? 'max-w-none px-2 sm:px-6' : 'max-w-5xl mx-auto px-4'}`}>
      {/* Top back & quick navigation */}
      <div className="flex items-center justify-between py-3 mb-2">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-sm font-semibold text-slate-300 hover:text-cyan-400 transition-colors cursor-pointer group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Games Hub</span>
        </button>

        {/* Unboxed breadcrumb metadata */}
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <span className="capitalize">{game.category}</span>
          <span aria-hidden="true">·</span>
          <span>{game.releaseYear}</span>
        </div>
      </div>

      {/* Main Iframe Player Wrapper */}
      <div
        ref={wrapperRef}
        className={`relative bg-black overflow-hidden border border-slate-800 shadow-2xl flex flex-col ${
          activeFullscreen
            ? '!fixed !inset-0 !w-screen !h-screen !max-h-screen !z-[999999] !rounded-none !border-0 !m-0 !p-0'
            : 'rounded-xl'
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
              ? 'h-[720px] max-h-[85vh]'
              : aspectRatio === '4/3'
              ? 'aspect-[4/3] max-h-[78vh]'
              : aspectRatio === '1/1'
              ? 'aspect-square max-h-[80vh]'
              : 'h-[720px]'
          }`}
        >
          <iframe
            ref={iframeRef}
            title={game.title}
            src={game.customHtml ? undefined : game.src}
            srcDoc={game.customHtml}
            className="force-focus wh-full w-full h-full border-0 block"
            style={{
              width: '100%',
              height: activeFullscreen ? '100%' : '720px',
              border: 0,
              borderRadius: activeFullscreen ? '0' : '12px'
            }}
            loading="lazy"
            allowFullScreen
            data-lang="en"
            sandbox="allow-downloads allow-forms allow-modals allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts allow-top-navigation-by-user-activation allow-storage-access-by-user-activation allow-pointer-lock"
            allow="accelerometer *; autoplay *; camera *; clipboard-read *; clipboard-write *; encrypted-media *; fullscreen *; geolocation *; gyroscope *; local-network-access *; magnetometer *; microphone *; midi *; payment *; picture-in-picture *; screen-wake-lock *; sync-xhr *; usb *; web-share *"
          />
        </div>

        {/* Player Toolbar */}
        <div className="bg-[#0b0f19] border-t border-slate-800/80 px-4 py-2.5 flex items-center justify-between flex-wrap gap-2 text-xs text-slate-300">
          {/* Left info & status */}
          <div className="flex items-center gap-3">
            <span className="font-bold text-slate-100 text-sm hidden sm:inline-block">
              {game.title}
            </span>
            <span className="flex items-center gap-1 text-emerald-400 font-mono text-[11px]">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping inline-block mr-1" />
              ONLINE
            </span>
          </div>

          {/* Right player controls */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* Aspect ratio selector */}
            {!activeFullscreen && (
              <div className="flex items-center bg-slate-900 border border-slate-800 rounded-lg p-0.5 text-[11px]">
                <button
                  onClick={() => setAspectRatio('16/9')}
                  className={`px-2 py-1 rounded transition-colors ${
                    aspectRatio === '16/9' ? 'bg-slate-700 text-white font-bold' : 'text-slate-400 hover:text-white'
                  }`}
                  title="16:9 Widescreen"
                >
                  16:9
                </button>
                <button
                  onClick={() => setAspectRatio('4/3')}
                  className={`px-2 py-1 rounded transition-colors ${
                    aspectRatio === '4/3' ? 'bg-slate-700 text-white font-bold' : 'text-slate-400 hover:text-white'
                  }`}
                  title="4:3 Arcade Box"
                >
                  4:3
                </button>
                <button
                  onClick={() => setAspectRatio('1/1')}
                  className={`px-2 py-1 rounded transition-colors ${
                    aspectRatio === '1/1' ? 'bg-slate-700 text-white font-bold' : 'text-slate-400 hover:text-white'
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
              className="p-2 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            {/* Theater Mode toggle */}
            {!activeFullscreen && (
              <button
                onClick={() => setIsTheater(!isTheater)}
                title={isTheater ? 'Exit Theater Mode' : 'Theater Mode (Expand View)'}
                className={`p-2 rounded-lg transition-colors cursor-pointer ${
                  isTheater
                    ? 'bg-cyan-500 text-slate-950 font-bold'
                    : 'bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white'
                }`}
              >
                <Tv className="w-4 h-4" />
              </button>
            )}

            {/* Pop-out in about:blank */}
            <button
              onClick={handlePopOutAboutBlank}
              title="Open in stealth about:blank window (bypass browser history)"
              className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer text-xs font-semibold"
            >
              <ExternalLink className="w-3.5 h-3.5 text-cyan-400" />
              <span>About:Blank</span>
            </button>

            {/* Favorite bookmark */}
            <button
              onClick={(e) => onToggleFavorite(game.id, e)}
              title={isFavorite ? 'Remove Favorite' : 'Save as Favorite'}
              className={`p-2 rounded-lg transition-colors cursor-pointer ${
                isFavorite
                  ? 'bg-amber-500 text-slate-950 shadow-md'
                  : 'bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white'
              }`}
            >
              <Bookmark className="w-4 h-4 fill-current" />
            </button>

            {/* Share Link */}
            <button
              onClick={handleShare}
              title="Copy Game Link"
              className="p-2 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
            >
              {copiedLink ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
            </button>

            {/* Fullscreen button */}
            <button
              onClick={handleToggleFullscreen}
              title={activeFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white font-bold transition-colors cursor-pointer"
            >
              {activeFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
              <span className="hidden sm:inline-block">
                {activeFullscreen ? 'Exit' : 'Fullscreen'}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Game Details & Controls Information */}
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 columns: Description, Instructions, Pro Tips */}
        <div className="lg:col-span-2 space-y-6">
          {/* Header & Description */}
          <div className="bg-[#0f1422] border border-slate-800 rounded-xl p-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800/80 pb-4">
              <div>
                <h1 className="text-2xl font-black text-white">{game.title}</h1>
                {/* Clean unboxed metadata per frontend-design */}
                <div className="mt-1 flex items-center gap-2 text-xs text-slate-400">
                  <span className="capitalize">{game.category} Arcade</span>
                  <span aria-hidden="true">·</span>
                  <span>Released {game.releaseYear}</span>
                  <span aria-hidden="true">·</span>
                  <span>{game.plays.toLocaleString()} plays</span>
                </div>
              </div>

              {/* Star Rating Section */}
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
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
                <span className="text-xs font-semibold text-slate-300">
                  {game.rating.toFixed(1)}
                </span>
                {ratingSubmitted && (
                  <span className="text-xs text-emerald-400 font-semibold animate-pulse">
                    Thank you!
                  </span>
                )}
              </div>
            </div>

            <p className="mt-4 text-sm text-slate-300 leading-relaxed">
              {game.longDescription || game.description}
            </p>
          </div>

          {/* How to Play / Instructions */}
          {game.instructions && game.instructions.length > 0 && (
            <div className="bg-[#0f1422] border border-slate-800 rounded-xl p-6">
              <h2 className="text-base font-bold text-slate-100 flex items-center gap-2 mb-3">
                <Info className="w-4 h-4 text-cyan-400" />
                <span>How to Play</span>
              </h2>
              <ul className="space-y-2">
                {game.instructions.map((inst, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-xs text-slate-300 leading-relaxed">
                    <span className="w-5 h-5 rounded-full bg-slate-800 border border-slate-700 text-cyan-400 font-mono text-[11px] font-bold flex items-center justify-center shrink-0 mt-0.5">
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
            <div className="bg-[#0f1422] border border-slate-800 rounded-xl p-6">
              <h2 className="text-base font-bold text-slate-100 flex items-center gap-2 mb-3">
                <Lightbulb className="w-4 h-4 text-amber-400" />
                <span>Pro Tips & Strategies</span>
              </h2>
              <ul className="space-y-2">
                {game.tips.map((tip, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-slate-300 leading-relaxed">
                    <span className="text-amber-400 font-bold shrink-0">✦</span>
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
          <div className="bg-[#0f1422] border border-slate-800 rounded-xl p-6">
            <h2 className="text-base font-bold text-slate-100 flex items-center gap-2 mb-4">
              <Keyboard className="w-4 h-4 text-emerald-400" />
              <span>Keyboard Controls</span>
            </h2>

            <div className="divide-y divide-slate-800/80">
              {game.controls.map((ctrl, i) => (
                <div key={i} className="py-2.5 flex items-center justify-between gap-3 text-xs">
                  <span className="text-slate-400">{ctrl.action}</span>
                  <kbd className="px-2.5 py-1 bg-slate-900 border border-slate-700/80 rounded font-mono text-slate-200 text-xs font-semibold shadow-inner">
                    {ctrl.key}
                  </kbd>
                </div>
              ))}
            </div>
          </div>

          {/* Related Games Suggestions (if any) */}
          {relatedGames.length > 0 && (
            <div className="bg-[#0f1422] border border-slate-800 rounded-xl p-6">
              <h2 className="text-base font-bold text-slate-100 mb-3">
                You Might Also Like
              </h2>
              <div className="space-y-2.5">
                {relatedGames.map((rel) => (
                  <div
                    key={rel.id}
                    onClick={() => onSelectRelatedGame(rel)}
                    className="flex items-center gap-3 p-2 rounded-lg bg-slate-900/60 hover:bg-slate-800 border border-slate-800/60 hover:border-cyan-500/40 cursor-pointer transition-colors group"
                  >
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center font-mono font-bold text-sm shrink-0"
                      style={{
                        backgroundColor: `${rel.accentColor}22`,
                        color: rel.accentColor
                      }}
                    >
                      {rel.title.slice(0, 2).toUpperCase()}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-bold text-slate-200 group-hover:text-cyan-400 truncate">
                        {rel.title}
                      </h4>
                      <p className="text-[11px] text-slate-400 capitalize">
                        {rel.category} · {rel.rating.toFixed(1)} ★
                      </p>
                    </div>
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

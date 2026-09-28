import React, { useState, useRef, useEffect, useCallback } from 'react';
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
  Play,
  ChevronDown,
  Monitor
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
  const wakeLockRef = useRef<any>(null);
  const hudTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isCssFullscreen, setIsCssFullscreen] = useState(false);
  const activeFullscreen = isFullscreen || isCssFullscreen;

  // Fullscreen enhancements state
  const [fullscreenFit, setFullscreenFit] = useState<'fill' | 'fit'>('fill');
  const [showFullscreenHud, setShowFullscreenHud] = useState(false);
  const [showFullscreenToast, setShowFullscreenToast] = useState(false);
  const [focusIndicator, setFocusIndicator] = useState(false);

  const [isTheater, setIsTheater] = useState(false);
  const [aspectRatio, setAspectRatio] = useState<'16/9' | '4/3' | '1/1' | 'fill'>(
    game.aspectRatio === '1/1' ? '1/1' : game.aspectRatio === '4/3' ? '4/3' : '16/9'
  );
  const [copiedLink, setCopiedLink] = useState(false);
  const [userRating, setUserRating] = useState<number | null>(null);
  const [ratingSubmitted, setRatingSubmitted] = useState(false);

  // Screen Wake Lock to prevent display sleep in fullscreen
  const requestWakeLock = useCallback(async () => {
    try {
      if ('wakeLock' in navigator) {
        wakeLockRef.current = await (navigator as any).wakeLock.request('screen');
      }
    } catch {}
  }, []);

  const releaseWakeLock = useCallback(() => {
    try {
      if (wakeLockRef.current) {
        wakeLockRef.current.release();
        wakeLockRef.current = null;
      }
    } catch {}
  }, []);

  // Auto-hide HUD timer helpers
  const clearAutoHideHud = useCallback(() => {
    if (hudTimeoutRef.current) {
      clearTimeout(hudTimeoutRef.current);
      hudTimeoutRef.current = null;
    }
  }, []);

  const scheduleAutoHideHud = useCallback((delay = 2500) => {
    clearAutoHideHud();
    hudTimeoutRef.current = setTimeout(() => {
      setShowFullscreenHud(false);
    }, delay);
  }, [clearAutoHideHud]);

  const handleFocusIframe = useCallback(() => {
    if (iframeRef.current) {
      iframeRef.current.focus();
      setFocusIndicator(true);
      setTimeout(() => setFocusIndicator(false), 1800);
    }
  }, []);

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
      releaseWakeLock();
      clearAutoHideHud();
      if (iframeRef.current) {
        try {
          iframeRef.current.src = 'about:blank';
        } catch {}
      }
    };
  }, [game.id, game.aspectRatio, releaseWakeLock, clearAutoHideHud]);

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

  // When activeFullscreen toggles, manage wake lock, HUD toast, and auto-focus
  useEffect(() => {
    if (activeFullscreen) {
      requestWakeLock();
      setShowFullscreenHud(true);
      setShowFullscreenToast(true);
      const toastTimer = setTimeout(() => setShowFullscreenToast(false), 2800);
      scheduleAutoHideHud(3500);

      // Auto focus game controls in iframe
      const focusTimer = setTimeout(() => {
        iframeRef.current?.focus();
      }, 150);

      return () => {
        clearTimeout(toastTimer);
        clearTimeout(focusTimer);
      };
    } else {
      releaseWakeLock();
      setShowFullscreenHud(false);
      setShowFullscreenToast(false);
      clearAutoHideHud();
    }
  }, [activeFullscreen, requestWakeLock, releaseWakeLock, scheduleAutoHideHud, clearAutoHideHud]);

  // Keyboard shortcut listener: F key to toggle fullscreen, Escape to exit CSS fallback
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const tag = (document.activeElement?.tagName || '').toLowerCase();
      if (tag === 'input' || tag === 'textarea' || tag === 'select') return;

      if (e.key === 'Escape' && isCssFullscreen) {
        setIsCssFullscreen(false);
        return;
      }

      if (e.key === 'f' || e.key === 'F') {
        e.preventDefault();
        handleToggleFullscreen();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isCssFullscreen, activeFullscreen]);

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
          setTimeout(() => iframeRef.current?.focus(), 100);
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
          className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-neutral-300 hover:text-white transition-colors cursor-pointer group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Catalog</span>
        </button>

        {/* Unboxed breadcrumb metadata */}
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-neutral-400">
          <span className="text-neutral-200 capitalize font-medium">{game.category}</span>
          <span aria-hidden="true" className="text-neutral-700">·</span>
          <span>{game.releaseYear}</span>
        </div>
      </div>

      {/* Main Iframe Player Wrapper */}
      <div
        ref={wrapperRef}
        className={`relative bg-black overflow-hidden border border-neutral-800 shadow-2xl flex flex-col ${
          activeFullscreen
            ? '!fixed !inset-0 !w-screen !h-screen !max-h-screen !z-[999999] !rounded-none !border-0 !m-0 !p-0 select-none'
            : 'rounded-2xl'
        }`}
      >
        {/* Fullscreen Overlay System */}
        {activeFullscreen && (
          <>
            {/* Top Hover Trigger Strip */}
            <div
              className="absolute top-0 left-0 right-0 h-10 z-[1000001] pointer-events-auto"
              onMouseEnter={() => {
                setShowFullscreenHud(true);
                clearAutoHideHud();
              }}
            />

            {/* Entry Toast Notification */}
            {showFullscreenToast && (
              <div className="absolute top-6 left-1/2 -translate-x-1/2 z-[1000004] bg-neutral-950/95 text-white border border-neutral-700 rounded-full px-5 py-2 text-xs font-semibold shadow-2xl backdrop-blur-md flex items-center gap-2.5 animate-in fade-in zoom-in-95 duration-200 pointer-events-none">
                <span className="w-2 h-2 rounded-full bg-white animate-ping" />
                <span>Fullscreen Active · Hover top edge for controls · Press [F] or [Esc] to exit</span>
              </div>
            )}

            {/* Top Subtle Handle Pill (shown when HUD is hidden) */}
            {!showFullscreenHud && (
              <button
                type="button"
                onClick={() => setShowFullscreenHud(true)}
                onMouseEnter={() => {
                  setShowFullscreenHud(true);
                  clearAutoHideHud();
                }}
                className="absolute top-2 left-1/2 -translate-x-1/2 z-[1000002] flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-neutral-950/80 hover:bg-neutral-900 text-neutral-400 hover:text-white border border-neutral-800 text-[11px] backdrop-blur-md transition-all shadow-xl opacity-35 hover:opacity-100 cursor-pointer"
                title="Open Controls HUD"
              >
                <ChevronDown className="w-3.5 h-3.5 text-neutral-300" />
                <span className="font-mono font-medium">Controls</span>
              </button>
            )}

            {/* Floating Fullscreen Control HUD */}
            {showFullscreenHud && (
              <div
                className="absolute top-3 left-1/2 -translate-x-1/2 z-[1000003] max-w-4xl w-[94%] sm:w-auto bg-neutral-950/95 backdrop-blur-xl border border-neutral-800 rounded-2xl p-2 sm:px-4 sm:py-2.5 shadow-2xl flex items-center justify-between sm:justify-center gap-2 sm:gap-3 text-xs animate-in slide-in-from-top-3 duration-200"
                onMouseEnter={clearAutoHideHud}
                onMouseLeave={() => scheduleAutoHideHud(2000)}
              >
                {/* Game Title & Category Badge */}
                <div className="flex items-center gap-2 pr-2 border-r border-neutral-800">
                  <span className="font-bold text-white text-xs sm:text-sm truncate max-w-[130px] sm:max-w-none">
                    {game.title}
                  </span>
                  <span className="hidden md:inline-block text-[10px] font-mono text-neutral-400 uppercase bg-neutral-900 px-1.5 py-0.5 rounded border border-neutral-800">
                    {game.category}
                  </span>
                </div>

                {/* Viewport Fit Toggle */}
                <div className="flex items-center bg-neutral-900 border border-neutral-800 rounded-xl p-0.5 text-[11px] font-medium">
                  <button
                    type="button"
                    onClick={() => setFullscreenFit('fill')}
                    className={`px-2.5 py-1 rounded-lg transition-colors flex items-center gap-1 cursor-pointer ${
                      fullscreenFit === 'fill'
                        ? 'bg-white text-black font-bold shadow-sm'
                        : 'text-neutral-400 hover:text-white'
                    }`}
                    title="Stretch to fill entire display edge-to-edge"
                  >
                    <Maximize2 className="w-3 h-3" />
                    <span>Fill Screen</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setFullscreenFit('fit')}
                    className={`px-2.5 py-1 rounded-lg transition-colors flex items-center gap-1 cursor-pointer ${
                      fullscreenFit === 'fit'
                        ? 'bg-white text-black font-bold shadow-sm'
                        : 'text-neutral-400 hover:text-white'
                    }`}
                    title="Maintain native aspect ratio with cinema bars"
                  >
                    <Tv className="w-3 h-3" />
                    <span>Fit Ratio</span>
                  </button>
                </div>

                {/* Controls Focus & Reload */}
                <div className="flex items-center gap-1 sm:gap-1.5">
                  <button
                    type="button"
                    onClick={handleFocusIframe}
                    className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-neutral-200 border border-neutral-800 text-xs font-medium transition-colors cursor-pointer"
                    title="Direct keyboard & mouse focus to game"
                  >
                    <Keyboard className="w-3.5 h-3.5 text-neutral-300" />
                    <span className="hidden sm:inline">{focusIndicator ? 'Focused!' : 'Focus'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleReloadIframe}
                    className="p-1.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-neutral-200 border border-neutral-800 transition-colors cursor-pointer"
                    title="Restart / Reload game"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                  </button>

                  <button
                    type="button"
                    onClick={handlePopOutAboutBlank}
                    className="hidden lg:flex items-center gap-1 p-1.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-neutral-200 border border-neutral-800 text-xs font-medium transition-colors cursor-pointer"
                    title="Stealth pop-out in about:blank tab"
                  >
                    <ExternalLink className="w-3.5 h-3.5 text-neutral-300" />
                  </button>
                </div>

                {/* Exit Fullscreen */}
                <button
                  type="button"
                  onClick={handleToggleFullscreen}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white hover:bg-neutral-200 text-black font-bold text-xs transition-all shadow-md cursor-pointer shrink-0"
                  title="Exit Fullscreen (Esc or F)"
                >
                  <Minimize2 className="w-3.5 h-3.5" />
                  <span>Exit</span>
                  <span className="hidden sm:inline text-[10px] opacity-75 font-mono">ESC</span>
                </button>
              </div>
            )}
          </>
        )}

        {/* Iframe Viewport Container */}
        <div
          className={`relative w-full bg-black flex items-center justify-center transition-all ${
            activeFullscreen
              ? 'flex-1 h-full w-full overflow-hidden'
              : isTheater
              ? 'h-[750px] max-h-[88vh]'
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
            className="force-focus block border-0"
            style={{
              width: activeFullscreen
                ? (fullscreenFit === 'fit'
                    ? (game.aspectRatio === '4/3' ? 'min(calc(100vh * 4 / 3), 100vw)' : game.aspectRatio === '1/1' ? 'min(100vh, 100vw)' : 'min(calc(100vh * 16 / 9), 100vw)')
                    : '100%')
                : (game.iframeStyle?.width || '100%'),
              height: activeFullscreen
                ? (fullscreenFit === 'fit'
                    ? (game.aspectRatio === '4/3' ? 'min(calc(100vw * 3 / 4), 100vh)' : game.aspectRatio === '1/1' ? 'min(100vh, 100vw)' : 'min(calc(100vw * 9 / 16), 100vh)')
                    : '100%')
                : (game.iframeStyle?.height || '100%'),
              border: 0,
              ...(game.iframeStyle || {})
            }}
            loading="eager"
            {...({ importance: 'high' } as any)}
            allowFullScreen
            webkitallowfullscreen="true"
            mozallowfullscreen="true"
            data-lang="en"
            data-hj-allow-iframe="true"
            sandbox="allow-forms allow-modals allow-orientation-lock allow-pointer-lock allow-presentation allow-scripts allow-same-origin allow-downloads allow-popups allow-popups-to-escape-sandbox allow-top-navigation-by-user-activation allow-storage-access-by-user-activation"
            allow="autoplay; payment; fullscreen *; microphone; focus-without-user-activation *; screen-wake-lock; gamepad; clipboard-read; clipboard-write; accelerometer; gyroscope; keyboard-map; encrypted-media *; picture-in-picture *; web-share *"
          />
        </div>

        {/* Sleek Minimalist Player Toolbar (Displayed when NOT in fullscreen) */}
        {!activeFullscreen && (
          <div className="bg-[#0a0a0a] border-t border-neutral-800 px-4 py-2 flex items-center justify-between flex-wrap gap-2 text-xs text-neutral-300">
            {/* Left: Title & unboxed category */}
            <div className="flex items-center gap-2">
              <span className="font-bold text-white text-sm">
                {game.title}
              </span>
              <span aria-hidden="true" className="text-neutral-700">·</span>
              <span className="text-xs text-neutral-400 capitalize">{game.category}</span>
            </div>

            {/* Right: Controls */}
            <div className="flex items-center gap-1.5 sm:gap-2">
              {/* Aspect ratio selector */}
              <div className="flex items-center bg-[#111111] border border-neutral-800 rounded-lg p-0.5 text-[11px] font-mono">
                <button
                  onClick={() => setAspectRatio('16/9')}
                  className={`px-2 py-0.5 rounded transition-colors cursor-pointer ${
                    aspectRatio === '16/9' ? 'bg-neutral-800 text-white font-bold' : 'text-neutral-400 hover:text-white'
                  }`}
                  title="16:9 Widescreen"
                >
                  16:9
                </button>
                <button
                  onClick={() => setAspectRatio('4/3')}
                  className={`px-2 py-0.5 rounded transition-colors cursor-pointer ${
                    aspectRatio === '4/3' ? 'bg-neutral-800 text-white font-bold' : 'text-neutral-400 hover:text-white'
                  }`}
                  title="4:3 Box"
                >
                  4:3
                </button>
                <button
                  onClick={() => setAspectRatio('1/1')}
                  className={`px-2 py-0.5 rounded transition-colors cursor-pointer ${
                    aspectRatio === '1/1' ? 'bg-neutral-800 text-white font-bold' : 'text-neutral-400 hover:text-white'
                  }`}
                  title="1:1 Square"
                >
                  1:1
                </button>
              </div>

              {/* Reload button */}
              <button
                onClick={handleReloadIframe}
                title="Restart / Reload Game"
                className="p-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-white transition-colors cursor-pointer border border-neutral-800"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>

              {/* Theater Mode toggle */}
              <button
                onClick={() => setIsTheater(!isTheater)}
                title={isTheater ? 'Default View' : 'Theater Mode (Expand View)'}
                className={`p-1.5 rounded-lg transition-colors cursor-pointer border ${
                  isTheater
                    ? 'bg-white text-black font-bold border-white'
                    : 'bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-white border-neutral-800'
                }`}
              >
                <Tv className="w-3.5 h-3.5" />
              </button>

              {/* Pop-out in about:blank */}
              <button
                onClick={handlePopOutAboutBlank}
                title="Open in stealth about:blank window"
                className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-white transition-colors cursor-pointer text-xs font-medium border border-neutral-800"
              >
                <ExternalLink className="w-3.5 h-3.5 text-neutral-300" />
                <span>About:Blank</span>
              </button>

              {/* Favorite bookmark */}
              <button
                onClick={(e) => onToggleFavorite(game.id, e)}
                title={isFavorite ? 'Remove Favorite' : 'Save as Favorite'}
                className={`p-1.5 rounded-lg transition-colors cursor-pointer border ${
                  isFavorite
                    ? 'bg-amber-500 text-black shadow-md border-amber-400'
                    : 'bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-white border-neutral-800'
                }`}
              >
                <Bookmark className={`w-3.5 h-3.5 ${isFavorite ? 'fill-current' : ''}`} />
              </button>

              {/* Share Link */}
              <button
                onClick={handleShare}
                title="Copy Game Link"
                className="p-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-white transition-colors cursor-pointer border border-neutral-800"
              >
                {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
              </button>

              {/* Fullscreen button */}
              <button
                onClick={handleToggleFullscreen}
                title="Toggle Fullscreen (F)"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white hover:bg-neutral-200 text-black font-bold transition-all cursor-pointer shadow-sm"
              >
                <Maximize2 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline-block">Fullscreen</span>
                <span className="hidden md:inline-block text-[10px] opacity-75 font-mono">F</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Game Details & Controls Section */}
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 columns: Description & Instructions */}
        <div className="lg:col-span-2 space-y-6">
          {/* Header & Overview */}
          <div className="bg-[#0a0a0a] border border-neutral-800 rounded-2xl p-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-neutral-800 pb-4">
              <div>
                <h1 className="text-2xl font-black text-white">{game.title}</h1>
                <div className="mt-1 flex items-center gap-2 text-xs font-mono text-neutral-400">
                  <span className="capitalize">{game.category}</span>
                  <span aria-hidden="true" className="text-neutral-700">·</span>
                  <span>Released {game.releaseYear}</span>
                  <span aria-hidden="true" className="text-neutral-700">·</span>
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
                      className="cursor-pointer p-0.5 text-neutral-600 hover:text-amber-400 transition-colors"
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
                <span className="text-xs font-semibold text-neutral-300 font-mono">
                  {game.rating.toFixed(2)}
                </span>
                {ratingSubmitted && (
                  <span className="text-xs text-emerald-400 font-medium">
                    Saved
                  </span>
                )}
              </div>
            </div>

            <p className="mt-4 text-sm text-neutral-300 leading-relaxed">
              {game.longDescription || game.description}
            </p>
          </div>

          {/* Instructions */}
          {game.instructions && game.instructions.length > 0 && (
            <div className="bg-[#0a0a0a] border border-neutral-800 rounded-2xl p-6">
              <h2 className="text-sm font-bold uppercase tracking-wider text-white flex items-center gap-2 mb-3">
                <Info className="w-4 h-4 text-neutral-400" />
                <span>How to Play</span>
              </h2>
              <ul className="space-y-2.5">
                {game.instructions.map((inst, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-xs text-neutral-300 leading-relaxed">
                    <span className="w-5 h-5 rounded-md bg-neutral-900 border border-neutral-800 text-white font-mono text-[11px] font-bold flex items-center justify-center shrink-0 mt-0.5">
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
            <div className="bg-[#0a0a0a] border border-neutral-800 rounded-2xl p-6">
              <h2 className="text-sm font-bold uppercase tracking-wider text-white flex items-center gap-2 mb-3">
                <Lightbulb className="w-4 h-4 text-amber-400" />
                <span>Tips & Strategy</span>
              </h2>
              <ul className="space-y-2">
                {game.tips.map((tip, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-neutral-300 leading-relaxed">
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
          <div className="bg-[#0a0a0a] border border-neutral-800 rounded-2xl p-6">
            <h2 className="text-sm font-bold uppercase tracking-wider text-white flex items-center gap-2 mb-4">
              <Keyboard className="w-4 h-4 text-white" />
              <span>Keyboard Controls</span>
            </h2>

            <div className="divide-y divide-neutral-800">
              {game.controls.map((ctrl, i) => (
                <div key={i} className="py-2.5 flex items-center justify-between gap-3 text-xs">
                  <span className="text-neutral-400">{ctrl.action}</span>
                  <kbd className="px-2 py-0.5 bg-neutral-900 border border-neutral-800 rounded font-mono text-neutral-200 text-xs font-semibold">
                    {ctrl.key}
                  </kbd>
                </div>
              ))}
            </div>
          </div>

          {/* Related Games Suggestions with Real Artwork */}
          {relatedGames.length > 0 && (
            <div className="bg-[#0a0a0a] border border-neutral-800 rounded-2xl p-6">
              <h2 className="text-sm font-bold uppercase tracking-wider text-white mb-3">
                More Titles
              </h2>
              <div className="space-y-2.5">
                {relatedGames.map((rel) => (
                  <div
                    key={rel.id}
                    onClick={() => onSelectRelatedGame(rel)}
                    className="flex items-center gap-3 p-2 rounded-xl bg-neutral-950 hover:bg-neutral-900 border border-neutral-800 hover:border-neutral-700 cursor-pointer transition-colors group"
                  >
                    <div className="w-16 h-11 rounded-lg overflow-hidden relative shrink-0 bg-black border border-neutral-800">
                      {rel.thumbnailUrl ? (
                        <img
                          src={resolveAssetUrl(rel.thumbnailUrl)}
                          alt={rel.title}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center font-mono font-bold text-xs text-white">
                          {rel.title.slice(0, 2).toUpperCase()}
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-bold text-neutral-200 group-hover:text-white truncate">
                        {rel.title}
                      </h4>
                      <p className="text-[11px] text-neutral-500 font-mono capitalize">
                        {rel.category} · ★ {rel.rating.toFixed(1)}
                      </p>
                    </div>
                    <Play className="w-3.5 h-3.5 text-neutral-500 group-hover:text-white transition-colors shrink-0" />
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

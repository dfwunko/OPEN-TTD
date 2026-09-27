import React, { useState, useEffect } from 'react';
import {
  X,
  Code2,
  Globe,
  Sparkles,
  Plus,
  RotateCcw,
  Download,
  Upload,
  History,
  Check,
  FileCode,
  ShieldCheck,
  Layers
} from 'lucide-react';
import { Game } from '../types/game';
import { customEmbedManager } from '../utils/customEmbeds';
import { DEFAULT_CUSTOM_EMBED_PRESETS } from '../data/customEmbedPresets';

interface CustomGameModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSaveCustomGame: (game: Game) => void;
  customGames: Game[];
  onRestorePresets: () => void;
  onRecoverGames: (games: Game[]) => void;
  onImportSuccess: (count: number) => void;
  initialTab?: 'url' | 'html' | 'restore';
}

const SAMPLE_HTML = `<!DOCTYPE html>
<html>
<head>
  <style>
    body { margin: 0; background: #0b0f19; overflow: hidden; display: flex; align-items: center; justify-content: center; height: 100vh; color: #fff; font-family: sans-serif; }
    canvas { background: #020617; border: 2px solid #38bdf8; border-radius: 8px; cursor: pointer; }
    #info { position: absolute; top: 20px; font-size: 14px; color: #94a3b8; }
  </style>
</head>
<body>
  <div id="info">Click or drag anywhere to spawn glowing plasma particles!</div>
  <canvas id="canvas" width="480" height="380"></canvas>
  <script>
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    let particles = [];

    function addParticle(x, y) {
      for (let i = 0; i < 6; i++) {
        particles.push({
          x, y,
          vx: (Math.random() - 0.5) * 6,
          vy: (Math.random() - 0.5) * 6,
          radius: Math.random() * 6 + 3,
          color: 'hsl(' + (Math.random() * 360) + ', 90%, 65%)',
          alpha: 1
        });
      }
    }

    function animate() {
      ctx.fillStyle = 'rgba(2, 6, 23, 0.2)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.alpha -= 0.015;
        p.radius *= 0.98;

        ctx.save();
        ctx.globalAlpha = Math.max(0, p.alpha);
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        if (p.alpha <= 0) particles.splice(i, 1);
      }
      requestAnimationFrame(animate);
    }

    canvas.addEventListener('pointerdown', (e) => {
      const rect = canvas.getBoundingClientRect();
      addParticle(e.clientX - rect.left, e.clientY - rect.top);
    });
    canvas.addEventListener('pointermove', (e) => {
      if (e.buttons > 0) {
        const rect = canvas.getBoundingClientRect();
        addParticle(e.clientX - rect.left, e.clientY - rect.top);
      }
    });

    addParticle(canvas.width / 2, canvas.height / 2);
    animate();
  </script>
</body>
</html>`;

export const CustomGameModal: React.FC<CustomGameModalProps> = ({
  isOpen,
  onClose,
  onSaveCustomGame,
  customGames,
  onRestorePresets,
  onRecoverGames,
  onImportSuccess,
  initialTab = 'url'
}) => {
  const [mode, setMode] = useState<'url' | 'html' | 'restore'>('url');
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [htmlCode, setHtmlCode] = useState(SAMPLE_HTML);
  const [category, setCategory] = useState<'arcade' | 'retro' | 'puzzle' | 'action' | 'driving' | 'skill'>('arcade');

  // Recovery & Import state
  const [archivedGames, setArchivedGames] = useState<Game[]>([]);
  const [backupGames, setBackupGames] = useState<Game[]>([]);
  const [importJsonText, setImportJsonText] = useState('');
  const [importError, setImportError] = useState<string | null>(null);
  const [copiedExport, setCopiedExport] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setMode(initialTab);
      // Load current archived and backup games
      setArchivedGames(customEmbedManager.getArchivedDeletedGames());
      setBackupGames(customEmbedManager.getRecoverableBackupGames());
      setImportError(null);
      setImportJsonText('');
      setCopiedExport(false);
    }
  }, [isOpen, initialTab]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    let finalSrc = url.trim();
    const iframeMatch = finalSrc.match(/src=["']([^"']+)["']/i);
    if (iframeMatch) {
      finalSrc = iframeMatch[1];
    }

    const newGame: Game = {
      id: `custom_${Date.now()}`,
      title: title.trim(),
      category: category,
      description: mode === 'url' ? `Custom web game from ${finalSrc}` : 'Custom embedded HTML5 / Canvas game sandbox.',
      longDescription: mode === 'url' ? `Custom game embedded via iframe from ${finalSrc}` : 'User-created custom HTML5 game running in an unblocked sandbox iframe.',
      src: mode === 'url' ? finalSrc : '',
      customHtml: mode === 'html' ? htmlCode : undefined,
      isCustom: true,
      aspectRatio: '16/9',
      controls: [
        { key: 'Keyboard / Mouse', action: 'Standard Game Controls' }
      ],
      instructions: [
        'Click within the iframe viewport to focus controls.',
        'Use the reload toolbar button to reset state if needed.'
      ],
      tips: [
        'Make sure external URLs support embedding in iframes (X-Frame-Options).'
      ],
      plays: 1,
      rating: 5.0,
      ratingCount: 1,
      iconName: 'Code2',
      accentColor: '#38bdf8',
      releaseYear: new Date().getFullYear()
    };

    onSaveCustomGame(newGame);
    onClose();
    setTitle('');
    setUrl('');
  };

  const handleCopyExport = () => {
    const json = customEmbedManager.exportToJson(customGames);
    navigator.clipboard.writeText(json).then(() => {
      setCopiedExport(true);
      setTimeout(() => setCopiedExport(false), 2000);
    });
  };

  const handleDownloadBackup = () => {
    const json = customEmbedManager.exportToJson(customGames);
    const blob = new Blob([json], { type: 'application/json' });
    const blobUrl = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = blobUrl;
    a.download = `nova-arcade-custom-embeds-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(blobUrl);
  };

  const handleDoImport = () => {
    if (!importJsonText.trim()) {
      setImportError('Please paste valid JSON text.');
      return;
    }
    const res = customEmbedManager.importFromJson(importJsonText, customGames);
    if (!res.success) {
      setImportError(res.error || 'Failed to import custom embeds.');
    } else {
      setImportError(null);
      setImportJsonText('');
      onImportSuccess(res.addedCount);
      onClose();
    }
  };

  const handleRestorePresetItem = (preset: Game) => {
    onSaveCustomGame(preset);
  };

  const handleRestoreArchivedItem = (game: Game) => {
    onSaveCustomGame(game);
    // Remove from archive view
    setArchivedGames((prev) => prev.filter((g) => g.id !== game.id));
  };

  const handleRestoreAllBackup = () => {
    const recoverable = [...archivedGames, ...backupGames];
    if (recoverable.length > 0) {
      onRecoverGames(recoverable);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-[#0a0a0a] border border-neutral-800 rounded-2xl w-full max-w-xl shadow-2xl overflow-hidden my-8">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-neutral-800">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-neutral-900 text-white border border-neutral-800">
              <Code2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-lg text-white">Custom Embeds & Sandbox</h3>
              <p className="text-xs text-neutral-400">
                Embed web URLs, write custom HTML5, or restore previous embeds
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab switch */}
        <div className="px-5 pt-4 flex gap-2">
          <button
            type="button"
            onClick={() => setMode('url')}
            className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
              mode === 'url'
                ? 'bg-white text-black shadow-sm'
                : 'bg-neutral-900 text-neutral-400 hover:text-white border border-neutral-850'
            }`}
          >
            <Globe className="w-4 h-4" />
            <span>Embed by URL</span>
          </button>

          <button
            type="button"
            onClick={() => setMode('html')}
            className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
              mode === 'html'
                ? 'bg-white text-black shadow-sm'
                : 'bg-neutral-900 text-neutral-400 hover:text-white border border-neutral-850'
            }`}
          >
            <Code2 className="w-4 h-4" />
            <span>Paste HTML / JS</span>
          </button>

          <button
            type="button"
            onClick={() => setMode('restore')}
            className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
              mode === 'restore'
                ? 'bg-white text-black shadow-sm'
                : 'bg-neutral-900 text-neutral-400 hover:text-white border border-neutral-855'
            }`}
          >
            <RotateCcw className="w-4 h-4" />
            <span>Restore & Presets</span>
          </button>
        </div>

        {/* Tab 1 & 2: Form */}
        {mode !== 'restore' ? (
          <form onSubmit={handleSubmit} className="p-5 space-y-4">
            <div>
              <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                Game Title
              </label>
              <input
                type="text"
                required
                placeholder="e.g. My Favorite Scratch Game or Particle Toy"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-3.5 py-2 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-neutral-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
                className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-3.5 py-2 text-sm text-white focus:outline-none focus:border-neutral-500"
              >
                <option value="arcade">Arcade</option>
                <option value="retro">Retro</option>
                <option value="puzzle">Puzzle</option>
                <option value="action">Action</option>
                <option value="driving">Driving</option>
                <option value="skill">Skill</option>
              </select>
            </div>

            {mode === 'url' ? (
              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                  Game Embed URL (https://)
                </label>
                <input
                  type="url"
                  required
                  placeholder="https://example.com/game.html"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-3.5 py-2 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-neutral-500 font-mono"
                />
                <p className="mt-1 text-[11px] text-neutral-500">
                  Tip: Works great with Scratch embeds, GitHub pages games, or static HTML web toys.
                </p>
              </div>
            ) : (
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-semibold text-neutral-300">
                    HTML5 Code (Self-Contained)
                  </label>
                  <button
                    type="button"
                    onClick={() => setHtmlCode(SAMPLE_HTML)}
                    className="text-[11px] text-neutral-300 hover:text-white flex items-center gap-1 cursor-pointer"
                  >
                    <Sparkles className="w-3 h-3 text-neutral-400" />
                    Load Sample Code
                  </button>
                </div>
                <textarea
                  rows={7}
                  value={htmlCode}
                  onChange={(e) => setHtmlCode(e.target.value)}
                  className="w-full bg-neutral-900 border border-neutral-800 rounded-lg p-3 text-xs text-neutral-200 font-mono focus:outline-none focus:border-neutral-500 leading-normal"
                />
              </div>
            )}

            {/* Footer buttons */}
            <div className="pt-2 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-lg text-xs font-semibold text-neutral-400 hover:text-white transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-lg text-xs font-bold bg-white hover:bg-neutral-200 text-black transition-colors flex items-center gap-1.5 cursor-pointer shadow-md"
              >
                <Plus className="w-4 h-4" />
                <span>Launch & Save Game</span>
              </button>
            </div>
          </form>
        ) : (
          /* Tab 3: Restore, Presets & Recovery */
          <div className="p-5 space-y-6 max-h-[70vh] overflow-y-auto">
            {/* Section 1: Default Offline Presets */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-1.5 text-xs font-bold text-white uppercase tracking-wider font-mono">
                  <Sparkles className="w-4 h-4 text-white" />
                  <span>Curated Embed Presets</span>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    onRestorePresets();
                    onClose();
                  }}
                  className="text-[11px] font-bold text-neutral-300 hover:text-white flex items-center gap-1 cursor-pointer"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Restore All Presets</span>
                </button>
              </div>
              <p className="text-xs text-neutral-400 mb-3">
                Pre-packaged lightweight offline HTML5 games ready to restore into your sandbox:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {DEFAULT_CUSTOM_EMBED_PRESETS.map((preset) => {
                  const alreadyAdded = customGames.some((g) => g.id === preset.id || g.title === preset.title);
                  return (
                    <div
                      key={preset.id}
                      className="p-3 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-between gap-3 hover:border-neutral-700 transition-colors"
                    >
                      <div className="overflow-hidden">
                        <div className="text-xs font-bold text-white truncate">{preset.title}</div>
                        <div className="text-[11px] text-neutral-400 line-clamp-1">{preset.description}</div>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleRestorePresetItem(preset)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all shrink-0 cursor-pointer ${
                          alreadyAdded
                            ? 'bg-neutral-800 text-neutral-400 hover:text-white'
                            : 'bg-white text-black hover:bg-neutral-200'
                        }`}
                      >
                        {alreadyAdded ? 'Re-add' : '+ Add'}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Section 2: Recover Deleted / Backed-up Embeds */}
            {(archivedGames.length > 0 || backupGames.length > 0) && (
              <div className="pt-4 border-t border-neutral-800">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-white uppercase tracking-wider font-mono">
                    <History className="w-4 h-4 text-amber-400" />
                    <span>Recoverable Embed Archive ({archivedGames.length + backupGames.length})</span>
                  </div>
                  <button
                    type="button"
                    onClick={handleRestoreAllBackup}
                    className="text-[11px] font-bold text-amber-400 hover:text-amber-300 flex items-center gap-1 cursor-pointer"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>Recover All</span>
                  </button>
                </div>
                <p className="text-xs text-neutral-400 mb-3">
                  Previously deleted games or saved safety snapshots available to bring back:
                </p>

                <div className="space-y-2 max-h-40 overflow-y-auto pr-1">
                  {[...archivedGames, ...backupGames]
                    .filter((v, i, a) => a.findIndex((t) => t.id === v.id || t.title === v.title) === i)
                    .map((item) => (
                      <div
                        key={item.id}
                        className="p-2.5 rounded-lg bg-neutral-900 border border-neutral-800 flex items-center justify-between gap-3 text-xs"
                      >
                        <div className="truncate">
                          <span className="font-bold text-neutral-200">{item.title}</span>
                          <span className="text-neutral-500 ml-2 font-mono text-[10px]">({item.category})</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleRestoreArchivedItem(item)}
                          className="px-2.5 py-1 rounded bg-amber-500/20 text-amber-300 hover:bg-amber-500 hover:text-black font-bold text-[11px] cursor-pointer transition-colors"
                        >
                          Restore
                        </button>
                      </div>
                    ))}
                </div>
              </div>
            )}

            {/* Section 3: Backup & Import / Export */}
            <div className="pt-4 border-t border-neutral-800">
              <div className="flex items-center gap-1.5 text-xs font-bold text-white uppercase tracking-wider font-mono mb-2">
                <Layers className="w-4 h-4 text-white" />
                <span>Backup & Import / Export</span>
              </div>

              <div className="flex gap-2 mb-3">
                <button
                  type="button"
                  onClick={handleCopyExport}
                  className="flex-1 py-2 px-3 rounded-lg bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-xs font-semibold text-neutral-200 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  {copiedExport ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Download className="w-3.5 h-3.5 text-neutral-400" />}
                  <span>{copiedExport ? 'Copied to Clipboard!' : 'Copy Backup JSON'}</span>
                </button>

                <button
                  type="button"
                  onClick={handleDownloadBackup}
                  className="py-2 px-3 rounded-lg bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-xs font-semibold text-neutral-200 flex items-center gap-1.5 transition-colors cursor-pointer"
                  title="Download .json file"
                >
                  <FileCode className="w-3.5 h-3.5 text-neutral-300" />
                  <span>Download .json</span>
                </button>
              </div>

              {/* Import Textarea */}
              <div className="space-y-2">
                <label className="block text-[11px] font-semibold text-neutral-400">
                  Paste JSON to Import Embeds
                </label>
                <textarea
                  rows={3}
                  value={importJsonText}
                  onChange={(e) => {
                    setImportJsonText(e.target.value);
                    setImportError(null);
                  }}
                  placeholder='Paste JSON array or exported backup object here...'
                  className="w-full bg-neutral-900 border border-neutral-800 rounded-lg p-2.5 text-xs text-neutral-200 font-mono focus:outline-none focus:border-neutral-500"
                />
                {importError && (
                  <div className="text-[11px] text-rose-400 font-medium">{importError}</div>
                )}
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={handleDoImport}
                    className="px-4 py-1.5 rounded-lg text-xs font-bold bg-white hover:bg-neutral-200 text-black transition-colors flex items-center gap-1.5 cursor-pointer shadow-sm"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>Import Embeds</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

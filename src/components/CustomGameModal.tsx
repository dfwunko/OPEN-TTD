import React, { useState } from 'react';
import { X, Play, Code2, Globe, Sparkles, Plus } from 'lucide-react';
import { Game } from '../types/game';

interface CustomGameModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSaveCustomGame: (game: Game) => void;
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

    // Initial burst
    addParticle(canvas.width / 2, canvas.height / 2);
    animate();
  </script>
</body>
</html>`;

export const CustomGameModal: React.FC<CustomGameModalProps> = ({
  isOpen,
  onClose,
  onSaveCustomGame
}) => {
  const [mode, setMode] = useState<'url' | 'html'>('url');
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [htmlCode, setHtmlCode] = useState(SAMPLE_HTML);
  const [category, setCategory] = useState<'arcade' | 'retro' | 'puzzle' | 'action' | 'driving' | 'skill'>('arcade');

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

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-[#0f1422] border border-slate-800 rounded-2xl w-full max-w-xl shadow-2xl overflow-hidden my-8">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              <Code2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-lg text-white">Embed Custom Game</h3>
              <p className="text-xs text-slate-400">
                Run any web URL or custom HTML code in an unblocked iframe
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
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
                ? 'bg-cyan-500 text-slate-950 shadow-sm'
                : 'bg-slate-800/60 text-slate-400 hover:text-white'
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
                ? 'bg-cyan-500 text-slate-950 shadow-sm'
                : 'bg-slate-800/60 text-slate-400 hover:text-white'
            }`}
          >
            <Code2 className="w-4 h-4" />
            <span>Paste HTML / JS Code</span>
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Game Title
            </label>
            <input
              type="text"
              required
              placeholder="e.g. My Favorite Scratch Game or Particle Toy"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3.5 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as any)}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3.5 py-2 text-sm text-white focus:outline-none focus:border-cyan-500"
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
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Game Embed URL (https://)
              </label>
              <input
                type="url"
                required
                placeholder="https://example.com/game.html"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3.5 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 font-mono"
              />
              <p className="mt-1 text-[11px] text-slate-500">
                Tip: Works great with Scratch embeds, GitHub pages games, or static HTML web toys.
              </p>
            </div>
          ) : (
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-semibold text-slate-300">
                  HTML5 Code (Self-Contained)
                </label>
                <button
                  type="button"
                  onClick={() => setHtmlCode(SAMPLE_HTML)}
                  className="text-[11px] text-cyan-400 hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <Sparkles className="w-3 h-3" />
                  Load Sample Code
                </button>
              </div>
              <textarea
                rows={7}
                value={htmlCode}
                onChange={(e) => setHtmlCode(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-xs text-slate-200 font-mono focus:outline-none focus:border-cyan-500 leading-normal"
              />
            </div>
          )}

          {/* Footer buttons */}
          <div className="pt-2 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg text-xs font-semibold text-slate-400 hover:text-white transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-lg text-xs font-bold bg-cyan-500 hover:bg-cyan-400 text-slate-950 transition-colors flex items-center gap-1.5 cursor-pointer shadow-md shadow-cyan-500/20"
            >
              <Plus className="w-4 h-4" />
              <span>Launch & Save Game</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

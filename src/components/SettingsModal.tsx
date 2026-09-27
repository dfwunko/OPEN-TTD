import React from 'react';
import {
  X,
  SlidersHorizontal,
  ShieldAlert,
  Trash2,
  KeyRound,
  RotateCcw,
  Sparkles,
  Layers
} from 'lucide-react';
import { CloakPreset } from '../types/game';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  preset: CloakPreset;
  onChangePreset: (p: CloakPreset) => void;
  panicKey: string;
  onChangePanicKey: (k: string) => void;
  onClearData: () => void;
  onRestorePresets: () => void;
  onOpenCustomEmbedsModal: () => void;
  recoverableCount: number;
  onRecoverEmbeds: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  preset,
  onChangePreset,
  panicKey,
  onChangePanicKey,
  onClearData,
  onRestorePresets,
  onOpenCustomEmbedsModal,
  recoverableCount,
  onRecoverEmbeds
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-[#0a0a0a] border border-neutral-800 rounded-2xl w-full max-w-md shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-neutral-800 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-neutral-900 text-white border border-neutral-800">
              <SlidersHorizontal className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-lg text-white">Arcade Preferences</h3>
              <p className="text-xs text-neutral-400">Cloak presets, shortcuts & embed recovery</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 space-y-5 text-xs overflow-y-auto">
          {/* Cloak Preset */}
          <div>
            <label className="block font-semibold text-neutral-200 mb-2 flex items-center gap-1.5">
              <ShieldAlert className="w-4 h-4 text-rose-400" />
              <span>Panic Disguise Preset</span>
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'classroom', label: 'Classroom' },
                { id: 'drive', label: 'Drive' },
                { id: 'wikipedia', label: 'Wikipedia' }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => onChangePreset(item.id as CloakPreset)}
                  className={`py-2 px-3 rounded-lg font-semibold text-center border transition-colors cursor-pointer ${
                    preset === item.id
                      ? 'bg-white text-black border-white font-bold shadow-sm'
                      : 'bg-neutral-900 text-neutral-300 border-neutral-800 hover:border-neutral-700 hover:text-white'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
            <p className="mt-1.5 text-[11px] text-neutral-500">
              Select which realistic school interface to display when panic cloak is engaged.
            </p>
          </div>

          {/* Panic Key Shortcut */}
          <div>
            <label className="block font-semibold text-neutral-200 mb-2 flex items-center gap-1.5">
              <KeyRound className="w-4 h-4 text-white" />
              <span>Panic Shortcut Key</span>
            </label>
            <div className="flex gap-2">
              {[']', '\\', '`', 'Escape'].map((k) => (
                <button
                  key={k}
                  onClick={() => onChangePanicKey(k)}
                  className={`py-1.5 px-3 rounded-lg font-mono text-xs font-bold border transition-colors cursor-pointer ${
                    panicKey === k
                      ? 'bg-rose-600 text-white border-rose-500'
                      : 'bg-neutral-900 text-neutral-300 border-neutral-800 hover:border-neutral-700 hover:text-white'
                  }`}
                >
                  {k}
                </button>
              ))}
            </div>
            <p className="mt-1.5 text-[11px] text-neutral-500">
              Press this key at any time to instantly trigger or exit stealth mode.
            </p>
          </div>

          {/* Custom Embeds Recovery & Backup */}
          <div className="pt-3 border-t border-neutral-800 space-y-2.5">
            <div className="flex items-center gap-1.5 font-semibold text-neutral-200">
              <Layers className="w-4 h-4 text-white" />
              <span>Custom Embeds & Recovery</span>
            </div>

            <div className="grid grid-cols-1 gap-2">
              <button
                type="button"
                onClick={() => {
                  onRestorePresets();
                  onClose();
                }}
                className="w-full py-2 px-3 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-white border border-neutral-800 flex items-center justify-between font-semibold transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-white" />
                  <span>Restore Default Embed Presets</span>
                </div>
                <span className="text-[10px] bg-neutral-800 px-1.5 py-0.5 rounded text-neutral-300 font-mono">4 Games</span>
              </button>

              {recoverableCount > 0 && (
                <button
                  type="button"
                  onClick={() => {
                    onRecoverEmbeds();
                    onClose();
                  }}
                  className="w-full py-2 px-3 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center justify-between font-semibold transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-2">
                    <RotateCcw className="w-4 h-4 text-amber-400" />
                    <span>Recover Deleted / Backed-up Embeds</span>
                  </div>
                  <span className="text-[10px] bg-amber-500/20 px-1.5 py-0.5 rounded text-amber-200 font-mono">{recoverableCount} Saved</span>
                </button>
              )}

              <button
                type="button"
                onClick={() => {
                  onClose();
                  onOpenCustomEmbedsModal();
                }}
                className="w-full py-2 px-3 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-white border border-neutral-800 flex items-center justify-between font-semibold transition-colors cursor-pointer"
              >
                <span>Backup, Export & Import Embeds</span>
                <span className="text-[10px] text-neutral-500 font-mono">JSON</span>
              </button>
            </div>
            <p className="text-[11px] text-neutral-500">
              Recover lost custom HTML games or restore classic 2048, Snake & Flappy Bird.
            </p>
          </div>

          {/* Reset data */}
          <div className="pt-3 border-t border-neutral-800 flex items-center justify-between">
            <div>
              <div className="font-semibold text-neutral-300">Reset Local Records</div>
              <div className="text-[11px] text-neutral-500">Clears favorites & bookmarks (keeps safety backup)</div>
            </div>
            <button
              onClick={() => {
                if (confirm('Are you sure you want to clear your local records? A safety snapshot will be kept so you can recover your custom embeds.')) {
                  onClearData();
                }
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-950/40 text-red-400 hover:bg-red-900/60 border border-red-900/60 text-xs font-semibold cursor-pointer transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear Data</span>
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-neutral-950 border-t border-neutral-800 flex justify-end shrink-0">
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg text-xs font-bold bg-white hover:bg-neutral-200 text-black transition-colors cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};

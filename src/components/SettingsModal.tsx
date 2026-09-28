import React from 'react';
import { CloakPreset } from '../types/game';
import { X, Shield, Trash2, RotateCcw, AlertTriangle } from 'lucide-react';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  preset: CloakPreset;
  onChangePreset: (preset: CloakPreset) => void;
  panicKey: string;
  onChangePanicKey: (key: string) => void;
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
  recoverableCount,
  onRecoverEmbeds
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-[#0c0c0c] border border-neutral-800 rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl space-y-6 p-6">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-neutral-800 pb-4">
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-neutral-300" />
            <h2 className="text-base font-bold text-white">Preferences & Panic Cloak</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Cloak Disguise Settings */}
        <div className="space-y-4">
          <h3 className="text-xs font-mono uppercase tracking-wider text-neutral-400 font-semibold">
            Stealth Disguise Preset
          </h3>
          <div className="grid grid-cols-2 gap-2.5">
            {[
              { id: 'google', name: 'Google Search', desc: 'Disguises tab as Google' },
              { id: 'classroom', name: 'Google Classroom', desc: 'Disguises tab as Classroom' },
              { id: 'drive', name: 'Google Drive', desc: 'Disguises tab as Drive' },
              { id: 'wikipedia', name: 'Wikipedia', desc: 'Disguises tab as Wikipedia' }
            ].map((p) => (
              <button
                key={p.id}
                onClick={() => onChangePreset(p.id as CloakPreset)}
                className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                  preset === p.id
                    ? 'bg-neutral-800 border-neutral-600 text-white'
                    : 'bg-neutral-900/60 border-neutral-800 text-neutral-400 hover:border-neutral-700 hover:text-neutral-200'
                }`}
              >
                <div className="font-bold text-xs">{p.name}</div>
                <div className="text-[11px] opacity-70 mt-0.5">{p.desc}</div>
              </button>
            ))}
          </div>

          {/* Panic Hotkey */}
          <div className="flex items-center justify-between pt-2 border-t border-neutral-850">
            <div>
              <div className="text-xs font-semibold text-neutral-200">Panic Toggle Hotkey</div>
              <div className="text-[11px] text-neutral-400">Pressing this key instantly toggles stealth mode</div>
            </div>
            <input
              type="text"
              maxLength={1}
              value={panicKey}
              onChange={(e) => onChangePanicKey(e.target.value.toLowerCase() || ']')}
              className="w-12 h-9 bg-neutral-900 border border-neutral-800 rounded-lg text-center font-mono font-bold text-sm text-white focus:outline-none focus:border-neutral-500"
            />
          </div>
        </div>

        {/* System & Reset Options */}
        <div className="pt-4 border-t border-neutral-800 space-y-3">
          <h3 className="text-xs font-mono uppercase tracking-wider text-neutral-400 font-semibold">
            Data & Recovery
          </h3>
          <div className="flex flex-wrap gap-2 text-xs">
            <button
              onClick={onRestorePresets}
              className="px-3 py-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-neutral-200 font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5 text-neutral-400" />
              <span>Restore Presets</span>
            </button>

            {recoverableCount > 0 && (
              <button
                onClick={onRecoverEmbeds}
                className="px-3 py-2 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5 text-amber-400" />
                <span>Recover Archived ({recoverableCount})</span>
              </button>
            )}

            <button
              onClick={onClearData}
              className="px-3 py-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 border border-rose-500/30 font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ml-auto"
            >
              <Trash2 className="w-3.5 h-3.5 text-rose-400" />
              <span>Clear Saved Data</span>
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-2 text-right">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-white hover:bg-neutral-200 text-black font-bold text-xs cursor-pointer transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};

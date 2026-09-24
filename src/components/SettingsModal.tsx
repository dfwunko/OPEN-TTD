import React from 'react';
import { X, SlidersHorizontal, ShieldAlert, Trash2, KeyRound } from 'lucide-react';
import { CloakPreset } from '../types/game';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  preset: CloakPreset;
  onChangePreset: (p: CloakPreset) => void;
  panicKey: string;
  onChangePanicKey: (k: string) => void;
  onClearData: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  preset,
  onChangePreset,
  panicKey,
  onChangePanicKey,
  onClearData
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#0f1422] border border-slate-800 rounded-2xl w-full max-w-md shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              <SlidersHorizontal className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-lg text-white">Arcade Settings</h3>
              <p className="text-xs text-slate-400">Cloak presets and keyboard shortcuts</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 space-y-5 text-xs">
          {/* Cloak Preset */}
          <div>
            <label className="block font-semibold text-slate-200 mb-2 flex items-center gap-1.5">
              <ShieldAlert className="w-4 h-4 text-red-400" />
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
                      ? 'bg-cyan-500 text-slate-950 border-cyan-400 font-bold shadow-sm'
                      : 'bg-slate-900 text-slate-300 border-slate-700 hover:border-slate-600'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
            <p className="mt-1.5 text-[11px] text-slate-500">
              Select which realistic school interface to display when panic cloak is engaged.
            </p>
          </div>

          {/* Panic Key Shortcut */}
          <div>
            <label className="block font-semibold text-slate-200 mb-2 flex items-center gap-1.5">
              <KeyRound className="w-4 h-4 text-cyan-400" />
              <span>Panic Shortcut Key</span>
            </label>
            <div className="flex gap-2">
              {[']', '\\', '`', 'Escape'].map((k) => (
                <button
                  key={k}
                  onClick={() => onChangePanicKey(k)}
                  className={`py-1.5 px-3 rounded-lg font-mono text-xs font-bold border transition-colors cursor-pointer ${
                    panicKey === k
                      ? 'bg-red-500 text-white border-red-400'
                      : 'bg-slate-900 text-slate-300 border-slate-700 hover:border-slate-600'
                  }`}
                >
                  {k}
                </button>
              ))}
            </div>
            <p className="mt-1.5 text-[11px] text-slate-500">
              Press this key at any time to instantly trigger or exit stealth mode.
            </p>
          </div>

          {/* Reset data */}
          <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
            <div>
              <div className="font-semibold text-slate-300">Reset Local Records</div>
              <div className="text-[11px] text-slate-500">Clears favorites and high scores</div>
            </div>
            <button
              onClick={() => {
                if (confirm('Are you sure you want to clear your local favorites and scores?')) {
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
        <div className="p-4 bg-slate-900/60 border-t border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg text-xs font-bold bg-cyan-500 hover:bg-cyan-400 text-slate-950 transition-colors cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};

import React, { Component, ErrorInfo, ReactNode } from 'react';
import { RotateCcw, AlertTriangle } from 'lucide-react';
import { safeStorage } from '../utils/storage';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Nova Arcade runtime caught error:', error, errorInfo);
  }

  private handleReset = () => {
    safeStorage.clear();
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-black text-white flex items-center justify-center p-6">
          <div className="max-w-md w-full bg-[#0a0a0a] border border-neutral-800 rounded-2xl p-6 text-center shadow-2xl">
            <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-center text-white">
              <AlertTriangle className="w-6 h-6 text-amber-400" />
            </div>
            <h1 className="text-xl font-bold text-white mb-2">Nova Arcade Recovery</h1>
            <p className="text-sm text-neutral-400 mb-6 leading-relaxed">
              An unexpected display issue occurred. You can restore default state or reload the arcade.
            </p>
            <div className="flex gap-3 justify-center">
              <button
                onClick={() => window.location.reload()}
                className="px-4 py-2 rounded-xl bg-white hover:bg-neutral-200 text-black font-semibold text-sm transition-colors cursor-pointer flex items-center gap-2"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Reload</span>
              </button>
              <button
                onClick={this.handleReset}
                className="px-4 py-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-neutral-300 border border-neutral-800 font-semibold text-sm transition-colors cursor-pointer"
              >
                Reset Cache
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

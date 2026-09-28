import React, { Component, ErrorInfo, ReactNode } from 'react';
import { RotateCcw, AlertTriangle, Copy, Check, RefreshCw, Home, ChevronDown, ChevronUp, Terminal } from 'lucide-react';
import { safeStorage } from '../utils/storage';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
  showDetails: boolean;
  copied: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
    errorInfo: null,
    showDetails: false,
    copied: false,
  };

  public static getDerivedStateFromError(error: Error): Partial<State> {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Nova Arcade runtime caught error:', error, errorInfo);
    this.setState({ errorInfo });
  }

  private handleResetCache = () => {
    safeStorage.clear();
    try {
      localStorage.clear();
      sessionStorage.clear();
    } catch {}
    window.location.href = window.location.pathname;
  };

  private handleTryRecover = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
  };

  private handleGoHome = () => {
    window.location.href = window.location.pathname;
  };

  private handleCopyError = async () => {
    const errorText = [
      `Nova Arcade Error Report`,
      `Time: ${new Date().toISOString()}`,
      `URL: ${window.location.href}`,
      `User Agent: ${navigator.userAgent}`,
      `Error Name: ${this.state.error?.name || 'Error'}`,
      `Message: ${this.state.error?.message || 'Unknown error'}`,
      `\nStack Trace:\n${this.state.error?.stack || 'No stack trace available'}`,
      `\nComponent Stack:\n${this.state.errorInfo?.componentStack || 'No component stack available'}`
    ].join('\n');

    try {
      await navigator.clipboard.writeText(errorText);
      this.setState({ copied: true });
      setTimeout(() => this.setState({ copied: false }), 2500);
    } catch {
      // Fallback if clipboard API is restricted
      const textarea = document.createElement('textarea');
      textarea.value = errorText;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      this.setState({ copied: true });
      setTimeout(() => this.setState({ copied: false }), 2500);
    }
  };

  public render() {
    if (this.state.hasError) {
      const error = this.state.error;
      const errorMessage = error?.message || 'An unexpected rendering error occurred.';
      const errorName = error?.name || 'Runtime Error';

      return (
        <div className="min-h-screen bg-[#06080e] text-slate-100 flex items-center justify-center p-4 sm:p-6 font-sans">
          <div className="max-w-xl w-full bg-[#0b0f19] border border-rose-500/30 rounded-2xl p-6 sm:p-8 shadow-2xl shadow-rose-950/20 backdrop-blur-sm relative overflow-hidden">
            {/* Top accent glow */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-rose-500 via-amber-500 to-cyan-500" />

            {/* Error Icon & Header */}
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 rounded-xl bg-rose-500/10 border border-rose-500/25 flex items-center justify-center shrink-0 text-rose-400">
                <AlertTriangle className="w-6 h-6 animate-pulse" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[11px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 font-semibold border border-rose-500/30">
                    Application Error
                  </span>
                  <span className="text-xs text-slate-500 font-mono">
                    {errorName}
                  </span>
                </div>
                <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                  Nova Arcade Encountered an Error
                </h1>
                <p className="text-sm text-slate-400 mt-1 leading-relaxed">
                  A problem prevented this screen from loading properly. Your progress and favorites are stored locally.
                </p>
              </div>
            </div>

            {/* Main Error Box */}
            <div className="mb-6 rounded-xl bg-[#05070c] border border-slate-800/80 p-4">
              <div className="flex items-center justify-between text-xs text-slate-400 mb-2 font-mono pb-2 border-b border-slate-800/60">
                <div className="flex items-center gap-1.5 text-rose-400 font-semibold">
                  <Terminal className="w-3.5 h-3.5" />
                  <span>Error Output</span>
                </div>
                <button
                  type="button"
                  onClick={this.handleCopyError}
                  className="flex items-center gap-1 text-slate-400 hover:text-cyan-400 transition-colors cursor-pointer"
                  title="Copy error details"
                >
                  {this.state.copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400 font-medium">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Details</span>
                    </>
                  )}
                </button>
              </div>
              <div className="font-mono text-xs text-rose-300/90 whitespace-pre-wrap break-all leading-relaxed max-h-36 overflow-y-auto">
                {errorMessage}
              </div>
            </div>

            {/* Collapsible Technical Details / Stack Trace */}
            <div className="mb-6">
              <button
                type="button"
                onClick={() => this.setState((prev) => ({ showDetails: !prev.showDetails }))}
                className="w-full flex items-center justify-between px-3 py-2 rounded-lg bg-slate-900/60 hover:bg-slate-900 border border-slate-800/60 text-xs font-mono text-slate-400 hover:text-slate-200 transition-colors cursor-pointer"
              >
                <span>Technical Stack Trace ({this.state.showDetails ? 'Hide' : 'Show'})</span>
                {this.state.showDetails ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>

              {this.state.showDetails && (
                <div className="mt-2 rounded-xl bg-[#030508] border border-slate-800 p-3 max-h-48 overflow-y-auto text-[11px] font-mono text-slate-400 leading-relaxed whitespace-pre-wrap break-all">
                  {error?.stack || this.state.errorInfo?.componentStack || 'No stack trace available for this error.'}
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-2.5 pt-2">
              <button
                type="button"
                onClick={() => window.location.reload()}
                className="flex-1 min-w-[140px] px-4 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold text-sm transition-all shadow-lg shadow-cyan-500/20 flex items-center justify-center gap-2 cursor-pointer active:scale-95"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Reload Arcade</span>
              </button>

              <button
                type="button"
                onClick={this.handleTryRecover}
                className="px-4 py-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-200 font-medium text-sm border border-slate-700/80 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95"
                title="Attempt to recover without full reload"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Try Again</span>
              </button>

              <button
                type="button"
                onClick={this.handleGoHome}
                className="px-3.5 py-2.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-300 font-medium text-sm border border-slate-800 transition-all flex items-center justify-center gap-1.5 cursor-pointer active:scale-95"
                title="Return to lobby"
              >
                <Home className="w-4 h-4" />
                <span className="hidden sm:inline">Lobby</span>
              </button>

              <button
                type="button"
                onClick={this.handleResetCache}
                className="px-3.5 py-2.5 rounded-xl bg-rose-950/20 hover:bg-rose-950/40 text-rose-300 hover:text-rose-200 border border-rose-900/40 font-medium text-xs sm:text-sm transition-all cursor-pointer"
                title="Clears corrupted state and reloads"
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

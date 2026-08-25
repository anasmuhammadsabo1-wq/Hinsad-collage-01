import React from 'react';
import { Sun, Moon, Sparkles } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface ThemeToggleProps {
  variant?: 'topbar' | 'header' | 'floating' | 'mobile';
  className?: string;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({
  variant = 'header',
  className = '',
}) => {
  const { theme, toggleTheme, isDay } = useTheme();

  if (variant === 'topbar') {
    return (
      <button
        id="topbar-theme-toggle"
        onClick={toggleTheme}
        aria-label={`Switch to ${isDay ? 'Night' : 'Day'} mode`}
        title={`Currently in ${isDay ? 'Day Mode (Milk White & Green)' : 'Night Mode (Obsidian Dark)'} - Click to switch`}
        className={`px-2.5 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer border ${
          isDay
            ? 'bg-amber-100/20 hover:bg-amber-100/30 text-amber-200 border-amber-300/40'
            : 'bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border-emerald-400/40'
        } ${className}`}
      >
        {isDay ? (
          <>
            <Sun className="w-3.5 h-3.5 text-amber-300 animate-spin-slow" />
            <span className="hidden xl:inline text-[11px]">Day Mode</span>
          </>
        ) : (
          <>
            <Moon className="w-3.5 h-3.5 text-emerald-300" />
            <span className="hidden xl:inline text-[11px]">Night Mode</span>
          </>
        )}
      </button>
    );
  }

  if (variant === 'mobile') {
    return (
      <button
        id="mobile-theme-toggle"
        onClick={toggleTheme}
        className={`w-full py-2.5 px-3 rounded-xl font-bold text-xs flex items-center justify-between transition-all cursor-pointer border ${
          isDay
            ? 'bg-[#F4EFE6] text-[#065F46] border-[#E2DBD0] hover:bg-[#EBE5D8]'
            : 'bg-slate-800 text-emerald-300 border-slate-700 hover:bg-slate-700'
        } ${className}`}
      >
        <div className="flex items-center gap-2">
          {isDay ? (
            <Sun className="w-4 h-4 text-amber-600" />
          ) : (
            <Moon className="w-4 h-4 text-emerald-400" />
          )}
          <span>{isDay ? 'Day Mode (Milk White & Green)' : 'Night Mode (Dark Theme)'}</span>
        </div>
        <span className="text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider bg-emerald-600/15 text-emerald-700 dark:text-emerald-300">
          {isDay ? 'Switch to Night' : 'Switch to Day'}
        </span>
      </button>
    );
  }

  if (variant === 'floating') {
    return (
      <div className="fixed bottom-24 right-5 z-40">
        <button
          id="floating-theme-toggle"
          onClick={toggleTheme}
          aria-label="Toggle Day and Night Mode"
          title={`Switch to ${isDay ? 'Night Mode' : 'Day Mode (Milk White & Green)'}`}
          className={`group flex items-center gap-2 p-3 rounded-full shadow-2xl transition-all duration-300 transform hover:scale-105 active:scale-95 cursor-pointer border ${
            isDay
              ? 'bg-[#FCFAF6] text-[#065F46] border-[#E0D8C8] hover:bg-white shadow-emerald-900/10'
              : 'bg-slate-900 text-emerald-300 border-slate-700 hover:bg-slate-800 shadow-black/40'
          } ${className}`}
        >
          {isDay ? (
            <Sun className="w-5 h-5 text-amber-600 transition-transform group-hover:rotate-45" />
          ) : (
            <Moon className="w-5 h-5 text-emerald-400 transition-transform group-hover:-rotate-12" />
          )}
          <span className="hidden sm:inline-block text-xs font-bold pr-1">
            {isDay ? 'Day' : 'Night'}
          </span>
        </button>
      </div>
    );
  }

  // Default 'header' pill
  return (
    <button
      id="header-theme-toggle"
      onClick={toggleTheme}
      aria-label={`Switch to ${isDay ? 'Night' : 'Day'} mode`}
      title={`Active: ${isDay ? 'Day Mode (Milk White & Emerald Green)' : 'Night Mode (Midnight Obsidian)'} - Click to switch`}
      className={`relative inline-flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer border shadow-xs ${
        isDay
          ? 'bg-[#FBF8F2] hover:bg-[#F3EDE0] text-[#065F46] border-[#E5DED0] hover:border-emerald-600/30'
          : 'bg-slate-800 hover:bg-slate-700 text-emerald-300 border-slate-700 hover:border-emerald-500/40'
      } ${className}`}
    >
      <div className="flex items-center gap-1.5">
        {isDay ? (
          <div className="flex items-center gap-1.5">
            <span className="p-1 rounded-md bg-amber-100 text-amber-700">
              <Sun className="w-3.5 h-3.5" />
            </span>
            <span className="text-[#14281E] font-extrabold hidden md:inline">Day</span>
          </div>
        ) : (
          <div className="flex items-center gap-1.5">
            <span className="p-1 rounded-md bg-emerald-950 text-emerald-400 border border-emerald-800">
              <Moon className="w-3.5 h-3.5" />
            </span>
            <span className="text-slate-100 font-extrabold hidden md:inline">Night</span>
          </div>
        )}
      </div>

      <div className="w-7 h-4 rounded-full bg-slate-200 dark:bg-slate-700 p-0.5 flex items-center transition-colors">
        <div
          className={`w-3 h-3 rounded-full transition-transform ${
            isDay
              ? 'translate-x-0 bg-emerald-600'
              : 'translate-x-3 bg-emerald-400'
          }`}
        />
      </div>
    </button>
  );
};

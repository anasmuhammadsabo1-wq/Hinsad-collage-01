import React, { createContext, useContext, useEffect, useState } from 'react';
import { ThemeMode } from '../types';

interface ThemeContextType {
  theme: ThemeMode;
  toggleTheme: () => void;
  setTheme: (mode: ThemeMode) => void;
  isDay: boolean;
  isNight: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<ThemeMode>(() => {
    try {
      const saved = localStorage.getItem('hinsad_theme');
      if (saved === 'night' || saved === 'day') {
        return saved;
      }
    } catch {
      // Fallback
    }
    return 'day'; // Default to Milk White & Green Day Mode
  });

  useEffect(() => {
    try {
      localStorage.setItem('hinsad_theme', theme);
    } catch {
      // Fallback
    }

    const root = document.documentElement;
    root.setAttribute('data-theme', theme);
    if (theme === 'night') {
      root.classList.add('dark', 'night-mode');
      root.classList.remove('day-mode');
      document.body.classList.add('night-mode');
      document.body.classList.remove('day-mode');
    } else {
      root.classList.remove('dark', 'night-mode');
      root.classList.add('day-mode');
      document.body.classList.remove('night-mode');
      document.body.classList.add('day-mode');
    }
  }, [theme]);

  const toggleTheme = () => {
    setThemeState((prev) => (prev === 'day' ? 'night' : 'day'));
  };

  const setTheme = (mode: ThemeMode) => {
    setThemeState(mode);
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        toggleTheme,
        setTheme,
        isDay: theme === 'day',
        isNight: theme === 'night',
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

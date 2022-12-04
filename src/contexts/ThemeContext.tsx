import { createContext } from 'react';

import type { ThemeColors } from '../utils/theme';

export type Theme = {
  mode: 'light' | 'dark' | 'system';
  theme: {
    colors: ThemeColors;
  };
  getModes: () => string[];
  setThemeMode: (mode: Theme['mode']) => void;
  reset: () => void;
};

export const ThemeContext = createContext({} as Theme);

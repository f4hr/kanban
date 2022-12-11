import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';

import { storage } from '../utils/storage';
import { themeColors } from '../utils/theme';
import { ThemeContext } from '../contexts/ThemeContext';

import type { Theme } from '../contexts/ThemeContext';

export type ThemeMode = Theme['mode'];

interface ThemeProviderProps extends React.PropsWithChildren {
  theme?: ThemeMode;
}

export const STORAGE_UI_THEME_KEY = 'ui.theme.mode';

export function ThemeProvider({ children, theme }: ThemeProviderProps) {
  const [systemTheme, setSystemTheme] = useState<Omit<ThemeMode, 'system'>>('light');
  const [mode, setMode] = useState<ThemeMode>(
    theme ?? storage.getItem<ThemeMode>(STORAGE_UI_THEME_KEY) ?? 'system',
  );
  const isDark = mode === 'dark' || (mode === 'system' && systemTheme === 'dark');
  const documentRef = useRef<HTMLElement | null>(null);

  // Get "html" element ref
  useEffect(() => {
    documentRef.current = document.documentElement;
  }, []);

  // Listen to system theme changes
  useLayoutEffect(() => {
    if (!window.matchMedia) return undefined;

    const updateThemeMode = (e: MediaQueryListEvent) =>
      setSystemTheme(e.matches ? 'dark' : 'light');

    const colorSchemeMQ = window.matchMedia('(prefers-color-scheme: dark)');
    colorSchemeMQ.addEventListener('change', updateThemeMode);

    setSystemTheme(colorSchemeMQ ? 'dark' : 'light');

    return window
      .matchMedia('(prefers-color-scheme: dark)')
      .removeEventListener('change', updateThemeMode);
  }, []);

  // Set "html" element class
  useEffect(() => {
    storage.setItem(STORAGE_UI_THEME_KEY, mode);

    if (!documentRef.current) return;

    if (isDark) {
      documentRef.current.classList.add('dark');
    } else {
      documentRef.current.classList.remove('dark');
    }
  }, [mode, isDark]);

  const getModes = (): ThemeMode[] => ['light', 'dark', 'system'];

  const value = useMemo(
    () => ({
      mode,
      isDark,
      theme: {
        colors: themeColors,
      },
      getModes,
      setThemeMode: (themeMode: ThemeMode) => setMode(themeMode),
      reset: () => setMode('light'),
    }),
    [mode, isDark],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

ThemeProvider.defaultProps = {
  theme: undefined,
};

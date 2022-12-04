import React from 'react';
import { describe, expect, it } from 'vitest';
import { render, renderHook, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

// Utils
import { createThemeWrapper, wrapWithTheme } from '../../testHelpers';
import { storage } from '../../utils/storage';
import { STORAGE_UI_THEME_KEY } from '../../providers/ThemeProvider';
// Hooks
import { useTheme } from '../../hooks';
// Components
import { ThemeSettings } from './ThemeSettings';

describe('AppSettings', () => {
  beforeEach(() => {
    // reset storage
    storage.removeItem(STORAGE_UI_THEME_KEY);
  });

  it('sould display theme mode options #smoke', () => {
    // Arrange
    const { result } = renderHook(() => useTheme(), {
      wrapper: createThemeWrapper(),
    });
    const themeModes = result.current.getModes();

    // Act
    render(wrapWithTheme(<ThemeSettings id="theme-settings" />));
    const inputs = screen.getAllByRole<HTMLInputElement>('radio');
    const inputValues = inputs.map((i) => i.value);

    // Assert
    expect(inputValues).to.have.members(themeModes);
  });

  describe('on mode change', () => {
    it('should change app appearance', async () => {
      // Arrange
      const user = userEvent.setup();
      render(wrapWithTheme(<ThemeSettings id="theme-settings" />));
      const darkModeButton = screen.getByRole<HTMLButtonElement>('radio', {
        name: /dark/i,
      });
      // Check if theme is not set to dark
      expect(document.documentElement).not.toHaveClass('dark');
      expect(darkModeButton.dataset.state).toBe('unchecked');

      // Act
      await user.click(darkModeButton);

      // Assert
      await waitFor(() => expect(document.documentElement).toHaveClass('dark'));
      expect(darkModeButton.dataset.state).toBe('checked');
    });
  });

  describe('on page reload', () => {
    it('should keep changes', async () => {
      // Arrange
      const { rerender } = render(wrapWithTheme(<ThemeSettings id="theme-settings" />));
      const darkModeButton = screen.getByRole<HTMLButtonElement>('radio', {
        name: /dark/i,
      });
      // Check if theme is not set to dark
      expect(document.documentElement).not.toHaveClass('dark');
      expect(darkModeButton.dataset.state).toBe('unchecked');

      // Act
      const user = userEvent.setup();
      await user.click(darkModeButton);

      // Assert
      await waitFor(() => expect(document.documentElement).toHaveClass('dark'));
      expect(darkModeButton.dataset.state).toBe('checked');

      // Arrange ("reload page")
      rerender(wrapWithTheme(<ThemeSettings id="theme-settings" />));

      // Assert
      expect(document.documentElement).toHaveClass('dark');
    });
  });
});

export {};

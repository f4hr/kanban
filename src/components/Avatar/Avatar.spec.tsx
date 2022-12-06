import React from 'react';
import { render, screen, fireEvent, renderHook } from '@testing-library/react';

// Utils
import { createThemeWrapper, wrapWithTheme } from '../../testHelpers';
// Hooks
import { useTheme } from '../../hooks';
// Components
import { Avatar } from './Avatar';
// Types
import type { Theme } from '../../contexts/ThemeContext';
import type { ColorShade } from '../../utils/theme';

describe('Avatar', () => {
  describe('when image is not set', () => {
    it('should display placeholder', () => {
      // Arrange
      render(wrapWithTheme(<Avatar />));

      // Assert
      expect(screen.getByRole('presentation')).toBeInTheDocument();
    });
  });

  describe('when image is set', () => {
    describe('on mount', () => {
      it('should display placeholder', () => {
        // Arrange
        render(wrapWithTheme(<Avatar src="#" />));
        const image = screen.getByRole<HTMLImageElement>('img');

        // Assert
        expect(image).toBeInTheDocument();
        expect(screen.queryByRole('presentation')).not.toBeInTheDocument();
      });
    });

    describe('on error', () => {
      it('should display placeholder', () => {
        // Arrange
        render(wrapWithTheme(<Avatar src="#" />));
        const image = screen.getByRole<HTMLImageElement>('img');
        expect(image).toBeInTheDocument();

        // Act
        fireEvent.error(image);

        // Assert
        expect(image).not.toBeInTheDocument();
        expect(screen.queryByRole('presentation')).toBeInTheDocument();
      });
    });

    describe('on success', () => {
      it('should display image', () => {
        // Arrange
        render(wrapWithTheme(<Avatar src="#" />));
        const image = screen.getByRole<HTMLImageElement>('img');
        expect(image).toBeInTheDocument();

        // Act
        fireEvent.load(image);

        // Assert
        expect(screen.queryByRole('presentation')).not.toBeInTheDocument();
      });
    });
  });

  const themeModeColors: {
    theme: Theme['mode'];
    bgColorShade: ColorShade;
    textColorShade: ColorShade;
  }[] = [
    { theme: 'light', bgColorShade: '100', textColorShade: '600' },
    { theme: 'dark', bgColorShade: '900', textColorShade: '300' },
  ];

  describe.each(themeModeColors)(
    'when $theme mode is enabled',
    ({ theme, bgColorShade, textColorShade }) => {
      it(`should apply ${theme} styles`, () => {
        // Arrange
        const color = 'main';
        const { result } = renderHook(() => useTheme(), {
          wrapper: createThemeWrapper(),
        });
        const { colors } = result.current.theme;
        render(wrapWithTheme(<Avatar color={color} />, { theme }));

        // Assert
        expect(screen.getByRole('presentation')).toHaveStyle(
          `background-color: ${colors[color][bgColorShade]}; color: ${colors[color][textColorShade]}`,
        );
      });
    },
  );
});

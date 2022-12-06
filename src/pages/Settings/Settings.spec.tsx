import React from 'react';
import { screen } from '@testing-library/react';

// Utils
import routes from '../../routes';
import { renderWithProviders, wrapWithRouter } from '../../testHelpers';
// Components
import { Settings } from './Settings';

describe('Settings Page', () => {
  it('Should display page title', () => {
    // Arrange
    renderWithProviders(wrapWithRouter(<Settings />, { route: routes.loginPath() }));

    // Assert
    expect(
      screen.getByRole<HTMLHeadingElement>('heading', { name: /settings/i, level: 1 }),
    ).toBeInTheDocument();
  });
});

export {};

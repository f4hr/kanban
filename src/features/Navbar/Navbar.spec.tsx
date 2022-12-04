import React from 'react';
import { screen } from '@testing-library/react';

// Utils
import { renderWithQueryClient, wrapWithTheme } from '../../testHelpers';
// Components
import { Navbar } from './Navbar';

describe('Navbar', () => {
  it('should display app title #smoke', () => {
    // Arrange
    renderWithQueryClient(wrapWithTheme(<Navbar />));

    // Assert
    expect(screen.getByText(/kanban/i)).toBeInTheDocument();
  });
});

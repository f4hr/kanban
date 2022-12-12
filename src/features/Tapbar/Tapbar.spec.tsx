import React from 'react';
import { render, screen } from '@testing-library/react';

// Components
import { Tapbar } from './Tapbar';

describe('Tapbar', () => {
  it('should display nav links #smoke', () => {
    // Arrange
    render(<Tapbar />);

    // Assert
    expect(screen.getByText(/dashboard/i)).toBeInTheDocument();
    expect(screen.getByText(/boards/i)).toBeInTheDocument();
    expect(screen.getByText(/settings/i)).toBeInTheDocument();
  });
});

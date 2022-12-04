import React from 'react';
import { render, screen } from '@testing-library/react';

import { BaseInput } from './BaseInput';

describe('BaseInput', () => {
  it('should render #smoke', () => {
    // Arrange
    render(<BaseInput />);

    // Assert
    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  });

  describe('when label is set', () => {
    it('should display label', () => {
      // Arrange
      render(<BaseInput label="Input label" />);

      // Assert
      expect(screen.getByText(/input label/i)).toBeInTheDocument();
    });
  });

  describe('when icon is set', () => {
    it('should display icon', () => {
      // Arrange
      render(<BaseInput icon={<span>icon</span>} />);

      // Assert
      expect(screen.getByRole('presentation')).toBeInTheDocument();
    });
  });

  describe('when error is set', () => {
    it('should display error', () => {
      // Arrange
      const errorMessage = 'Error message';
      render(<BaseInput error={errorMessage} />);
      const error = screen.queryByRole('alert');

      // Assert
      expect(error).toBeInTheDocument();
      expect(error?.textContent).toBe(errorMessage);
    });
  });
});

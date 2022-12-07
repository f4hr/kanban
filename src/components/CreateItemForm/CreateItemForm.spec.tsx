import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

// Utils
import { wrapWithTheme, wrapWithToast } from '../../testHelpers';
// Components
import { CreateItemForm } from './CreateItemForm';

describe('CreateItemForm', () => {
  describe('on mount', () => {
    it('should display text input', () => {
      // Arrange
      render(<CreateItemForm onCreateItem={vi.fn()} />);
      const submitButton = screen.getByRole<HTMLButtonElement>('button', { name: /submit/i });

      // Assert
      expect(submitButton.type).toBe('submit');
      expect(submitButton).toBeDisabled();
      expect(screen.getByRole('textbox')).toBeInTheDocument();
    });
  });

  describe('on error', () => {
    it('should display error message', async () => {
      // Arrange
      const user = userEvent.setup();
      const errorMessage = 'submit error';
      const handleSubmit = vi.fn(() => Promise.reject(new Error(errorMessage)));

      render(
        wrapWithTheme(
          wrapWithToast(<CreateItemForm onCreateItem={handleSubmit} placeholder="placeholder" />),
        ),
      );
      const submitButton = screen.getByRole<HTMLButtonElement>('button', { name: /submit/i });
      const input = screen.getByPlaceholderText<HTMLInputElement>(/placeholder/i);

      // Act
      await user.type(input, 'board name');
      await user.click(submitButton);

      // Assert
      await expect(handleSubmit).rejects.toThrow(errorMessage);
      expect(await screen.findByText(errorMessage)).toBeInTheDocument();
    });
  });
});

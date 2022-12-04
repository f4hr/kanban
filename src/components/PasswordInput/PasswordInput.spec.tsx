import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

// Components
import { PasswordInput } from './PasswordInput';

describe('PasswordInput', () => {
  describe('on mount', () => {
    it('should be masked #smoke', () => {
      // Arrange
      render(<PasswordInput placeholder="your password" />);

      // Assert
      expect(screen.getByPlaceholderText<HTMLInputElement>(/your password/i).type).toBe('password');
    });
  });

  describe('on "unmask" button click', () => {
    it('should display password', async () => {
      // Arrange
      const user = userEvent.setup();
      render(<PasswordInput placeholder="your password" />);

      // Act
      await user.click(screen.getByRole<HTMLButtonElement>('button', { name: /show password/i }));

      // Assert
      expect(screen.getByPlaceholderText<HTMLInputElement>(/your password/i).type).toBe('text');
    });
  });
});

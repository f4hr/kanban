import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

// Utils
import { renderWithProviders } from '../../testHelpers';
// Components
import { AppSettings } from './AppSettings';

describe('AppSettings', () => {
  beforeEach(() => {
    renderWithProviders(<AppSettings />);
  });

  it('Sould display "Save" button', () => {
    // Assert
    expect(screen.getByRole('button', { name: /save/i })).toBeInTheDocument();
  });

  describe('On submit', () => {
    it('Should disable submit button', async () => {
      // Arrange
      const user = userEvent.setup();

      // Act
      const submitButton = screen.getByRole('button', { name: /save/i });
      await user.click(submitButton);

      // Assert
      await waitFor(() => expect(submitButton).toBeDisabled());
    });
  });
});

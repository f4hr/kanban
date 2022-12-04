import React from 'react';
import { screen } from '@testing-library/react';

// Utils
import { renderWithQueryClient, wrapWithTheme } from '../../testHelpers';
import { usersMock } from '../../mocks';
// Components
import { UserButton } from './UserButton';

const userId = usersMock[0].id;

describe('UserButton', () => {
  describe('on mount', () => {
    it('should display placeholder #smoke', () => {
      // Arrange
      renderWithQueryClient(wrapWithTheme(<UserButton userId={userId} />));

      // Assert
      expect(screen.getByTitle(/loading user data/i)).toBeInTheDocument();
    });
  });

  describe('on error', () => {
    it.todo('should display error message');
  });

  describe('on success', () => {
    it.todo('should display user data');
  });
});

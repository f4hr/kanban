import React from 'react';
import { screen } from '@testing-library/react';

// Utils
import { renderWithProviders } from '../../testHelpers';
import { storageKeys } from '../../mocks';
import { storage } from '../../utils/storage';
// Components
import { UserButton } from './UserButton';
// Types
import { User } from '../../types';

const [user]: User[] = storage.getItem(storageKeys.USERS()) || [];

describe('UserButton', () => {
  describe('on mount', () => {
    it('should display placeholder #smoke', () => {
      // Arrange
      renderWithProviders(<UserButton userId={user.id} />);

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

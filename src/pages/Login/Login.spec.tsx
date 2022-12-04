import React from 'react';
import { screen } from '@testing-library/react';

// Utils
import routes from '../../routes';
import { wrapWithRouter, renderWithQueryClient } from '../../testHelpers';
// Components
import { Login } from './Login';

describe('Signup page', () => {
  describe('On mount', () => {
    it('Should render page title #smoke', () => {
      // Arrange
      renderWithQueryClient(wrapWithRouter(<Login />, { route: routes.loginPath() }));

      // Assert
      expect(screen.getByRole('heading', { name: /log in/i })).toBeInTheDocument();
    });
  });

  describe('On signup button click', () => {
    it.todo('Should redirect to signup page');
  });

  describe('On submit', () => {
    describe('When form is valid', () => {
      it.todo('Should send request');
    });
  });
});

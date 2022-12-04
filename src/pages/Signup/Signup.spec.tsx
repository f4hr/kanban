import React from 'react';
import { screen } from '@testing-library/react';

// Utils
import routes from '../../routes';
import { wrapWithRouter, renderWithQueryClient } from '../../testHelpers';
// Components
import { Signup } from './Signup';

describe('Signup page', () => {
  describe('On mount', () => {
    it('Should render page title #smoke', () => {
      // Arrange
      renderWithQueryClient(wrapWithRouter(<Signup />, { route: routes.signupPath() }));

      // Assert
      expect(screen.getByRole('heading', { name: /sign up/i })).toBeInTheDocument();
    });
  });

  describe('On login button click', () => {
    it.todo('Should redirect to login page');
  });

  describe('On submit', () => {
    describe('When form is valid', () => {
      it.todo('Should send request');
    });
  });
});

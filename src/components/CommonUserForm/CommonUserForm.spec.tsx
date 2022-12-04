import React from 'react';
import { render, screen } from '@testing-library/react';

// Components
import { CommonUserForm } from './CommonUserForm';

describe('Collapsible', () => {
  describe('on mount', () => {
    it('should display content #smoke', () => {
      // Arrange
      render(
        <CommonUserForm>
          <CommonUserForm.Header>Header</CommonUserForm.Header>
          <CommonUserForm.Form handleSubmit={vi.fn()}>
            Form
            <CommonUserForm.Item>Item</CommonUserForm.Item>
          </CommonUserForm.Form>
          <CommonUserForm.Footer>Footer</CommonUserForm.Footer>
        </CommonUserForm>,
      );

      // Assert
      expect(screen.getByText(/header/i)).toBeInTheDocument();
      expect(screen.getByText(/form/i)).toBeInTheDocument();
      expect(screen.getByText(/item/i)).toBeInTheDocument();
      expect(screen.getByText(/footer/i)).toBeInTheDocument();
    });
  });
});

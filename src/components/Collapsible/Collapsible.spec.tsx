import React from 'react';
import { render, screen } from '@testing-library/react';

// Components
import { Collapsible } from './Collapsible';

describe('Collapsible', () => {
  describe('on mount', () => {
    it('should display content #smoke', () => {
      // Arrange
      render(<Collapsible open>Content</Collapsible>);

      // Assert
      expect(screen.getByText(/content/i)).toBeInTheDocument();
    });
  });

  describe('when "open" attribute is not set', () => {
    it('should not display content', () => {
      // Arrange
      render(<Collapsible>Content</Collapsible>);

      // Assert
      expect(screen.queryByText(/content/i)).not.toBeInTheDocument();
    });
  });
});

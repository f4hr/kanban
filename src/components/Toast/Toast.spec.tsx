import React from 'react';
import { render, screen } from '@testing-library/react';

// Helpers
import { wrapWithToast } from '../../testHelpers';
// Components
import { Toast } from './Toast';

describe('Toast', () => {
  describe('on mount', () => {
    it('should display title #smoke', () => {
      // Arrange
      const title = 'Foobar';
      const description = 'Lorem ipsum';
      render(
        wrapWithToast(<Toast title={title} description={description} open setOpen={vi.fn()} />),
      );

      // Assert
      expect(screen.getByText(title)).toBeInTheDocument();
      expect(screen.getByText(description)).toBeInTheDocument();
    });

    it.todo('should have corresponding styles for each "type"');
  });
});

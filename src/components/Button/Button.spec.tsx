import React from 'react';
import { render, screen } from '@testing-library/react';

import { Button } from './Button';

describe('BaseInput', () => {
  it('should render #smoke', () => {
    // Arrange
    render(<Button />);
    const button = screen.getByRole<HTMLButtonElement>('button');

    // Assert
    expect(button).toBeInTheDocument();
    expect(button.type).toBe('button');
    expect(button).toHaveClass('btn', 'btn--main', 'btn--md');
  });

  describe('when icon is set', () => {
    it('should display icon', () => {
      // Arrange
      render(<Button icon={<span>icon</span>} />);

      // Assert
      expect(screen.getByText(/icon/i)).toBeInTheDocument();
    });
  });

  describe('when "as" attribute is set to "a"', () => {
    it('should display as anchor element', () => {
      // Arrange
      render(<Button as="a" href="#" />);

      // Assert
      expect(screen.getByRole<HTMLAnchorElement>('link')).toBeInTheDocument();
    });
  });

  describe('when "fullWidth" attritube is set', () => {
    it('should have full width', () => {
      // Arrange
      render(<Button fullWidth />);
      const button = screen.getByRole<HTMLButtonElement>('button');

      // Assert
      expect(button).toHaveClass('w-full');
    });
  });

  describe.each([
    { pos: 'left', expectedIndex: 0 },
    { pos: 'right', expectedIndex: 1 },
  ])('when "iconPos" attritube is set to "$pos"', ({ pos, expectedIndex }) => {
    it(`should display icon to the ${pos} of the children`, () => {
      // Arrange
      render(
        <Button icon={<span>icon</span>} iconPos={pos}>
          <span>button text</span>
        </Button>,
      );
      const button = screen.getByRole<HTMLButtonElement>('button');

      // Assert
      expect(button).toHaveClass(`btn--icon-pos-${pos}`);
      expect(button.children[expectedIndex]).toHaveTextContent('icon');
    });
  });
});

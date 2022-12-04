import React from 'react';
import { render, screen } from '@testing-library/react';

// Components
import { Placeholder } from './Placeholder';

describe('Placeholder', () => {
  it('should render #smoke', () => {
    // Arrange
    render(<Placeholder>lorem ipsum</Placeholder>);

    // Assert
    expect(screen.getByText(/lorem ipsum/i)).toBeInTheDocument();
  });
});

import React from 'react';
import { render, screen } from '@testing-library/react';

// Components
import { RadioGroup } from './RadioGroup';

describe('RadioGroup', () => {
  it('should render #smoke', () => {
    // Arrange
    render(<RadioGroup>lorem ipsum</RadioGroup>);

    // Assert
    expect(screen.getByText(/lorem ipsum/i)).toBeInTheDocument();
  });

  it('should render RadioGroupItem #smoke', () => {
    // Arrange
    render(
      <RadioGroup>
        <RadioGroup.Item value="test">lorem ipsum</RadioGroup.Item>
      </RadioGroup>,
    );

    // Assert
    expect(screen.getByText(/lorem ipsum/i)).toBeInTheDocument();
  });
});

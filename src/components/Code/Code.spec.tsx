import React from 'react';
import { render, screen } from '@testing-library/react';

import { Code } from './Code';

describe('Code', () => {
  it('should render #smoke', () => {
    // Arrange
    const text = 'code';
    render(<Code>{text}</Code>);

    // Assert
    expect(screen.getByRole('code')).toHaveTextContent(text);
  });
});

import React from 'react';
import { render, screen } from '@testing-library/react';

import { Alert, COLOR_CLASSES } from './Alert';
// Types
import type { AlertType } from './Alert';

const ALERT_TYPES: AlertType[] = ['info', 'danger', 'success'];

describe('Alert', () => {
  describe('On mount', () => {
    it('Should display title and message', () => {
      // Arrange
      render(<Alert title="Info">Lorem</Alert>);

      // Assert
      expect(screen.getByText(/info/i)).toBeInTheDocument();
      expect(screen.getByText(/lorem/i)).toBeInTheDocument();
    });
  });

  describe('When type is not set', () => {
    it('Should have "info" type', () => {
      // Arrange
      const result = render(<Alert title="Info">Lorem</Alert>);
      const [container] = result.container.children;

      // Assert
      expect(container).toHaveClass(COLOR_CLASSES.info.bg);
      expect(screen.getByText(/info/i)).toHaveClass(COLOR_CLASSES.info.text);
    });
  });

  describe.each(
    ALERT_TYPES.map((alertType) => ({
      alertType,
      expected: COLOR_CLASSES[alertType],
    })),
  )('When type is "$alertType"', ({ alertType, expected }) => {
    it(`Should have "${alertType}" background color`, () => {
      // Arrange
      const result = render(
        <Alert title="Info" type={alertType}>
          Lorem
        </Alert>,
      );
      const [container] = result.container.children;

      // Assert
      expect(container).toHaveClass(expected.bg);
      expect(screen.getByText(/info/i)).toHaveClass(expected.text);
    });
  });

  describe('When icon is not set', () => {
    it('Should not display icon wrapper', () => {
      // Arrange
      render(<Alert title="Info">Lorem</Alert>);

      // Assert
      expect(screen.queryByRole('presentation')).not.toBeInTheDocument();
    });
  });

  describe('When icon is set', () => {
    it('Should display icon', () => {
      // Arrange
      render(
        <Alert title="Info" icon={<svg />}>
          Lorem
        </Alert>,
      );

      // Assert
      expect(screen.queryByRole('presentation')).toBeInTheDocument();
    });
  });
});

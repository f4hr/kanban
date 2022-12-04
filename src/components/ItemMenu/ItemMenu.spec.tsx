import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

// Components
import { Button } from '../Button';
import { ItemMenu } from './ItemMenu';

function Menu() {
  return (
    <ItemMenu
      trigger={
        <ItemMenu.Trigger asChild>
          <button type="button">Menu</button>
        </ItemMenu.Trigger>
      }
    >
      <ItemMenu.Item>
        <Button onClick={() => {}} variant="menu-item" fullWidth>
          Action
        </Button>
      </ItemMenu.Item>
    </ItemMenu>
  );
}

describe('ItemMenu', () => {
  describe('on mount', () => {
    it('should display trigger #smoke', () => {
      // Arrange
      render(<Menu />);

      // Assert
      expect(screen.getByRole('button', { name: /menu/i })).toBeInTheDocument();
    });
  });

  describe('on trigger click', () => {
    it('should display menu', async () => {
      // Arrange
      const user = userEvent.setup();
      render(<Menu />);

      // Act
      await user.click(screen.getByRole('button', { name: /menu/i }));
      const actionButton = await screen.findByRole('button', { name: /action/i });

      // Assert
      expect(screen.getByRole('menu')).toBeInTheDocument();
      expect(actionButton).toBeInTheDocument();
    });
  });
});

import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

// Utils
import routes from '../../routes';
import { generateApiError } from '../../mocks/utils';
import { server, rest } from '../../mocks/server';
import { renderWithQueryClient, wrapWithToast } from '../../testHelpers';
import { cardsMock } from '../../mocks';
// Components
import { Card } from './Card';
// Types
import type { Card as CardType } from '../../types';

let card: CardType;

const renderCard = () => {
  [card] = cardsMock;
  renderWithQueryClient(wrapWithToast(<Card card={card} dragHandle={<span>drag handle</span>} />));
};

describe('Card', () => {
  describe('on mount', () => {
    it('should display card title #smoke', () => {
      // Arrange
      renderCard();

      // Assert
      expect(screen.getByPlaceholderText<HTMLInputElement>(/card name/i).value).toBe(card.name);
      expect(screen.getByRole('button', { name: /card settings/i })).toBeInTheDocument();
    });
  });

  describe('on delete', () => {
    describe('on error', () => {
      it('should display error message', async () => {
        // Arrange
        const errorMessage = 'failed to delete';
        server.use(
          rest.delete(routes.apiCardsPath(':id'), (_req, res, ctx) =>
            res.once(ctx.status(400), ctx.json(generateApiError(400, errorMessage))),
          ),
        );
        const user = userEvent.setup();
        renderCard();

        // Act
        await user.click(screen.getByRole('button', { name: /card settings/i }));
        await user.click(screen.getByRole('button', { name: /delete/i }));

        // Assert
        expect(screen.getByText(errorMessage)).toBeInTheDocument();
      });
    });

    describe('on success', () => {
      it.todo('should update board state');
    });
  });
});

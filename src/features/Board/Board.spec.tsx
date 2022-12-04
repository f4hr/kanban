import React from 'react';
import { describe, expect, it } from 'vitest';
import { screen } from '@testing-library/react';

// Utils
import routes from '../../routes';
import { server, rest } from '../../mocks/server';
import { boardsMock, listsMock } from '../../mocks';
import { generateApiError } from '../../mocks/utils';
import { renderWithQueryClient, wrapWithTheme, wrapWithToast } from '../../testHelpers';
// Components
import { Board } from './Board';

let boardId: string;

const renderBoard = () => {
  renderWithQueryClient(wrapWithTheme(wrapWithToast(<Board boardId={boardId} />)));
};

describe('BoardContainer', () => {
  beforeAll(() => {
    boardId = boardsMock[0].id;
  });

  describe('On error', () => {
    it('Sould display error message', async () => {
      // Arrange
      server.use(
        rest.get(routes.apiBoardsPath(':id'), async (req, res, ctx) =>
          res.once(ctx.status(400), ctx.json(generateApiError(400))),
        ),
      );
      renderBoard();

      // Assert
      expect(await screen.findByText(/fail/i)).toBeInTheDocument();
    });
  });

  describe('On loading', () => {
    it('Should indicate loading state', async () => {
      // Arrange
      renderBoard();

      // Assert
      expect(await screen.findByRole('heading', { name: /loading board/i })).toBeInTheDocument();
    });
  });

  describe('On success', () => {
    it('Should display board name', async () => {
      // Arrange
      renderBoard();
      const listNames = listsMock.map((l) => l.name);
      const inputs = await screen.findAllByRole<HTMLInputElement>('textbox', {
        name: /list name/i,
      });
      const inputValues = inputs.map((i) => i.value);

      // Assert
      expect(inputValues).to.have.members(listNames);
    });
  });
});

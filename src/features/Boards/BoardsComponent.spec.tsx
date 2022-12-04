import React from 'react';
import { screen } from '@testing-library/react';

// Utils
import routes from '../../routes';
import {
  renderWithQueryClient,
  wrapWithRouter,
  wrapWithTheme,
  wrapWithToast,
} from '../../testHelpers';
import { server, rest } from '../../mocks/server';
import { usersMock, boardsMock } from '../../mocks';
import { generateApiError } from '../../mocks/utils';
import { storage } from '../../utils/storage';
// Components
import { BoardsComponent } from './BoardsComponent';

const userId = usersMock[0].id;

const renderBoards = () => {
  renderWithQueryClient(
    wrapWithTheme(
      wrapWithToast(wrapWithRouter(<BoardsComponent />, { route: routes.boardsPath() })),
    ),
  );
};

describe('Boards', () => {
  beforeEach(() => {
    storage.setUser({ userId, token: userId });
  });
  afterEach(() => {
    storage.removeUser();
  });

  describe('On mount', () => {
    it('Should indicate loading state', async () => {
      // Arrange
      renderBoards();

      // Assert
      expect(await screen.findByText(/loading boards/i)).toBeInTheDocument();
      expect(await screen.findByRole('button', { name: /create board/i })).toBeInTheDocument();
    });
  });

  describe('On error', () => {
    it('Should display error message', async () => {
      // Arrange
      server.use(
        rest.get(routes.apiBoardsPath(), async (_req, res, ctx) =>
          res.once(ctx.status(400), ctx.json(generateApiError(400))),
        ),
      );
      renderBoards();

      // Assert
      expect(await screen.findByText(/fail/i)).toBeInTheDocument();
      expect(screen.queryByRole('button', { name: /create board/i })).not.toBeInTheDocument();
    });
  });

  describe('On success', () => {
    it('Should display board names', async () => {
      // Arrange
      renderBoards();
      const boardNames = boardsMock.map((b) => b.name);
      const boardLinks = await screen.findAllByRole<HTMLAnchorElement>('link');
      const boardLinksText = boardLinks.map((i) => i.textContent);

      // Assert
      expect(boardLinksText).toIncludeSameMembers(boardNames);
    });
  });
});

import React from 'react';
import { screen } from '@testing-library/react';

// Utils
import routes from '../../routes';
import { renderWithProviders, wrapWithRouter } from '../../testHelpers';
import { server, rest } from '../../mocks/server';
import { generateApiError } from '../../mocks/utils';
import { resetStorage, storageKeys } from '../../mocks';
import { storage } from '../../utils/storage';
// Components
import { BoardsComponent } from './BoardsComponent';
// Types
import { User, Board } from '../../types';

const renderBoards = () => {
  renderWithProviders(wrapWithRouter(<BoardsComponent />, { route: routes.boardsPath() }));
};

let usersMock: User[];
let boardsMock: Board[];

beforeAll(() => {
  usersMock = storage.getItem(storageKeys.USERS()) || [];
  boardsMock = storage.getItem(storageKeys.BOARDS()) || [];
});
afterAll(() => {
  resetStorage();
});

describe('Boards', () => {
  beforeEach(() => {
    const userId = usersMock[0].id;
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

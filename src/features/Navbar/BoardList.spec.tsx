import React from 'react';
import { screen } from '@testing-library/react';

// Utils
import routes from '../../routes';
import { generateApiError } from '../../mocks/utils';
import { server, rest } from '../../mocks/server';
import { resetStorage, storageKeys } from '../../mocks';
import { storage } from '../../utils/storage';
import { renderWithProviders, wrapWithRouter } from '../../testHelpers';
// Components
import { BoardList } from './BoardList';
// Types
import { User, Board } from '../../types';

const renderBoardList = () => {
  renderWithProviders(wrapWithRouter(<BoardList />, { route: routes.homePath() }));
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

describe('BoardList', () => {
  beforeEach(() => {
    const userId = usersMock[0].id;
    storage.setUser({ userId, token: userId });
  });
  afterEach(() => {
    storage.removeUser();
  });

  describe('on success', () => {
    it('should render children elements', () => {
      // Arrange
      renderBoardList();

      // Assert
      expect(screen.getByText(/boards/i)).toBeInTheDocument();
    });
  });

  describe('on error', () => {
    it('should not render children elements', async () => {
      // Arrange
      const boardNames = boardsMock[0].name;
      const errorMessage = 'failed to load boards';
      server.use(
        rest.get(routes.apiBoardsPath(), (_req, res, ctx) =>
          res.once(ctx.status(400), ctx.json(generateApiError(400, errorMessage))),
        ),
      );
      renderBoardList();

      // Assert
      expect(screen.queryByText(boardNames)).not.toBeInTheDocument();
      expect(await screen.findByText(/failed to load boards/i)).toBeInTheDocument();
    });
  });
});

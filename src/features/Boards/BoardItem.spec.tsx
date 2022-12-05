import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

// Utils
import routes from '../../routes';
import { generateApiError } from '../../mocks/utils';
import { server, rest } from '../../mocks/server';
import { resetStorage, storageKeys } from '../../mocks';
import { storage } from '../../utils/storage';
import { renderWithQueryClient, wrapWithRouter, wrapWithToast } from '../../testHelpers';
// Components
import { BoardItem } from './BoardItem';
// Types
import type { Board } from '../../types';
import type { BoardItemProps } from './BoardItem';

let boardsMock: Board[];

beforeAll(() => {
  boardsMock = storage.getItem(storageKeys.BOARDS()) || [];
});
afterAll(() => {
  resetStorage();
});

const renderBoardItem = () => {
  const [boardMock] = boardsMock;
  const board: BoardItemProps = {
    boardId: boardMock.id,
    title: 'Foo board',
    link: '#',
  };

  renderWithQueryClient(
    wrapWithToast(
      wrapWithRouter(<BoardItem boardId={board.boardId} title={board.title} link={board.link} />, {
        route: routes.boardsPath(),
      }),
    ),
  );
};

describe('BoardItem', () => {
  describe('on mount', () => {
    it('should display board name', () => {
      // Arrange
      renderBoardItem();

      // Assert
      expect(screen.getByText(/foo board/i)).toBeInTheDocument();
    });
  });

  describe('on delete', () => {
    describe('on submit', () => {
      it.todo('should disable buttons');
    });

    describe('on failure', () => {
      it('should display error message', async () => {
        // Arrange
        const user = userEvent.setup();
        const errorMessage = 'Failed to delete board';
        server.use(
          rest.delete(routes.apiBoardsPath(':id'), (_req, res, ctx) =>
            res.once(ctx.status(400), ctx.json(generateApiError(400, errorMessage))),
          ),
        );
        renderBoardItem();

        // Act
        await user.click(screen.getByRole('button', { name: /board settings/i }));
        await user.click(screen.getByRole('button', { name: /delete/i }));

        // Assert
        expect(screen.getByText(errorMessage)).toBeInTheDocument();
      });
    });

    describe('on success', () => {
      it.todo('should not display anything');
    });
  });
});

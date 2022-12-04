import React from 'react';
import { screen } from '@testing-library/react';

// Utils
import routes from '../../routes';
import { generateApiError } from '../../mocks/utils';
import { server, rest } from '../../mocks/server';
import { boardsMock } from '../../mocks';
import { renderWithQueryClient, wrapWithRouter, wrapWithTheme } from '../../testHelpers';
// Components
import { BoardList } from './BoardList';

const renderBoardList = () => {
  renderWithQueryClient(wrapWithTheme(wrapWithRouter(<BoardList />, { route: routes.homePath() })));
};

describe('Boards', () => {
  describe('on success', () => {
    it('should render children elements', () => {
      // Arrange
      renderBoardList();

      // Assert
      expect(screen.getByText(/boards/i)).toBeInTheDocument();
    });
  });

  describe('on error', () => {
    it('should not render children elements', () => {
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
    });
  });
});

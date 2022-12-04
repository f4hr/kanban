import React from 'react';
import { screen } from '@testing-library/react';

// Utils
import { boardDetailsMock } from '../../mocks';
import { renderWithQueryClient } from '../../testHelpers';
// Components
import { BoardComponent } from './BoardComponent';
// Types
import type { BoardDetails } from '../../types';

let board: BoardDetails;

describe('Board', () => {
  beforeEach(() => {
    [board] = boardDetailsMock;
  });

  describe('on mount', () => {
    it('should display "Create list" form #smoke', () => {
      // Arrange
      const { boardId } = board;

      // Act
      renderWithQueryClient(
        <BoardComponent boardId={boardId} listIds={[]} lists={{}} cards={{}} />,
      );

      // Assert
      expect(
        screen.getByRole<HTMLButtonElement>('button', { name: /create list/i }),
      ).toBeInTheDocument();
    });
  });

  describe('when board has lists', () => {
    it('sould display lists', async () => {
      // Arrange
      const { boardId, listIds, lists, cards } = board;
      const listNames: string[] = lists ? Object.keys(lists).map((k) => lists[k].name) : [];

      // Act
      renderWithQueryClient(
        <BoardComponent boardId={boardId} listIds={listIds} lists={lists} cards={cards} />,
      );
      const listNameInputs = await screen.findAllByRole<HTMLInputElement>('textbox', {
        name: /list name/i,
      });
      const inputValues: string[] = listNameInputs.map((l) => l.value);

      // Assert
      expect(inputValues).toIncludeSameMembers(listNames);
    });
  });
});

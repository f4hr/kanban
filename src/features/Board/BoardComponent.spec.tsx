import React from 'react';
import { screen } from '@testing-library/react';

// Utils
import { resetStorage, storageKeys } from '../../mocks';
import { storage } from '../../utils/storage';
import { renderWithQueryClient } from '../../testHelpers';
// Components
import { BoardComponent } from './BoardComponent';
// Types
import type { BoardDetails } from '../../types';

let board: BoardDetails;

beforeAll(() => {
  const boardDetailsMock: BoardDetails[] = storage.getItem(storageKeys.BOARD_DETAILS()) || [];
  [board] = boardDetailsMock;
});
afterAll(() => {
  resetStorage();
});

describe('Board', () => {
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

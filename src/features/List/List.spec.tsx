import React from 'react';
import { render, screen } from '@testing-library/react';

// Helpers
import { getListCards, storageKeys, resetStorage } from '../../mocks';
import { storage } from '../../utils/storage';
import { wrapWithDnd, wrapWithQueryClient } from '../../testHelpers';
// Components
import { List } from './List';
// Types
import type { List as ListType, Card } from '../../types';

let list: ListType;
let cards: Card[];

beforeAll(() => {
  const listsMock: ListType[] = storage.getItem(storageKeys.LISTS()) || [];
  [list] = listsMock;
  cards = getListCards(listsMock[0].id);
});
afterAll(() => {
  resetStorage();
});

describe('List', () => {
  describe('on mount', () => {
    beforeEach(() => {
      render(
        wrapWithQueryClient(
          wrapWithDnd(
            <List
              list={list}
              cards={cards}
              isDragging={false}
              dragHandle={<span>drag handle</span>}
            />,
            vi.fn(),
          ),
        ),
      );
    });

    it('should render correctly #smoke', () => {
      // Arrange
      const cardNames = cards.map((c) => c.name);
      const cardNameInputs = screen.getAllByRole<HTMLInputElement>('textbox', {
        name: /card name/i,
      });
      const cardNameInputValues = cardNameInputs.map((i) => i.value);

      // Assert
      expect(screen.getByPlaceholderText<HTMLInputElement>(/list name/i).value).toBe(list.name);
      expect(screen.getByRole('button', { name: /create card/i })).toBeInTheDocument();
      expect(cardNameInputValues).toIncludeSameMembers(cardNames);
    });
  });

  describe('on list delete', () => {
    describe('on error', () => {
      it.todo('should display error');
    });

    describe('when loading', () => {
      it.todo('should disable "Delete" button');
    });

    describe('on success', () => {
      it.todo('should update card list');
    });
  });
});

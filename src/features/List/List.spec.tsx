import React from 'react';
import { render, screen } from '@testing-library/react';

// Helpers
import { listsMock, getListCards } from '../../mocks';
// Components
import { List } from './List';
// Types
import type { List as ListType, Card } from '../../types';
import { wrapWithDnd, wrapWithQueryClient } from '../../testHelpers';

let list: ListType;
let cards: Card[];

describe('List', () => {
  beforeAll(() => {
    [list] = listsMock;
    cards = getListCards(listsMock[0].id);
  });

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

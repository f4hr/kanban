import { rest } from 'msw';
import { v4 as uuid } from 'uuid';

import type { DefaultBodyType, PathParams } from 'msw';

// Utils
import routes from '../../routes';
import { ms, isStringEmpty, generateApiError } from '../utils';
import { storage } from '../../utils/storage';
import { storageKeys } from '../index';
// Types
import type { List, Card, ApiError } from '../../types';

type CreateCardBody = Pick<Card, 'boardId' | 'listId' | 'name'>;
type UpdateCardBody = Pick<Card, 'listId' | 'name'>;

export const handlers = [
  // Create card
  rest.post<CreateCardBody, PathParams, Card | ApiError>(
    routes.apiCardsPath(),
    async (req, res, ctx) => {
      const { name, boardId, listId }: CreateCardBody = await req.json();

      if (isStringEmpty(name) || isStringEmpty(listId)) {
        return res(ctx.delay(ms()), ctx.status(400), ctx.json(generateApiError(400)));
      }

      const cardsMock: Card[] = storage.getItem(storageKeys.CARDS()) ?? [];
      const listsMock: List[] = storage.getItem(storageKeys.LISTS()) ?? [];
      const currList = listsMock.find((l) => l.id === listId);

      if (!currList) {
        return res(ctx.delay(ms()), ctx.status(404), ctx.json(generateApiError(404)));
      }

      const newCard: Card = {
        id: uuid(),
        name,
        boardId,
        listId,
      };

      cardsMock.push(newCard);
      currList.cardIds.push(newCard.id);

      // Update storage
      storage.setItem(storageKeys.LISTS(), listsMock);
      storage.setItem(storageKeys.CARDS(), cardsMock);

      return res(ctx.delay(ms()), ctx.status(201), ctx.json(newCard));
    },
  ),
  // Update
  rest.patch<UpdateCardBody, { id: string }, null | ApiError>(
    routes.apiCardsPath(':id'),
    async (req, res, ctx) => {
      const { id } = req.params;
      const { name, listId }: UpdateCardBody = await req.json();

      if (isStringEmpty(id)) {
        return res(ctx.delay(ms()), ctx.status(400), ctx.json(generateApiError(400)));
      }

      const cardsMock: Card[] = storage.getItem(storageKeys.CARDS()) ?? [];
      const currentCard = cardsMock.find((card) => card.id === id);
      if (!currentCard) {
        return res(ctx.delay(ms()), ctx.status(404), ctx.json(generateApiError(404)));
      }

      if (name) {
        currentCard.name = name;
      }
      if (listId) {
        currentCard.listId = listId;
      }
      storage.setItem(storageKeys.CARDS(), cardsMock);

      return res(ctx.delay(ms()), ctx.status(200));
    },
  ),
  // Delete card
  rest.delete<DefaultBodyType, { id: string }, Card | ApiError>(
    routes.apiCardsPath(':id'),
    (req, res, ctx) => {
      const { id } = req.params;

      const cardsMock: Card[] = storage.getItem(storageKeys.CARDS()) ?? [];
      const listsMock: List[] = storage.getItem(storageKeys.LISTS()) ?? [];

      const currCardMock = cardsMock.find((card) => card.id === id);
      const currListMock = listsMock.find((l) => l.id === currCardMock?.listId);
      if (!currCardMock || !currListMock) {
        return res(ctx.delay(ms()), ctx.status(404), ctx.json(generateApiError(404)));
      }

      const filteredCards = cardsMock.filter((card) => card.id !== id);
      currListMock.cardIds = currListMock.cardIds.filter((cId) => cId !== id);

      // Update storage
      storage.setItem(storageKeys.CARDS(), filteredCards);
      storage.setItem(storageKeys.LISTS(), listsMock);

      return res(ctx.delay(ms()), ctx.status(200), ctx.json(currCardMock));
    },
  ),
];

export default handlers;

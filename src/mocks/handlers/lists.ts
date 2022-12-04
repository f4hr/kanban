import { rest } from 'msw';
import { v4 as uuid } from 'uuid';

import type { PathParams } from 'msw';

import routes from '../../routes';
import { ms, isStringEmpty, generateApiError } from '../utils';
import { storage } from '../../utils/storage';
import { storageKeys } from '../index';

import type { ApiError, BoardDetails, List } from '../../types';

type CreateListBody = Pick<List, 'boardId' | 'name'>;
type UpdateListBody = Pick<List, 'name' | 'cardIds'>;
type DeleteListBody = Pick<List, 'boardId'>;

export const handlers = [
  // Create list
  rest.post<CreateListBody, PathParams, List | ApiError>(
    routes.apiListsPath(),
    async (req, res, ctx) => {
      const { name, boardId }: CreateListBody = await req.json();

      if (isStringEmpty(name) || isStringEmpty(boardId)) {
        return res(ctx.delay(ms()), ctx.status(400), ctx.json(generateApiError(400)));
      }

      const boardDetailsMock: BoardDetails[] = storage.getItem(storageKeys.BOARD_DETAILS()) ?? [];
      const listsMock: List[] = storage.getItem(storageKeys.LISTS()) ?? [];

      // Create new list
      const newList: List = {
        id: uuid(),
        name,
        boardId,
        cardIds: [],
      };

      // Update board details mock
      const currentBoardDetails = boardDetailsMock.find((bd) => bd.boardId === boardId);
      if (currentBoardDetails != null) {
        currentBoardDetails.listIds.push(newList.id);
        currentBoardDetails.lists[newList.id] = newList;
      }

      // Update storage
      storage.setItem(storageKeys.BOARD_DETAILS(), boardDetailsMock);
      storage.setItem(storageKeys.LISTS(), [...listsMock, newList]);

      return res(ctx.delay(ms()), ctx.status(201), ctx.json(newList));
    },
  ),
  // Update list
  rest.patch<UpdateListBody, Pick<List, 'id'>, List | ApiError>(
    routes.apiListsPath(':id'),
    async (req, res, ctx) => {
      const { id } = req.params;
      const { name, cardIds }: UpdateListBody = await req.json();

      if (isStringEmpty(name) && !cardIds) {
        return res(ctx.delay(ms()), ctx.status(400), ctx.json(generateApiError(400)));
      }

      const listsMock: List[] = storage.getItem(storageKeys.LISTS()) ?? [];
      const currentList = listsMock.find((list) => list.id === id);
      if (!currentList) {
        return res(ctx.delay(ms()), ctx.status(404), ctx.json(generateApiError(404)));
      }

      if (name) {
        currentList.name = name;
      }
      if (cardIds) {
        currentList.cardIds = cardIds;
      }
      storage.setItem(storageKeys.LISTS(), listsMock);

      return res(ctx.delay(ms()), ctx.status(200), ctx.json(currentList));
    },
  ),
  // Delete list
  rest.delete<DeleteListBody, Pick<List, 'id'>, List | ApiError>(
    routes.apiListsPath(':id'),
    async (req, res, ctx) => {
      const { id } = req.params;
      const { boardId }: DeleteListBody = await req.json();

      const boardDetailsMock: BoardDetails[] = storage.getItem(storageKeys.BOARD_DETAILS()) ?? [];
      const listsMock: List[] = storage.getItem(storageKeys.LISTS()) ?? [];

      const currentBoardDetails = boardDetailsMock.find((bd) => bd.boardId === boardId);
      const currentList = listsMock.find((l) => l.id === id);
      if (!currentBoardDetails || !currentList) {
        return res(ctx.delay(ms()), ctx.status(404), ctx.json(generateApiError(404)));
      }

      // Remove list ID from current board
      currentBoardDetails.listIds = currentBoardDetails.listIds.filter((listId) => listId !== id);
      // Remove list from lists mock
      const filteredLists = listsMock.filter((list) => list.id !== id);

      // Update storage
      storage.setItem(storageKeys.BOARD_DETAILS(), boardDetailsMock);
      storage.setItem(storageKeys.LISTS(), filteredLists);

      return res(ctx.delay(ms()), ctx.status(200), ctx.json(currentList));
    },
  ),
];

export default handlers;

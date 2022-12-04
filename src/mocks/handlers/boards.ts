import { rest } from 'msw';
import { v4 as uuid } from 'uuid';

import type { DefaultBodyType, PathParams } from 'msw';

import routes from '../../routes';
import { ms, isStringEmpty, generateApiError, getToken } from '../utils';
import { storage } from '../../utils/storage';
import { storageKeys } from '../index';

import type { UserDetails, Board, List, Card, BoardDetails, ApiError } from '../../types';

type CreateBoardBody = Pick<Board, 'name'>;
type UpdateBoardBody = Pick<Board, 'name'> &
  Pick<BoardDetails, 'listIds'> & { lists: Pick<List, 'id' | 'cardIds'>[] };

export const handlers = [
  // Get boards
  rest.get<DefaultBodyType, PathParams, { boards: Board[] } | ApiError>(
    routes.apiBoardsPath(),
    async (req, res, ctx) => {
      const userId = getToken(req.headers.get('authorization') || '');

      const userDetailsMock: UserDetails[] = storage.getItem(storageKeys.USER_DETAILS()) ?? [];
      const currentUserDetails = userDetailsMock.find((u) => u.userId === userId);
      if (!currentUserDetails) {
        return res(
          ctx.delay(ms()),
          ctx.status(404),
          ctx.json(generateApiError(404, 'Board not found')),
        );
      }

      const boardsMock: Board[] = storage.getItem(storageKeys.BOARDS()) ?? [];
      const userBoards = boardsMock.filter((b) => currentUserDetails.ownedBoards?.includes(b.id));

      return res(
        ctx.delay(ms()),
        ctx.status(200),
        ctx.json({
          boards: userBoards,
        }),
      );
    },
  ),
  // Get board
  rest.get<DefaultBodyType, { id: string }, BoardDetails | ApiError>(
    routes.apiBoardsPath(':id'),
    (req, res, ctx) => {
      const { id } = req.params;

      const boardsMock: Board[] = storage.getItem(storageKeys.BOARDS()) ?? [];
      const boardDetailsMock: BoardDetails[] = storage.getItem(storageKeys.BOARD_DETAILS()) ?? [];
      const listsMock: List[] = storage.getItem(storageKeys.LISTS()) ?? [];
      const cardsMock: Card[] = storage.getItem(storageKeys.CARDS()) ?? [];

      const board = boardsMock.find((b) => b.id === id);
      const boardDetails = boardDetailsMock.find((b) => b.boardId === id);

      if (board == null || boardDetails == null) {
        return res(
          ctx.delay(ms()),
          ctx.status(404),
          ctx.json(generateApiError(404, 'Board not found')),
        );
      }

      const lists = listsMock.filter(({ boardId }) => boardId === id);
      const cards = cardsMock.filter(({ boardId }) => boardId === id);

      return res(
        ctx.delay(ms()),
        ctx.status(200),
        ctx.json({
          ...boardDetails,
          name: board.name,
          lists: lists.reduce((acc, l) => ({ ...acc, [l.id]: l }), {}),
          cards: cards.reduce((acc, c) => ({ ...acc, [c.id]: c }), {}),
        }),
      );
    },
  ),
  // Create board
  rest.post<CreateBoardBody, PathParams, Board | ApiError>(
    routes.apiBoardsPath(),
    async (req, res, ctx) => {
      const userId = getToken(req.headers.get('authorization') || '');
      const { name }: CreateBoardBody = await req.json();

      const userDetailsMock: UserDetails[] = storage.getItem(storageKeys.USER_DETAILS()) ?? [];
      const currentUserDetails = userDetailsMock.find((u) => u.userId === userId);
      if (!currentUserDetails) {
        return res(ctx.delay(ms()), ctx.status(404), ctx.json(generateApiError(404)));
      }
      if (isStringEmpty(name)) {
        return res(ctx.delay(ms()), ctx.status(400), ctx.json(generateApiError(400)));
      }

      const boardsMock: Board[] = storage.getItem(storageKeys.BOARDS()) ?? [];
      const boardDetailsMock: BoardDetails[] = storage.getItem(storageKeys.BOARD_DETAILS()) ?? [];

      const newBoard: Board = {
        id: uuid(),
        name,
        ownerId: currentUserDetails.userId,
        userIds: [currentUserDetails.userId],
      };
      const newBoardDetails: BoardDetails = {
        id: uuid(),
        boardId: newBoard.id,
        listIds: [],
        lists: {},
        cards: {},
      };

      // Update mocks
      currentUserDetails.ownedBoards?.push(newBoard.id);
      boardsMock.push(newBoard);
      boardDetailsMock.push(newBoardDetails);

      // Update storage
      storage.setItem(storageKeys.USER_DETAILS(), userDetailsMock);
      storage.setItem(storageKeys.BOARDS(), boardsMock);
      storage.setItem(storageKeys.BOARD_DETAILS(), boardDetailsMock);

      return res(ctx.delay(ms()), ctx.status(201), ctx.json(newBoard));
    },
  ),
  // Update board
  rest.patch<UpdateBoardBody, { id: string }, null | Board | ApiError>(
    routes.apiBoardsPath(':id'),
    async (req, res, ctx) => {
      const { id } = req.params;
      const { name, listIds, lists }: UpdateBoardBody = await req.json();

      if (isStringEmpty(name) && !listIds && !lists) {
        return res(
          ctx.delay(ms()),
          ctx.status(400),
          ctx.json(generateApiError(400, 'Invalid request body')),
        );
      }

      if (name) {
        const boardsMock: Board[] = storage.getItem(storageKeys.BOARDS()) ?? [];

        const currentBoard = boardsMock.find((board) => board.id === id);
        if (!currentBoard) {
          return res(ctx.delay(ms()), ctx.status(404), ctx.json(generateApiError(404)));
        }

        currentBoard.name = name;
        storage.setItem(storageKeys.BOARDS(), boardsMock);

        return res(ctx.delay(ms()), ctx.status(200), ctx.json(currentBoard));
      }
      if (listIds) {
        const boardDetailsMock: BoardDetails[] = storage.getItem(storageKeys.BOARD_DETAILS()) ?? [];

        const currentBoardDetails = boardDetailsMock.find((board) => board.boardId === id);
        if (!currentBoardDetails) {
          return res(ctx.delay(ms()), ctx.status(404), ctx.json(generateApiError(404)));
        }

        currentBoardDetails.listIds = listIds;
        storage.setItem(storageKeys.BOARD_DETAILS(), boardDetailsMock);
      }
      // Reorder cards
      if (lists) {
        const listsMock: List[] = storage.getItem(storageKeys.LISTS()) ?? [];
        const cardsMock: Card[] = storage.getItem(storageKeys.CARDS()) ?? [];

        // Update card IDs for list
        lists.forEach((list) => {
          const currentList = listsMock.find((l) => l.id === list.id);
          if (currentList) {
            currentList.cardIds = list.cardIds;

            // Update parent list ID for cards
            list.cardIds.forEach((cardId) => {
              const currentCard = cardsMock.find((c) => c.id === cardId);

              if (currentCard) {
                currentCard.listId = list.id;
              }
            });
          }
        });

        storage.setItem(storageKeys.LISTS(), listsMock);
        storage.setItem(storageKeys.CARDS(), cardsMock);
      }

      return res(ctx.delay(ms()), ctx.status(200), ctx.json(null));
    },
  ),
  // Delete board
  rest.delete<DefaultBodyType, { id: string }, null | ApiError>(
    routes.apiBoardsPath(':id'),
    (req, res, ctx) => {
      const { id } = req.params;

      const boards: Board[] = storage.getItem(storageKeys.BOARDS()) ?? [];

      if (!boards.find((board) => board.id === id)) {
        return res(ctx.delay(ms()), ctx.status(404), ctx.json(generateApiError(404)));
      }

      const boardDetails: BoardDetails[] = storage.getItem(storageKeys.BOARD_DETAILS()) ?? [];
      const lists: List[] = storage.getItem(storageKeys.LISTS()) ?? [];
      const cards: Card[] = storage.getItem(storageKeys.CARDS()) ?? [];

      // Remove items related to deleted board
      storage.setItem(
        storageKeys.BOARDS(),
        boards.filter((board) => board.id !== id),
      );
      storage.setItem(
        storageKeys.BOARD_DETAILS(),
        boardDetails.filter(({ boardId }) => boardId !== id),
      );
      storage.setItem(
        storageKeys.LISTS(),
        lists.filter(({ boardId }) => boardId !== id),
      );
      storage.setItem(
        storageKeys.CARDS(),
        cards.filter(({ boardId }) => boardId !== id),
      );

      return res(ctx.delay(ms()), ctx.status(200), ctx.json(null));
    },
  ),
];

export default handlers;

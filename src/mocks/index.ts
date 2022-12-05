import { v4 as uuid } from 'uuid';

import { storage } from '../utils/storage';

import type { User, Board, List, Card, BoardDetails, UserDetails } from '../types';

const generateEntities = <T extends { id: string }>(arr: T[]): { [key: string]: T } =>
  arr.reduce((acc, item) => ({ ...acc, [item.id]: item }), {});

type StorageKey = 'USERS' | 'USER_DETAILS' | 'BOARDS' | 'BOARD_DETAILS' | 'LISTS' | 'CARDS';
export const storageKeys: { [key in StorageKey]: () => string } = {
  USERS: () => 'usersMock',
  USER_DETAILS: () => 'userDetailsMock',
  BOARDS: () => 'boardsMock',
  BOARD_DETAILS: () => 'boardDetailsMock',
  LISTS: () => 'listsMock',
  CARDS: () => 'cardsMock',
};
export const mocks: { [key: string]: object[] } = {};

const usersMock: User[] = [
  {
    id: uuid(),
    email: 'test@example.com',
    name: 'Jon Doe',
    boardIds: [],
  },
];
mocks[storageKeys.USERS()] = usersMock;

const [boardId1, boardId2] = [uuid(), uuid()];
const [listId1, listId2] = [uuid(), uuid()];

const boardsMock: Board[] = [
  {
    id: boardId1,
    name: 'Foo board',
    ownerId: usersMock[0].id,
    userIds: [usersMock[0].id],
  },
  {
    id: boardId2,
    name: 'Bar board',
    ownerId: usersMock[0].id,
    userIds: [usersMock[0].id],
  },
];
mocks[storageKeys.BOARDS()] = boardsMock;

const userDetailsMock: (UserDetails & { password: string })[] = [
  {
    id: uuid(),
    userId: usersMock[0].id,
    ownedBoards: boardsMock.map((b) => b.id),
    password: 'admin',
  },
];
mocks[storageKeys.USER_DETAILS()] = userDetailsMock;

const cardsMock: Card[] = [
  {
    id: uuid(),
    name: 'Write tests',
    boardId: boardId1,
    listId: listId1,
  },
  {
    id: uuid(),
    name: 'Refactor',
    boardId: boardId1,
    listId: listId2,
  },
];
mocks[storageKeys.CARDS()] = cardsMock;

const listsMock: List[] = [
  {
    id: listId1,
    name: 'Backlog',
    boardId: boardId1,
    cardIds: [cardsMock[0].id],
  },
  {
    id: listId2,
    name: 'In progress',
    boardId: boardId1,
    cardIds: [cardsMock[1].id],
  },
];
mocks[storageKeys.LISTS()] = listsMock;

const boardDetailsMock: BoardDetails[] = [
  {
    id: uuid(),
    boardId: boardId1,
    listIds: listsMock.map((l) => l.id),
    lists: generateEntities(listsMock),
    cards: generateEntities(cardsMock),
  },
  {
    id: uuid(),
    boardId: boardId2,
    listIds: [],
    lists: {},
    cards: {},
  },
];
mocks[storageKeys.BOARD_DETAILS()] = boardDetailsMock;

export const getBoardDetails = (id: Board['id']): BoardDetails | null =>
  boardDetailsMock.find((b) => b.boardId === id) || null;

export const getListsByBoardId = (id: Board['id']): List[] =>
  listsMock.filter(({ boardId }) => boardId !== id);

export const getCardsByBoardId = (id: Board['id']): Card[] => {
  const filteredListsIds = getListsByBoardId(id).map((list) => list.id);
  return cardsMock.filter(({ listId }) => filteredListsIds.includes(listId));
};
export const getListCards = (listId: List['id']): Card[] =>
  cardsMock.filter((c) => c.listId === listId);

const mapStorage = (fn: (key: string) => void) => {
  Object.keys(storageKeys)
    .map((k) => storageKeys[k as StorageKey]())
    .forEach(fn);
};

export const initStorage = () => {
  mapStorage((key) => {
    if (!storage.getItem(key)) {
      storage.setItem(key, mocks[key]);
    }
  });
};

export const resetStorage = () => {
  mapStorage((key) => storage.setItem(key, mocks[key]));
};

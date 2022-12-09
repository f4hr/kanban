import type { QueryStatus } from '@tanstack/react-query';

export interface ApiError {
  statusCode: number;
  error: string;
  message: string;
}

export type Status = QueryStatus | 'idle';

export interface User {
  id: string;
  name: string;
  email: string;
  boardIds: Board['id'][];
  boards?: Board[];
}

export interface UserDetails {
  id: string;
  userId: string;
  ownedBoards?: Board['id'][];
}

export interface Board {
  id: string;
  name: string;
  ownerId: User['id'];
  userIds: User['id'][];
  users?: User[];
}

export interface BoardDetails {
  id: string;
  boardId: string;
  name?: string;
  listIds: List['id'][];
  lists: {
    [key: List['id']]: List;
  };
  cards: {
    [key: Card['id']]: Card;
  };
}

export interface List {
  id: string;
  name: string;
  boardId: string;
  cardIds: Card['id'][];
}

export interface Card {
  id: string;
  name: string;
  boardId: string;
  listId: string;
}

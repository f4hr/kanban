// Helpers
import routes from '../../routes';
import { httpClient as client } from '../../utils/httpClient';
// Types
import type { DefaultPayload, Repository } from './index';
import type { Board, BoardDetails, List } from '../../types';

type BoardResponse = void | { boards: Board[] } | Board;

interface BoardRepository extends Repository<DefaultPayload, BoardResponse> {
  /**
   * Get list of boards.
   *
   * @returns List of boards.
   */
  getAll: (userId: Board['ownerId']) => Promise<void | { boards: Board[] }>;
  /**
   * Get board by ID.
   *
   * @param id - Board ID.
   * @returns void | Board.
   */
  getById: (id: Board['id']) => Promise<void | Required<BoardDetails>>;
  /**
   * Create board.
   *
   * @param name - A board name.
   * @returns void | Board.
   */
  create: (payload: Pick<Board, 'name'>) => Promise<void | Board>;
  /**
   * Update board.
   *
   * @param payload - An object containing board properties
   * @returns void | Board.
   */
  update: (payload: Pick<Board, 'id' | 'name'>) => Promise<void | Board>;
  /**
   * Reorder board lists.
   *
   * @param payload - An object containing list IDs
   * @returns void.
   */
  reorderLists: (payload: Pick<Board, 'id'> & Pick<BoardDetails, 'listIds'>) => Promise<void>;
  /**
   * Reorder board cards.
   *
   * @param payload - An object containing lists with card IDs.
   * @returns void.
   */
  reorderCards: (
    payload: Pick<Board, 'id'> & { lists: Pick<List, 'id' | 'cardIds'>[] },
  ) => Promise<void>;
  /**
   * Delete board.
   *
   * @param id - ID of board that being deleted.
   * @returns void.
   */
  delete: (id: Board['id']) => Promise<void>;
}

const boards: BoardRepository = {
  getAll(userId) {
    // TODO: refactor to use URL
    return client.get(`${routes.apiBoardsPath()}?userId=${userId}`);
  },
  getById(id) {
    return client.get(routes.apiBoardsPath(id));
  },
  create(payload) {
    return client.post(routes.apiBoardsPath(), {
      body: JSON.stringify(payload),
    });
  },
  update({ id, ...payload }) {
    return client.patch(routes.apiBoardsPath(id), {
      body: JSON.stringify(payload),
    });
  },
  reorderLists({ id, ...payload }) {
    return client.patch(routes.apiBoardsPath(id), {
      body: JSON.stringify(payload),
    });
  },
  reorderCards({ id, ...payload }) {
    return client.patch(routes.apiBoardsPath(id), {
      body: JSON.stringify(payload),
    });
  },
  delete(id) {
    return client.delete(routes.apiBoardsPath(id));
  },
};

export default boards;

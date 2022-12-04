// Helpers
import routes from '../../routes';
import { httpClient as client } from '../../utils/httpClient';
// Types
import type { Repository } from './index';
import type { List } from '../../types';

interface ListRepository extends Omit<Repository, 'getAll'> {
  /**
   * Get list by ID.
   *
   * @param id - List ID.
   * @returns void | List.
   */
  getById: (id: List['id']) => Promise<void | List>;
  /**
   * Create list.
   *
   * @param name - A list name.
   * @returns void | List.
   */
  create: (payload: Pick<List, 'boardId' | 'name'>) => Promise<void | List>;
  /**
   * Rename list.
   *
   * @param payload - An object containing list properties
   * @returns void | List.
   */
  update: (payload: Partial<List> & Pick<List, 'id'>) => Promise<void | List>;
  /**
   * Delete list.
   *
   * @param payload - An object containing list properties
   * @returns void.
   */
  delete: (payload: Pick<List, 'id' | 'boardId'>) => Promise<void>;
}

const lists: ListRepository = {
  getById(id) {
    return client.get(routes.apiListsPath(id));
  },
  create(payload) {
    return client.post(routes.apiListsPath(), {
      body: JSON.stringify(payload),
    });
  },
  update({ id, ...payload }) {
    return client.patch(routes.apiListsPath(id), {
      body: JSON.stringify(payload),
    });
  },
  delete({ id, ...payload }) {
    return client.delete(routes.apiListsPath(id), {
      body: JSON.stringify(payload),
    });
  },
};

export default lists;

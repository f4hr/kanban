// Helpers
import routes from '../../routes';
import { httpClient as client } from '../../utils/httpClient';
// Types
import type { DefaultPayload, Repository } from './index';
import type { Card } from '../../types';

interface CardRepository extends Omit<Repository<DefaultPayload, Card>, 'getAll'> {
  /**
   * Get card by ID.
   *
   * @param id - Card ID.
   * @returns Card.
   */
  getById: (id: Card['id']) => Promise<void | Card>;
  /**
   * Create card.
   *
   * @param name - A card name.
   * @returns Card.
   */
  create: (payload: Pick<Card, 'boardId' | 'listId' | 'name'>) => Promise<void | Card>;
  /**
   * Update card.
   *
   * @param payload - An object containing card properties
   * @returns Card.
   */
  update: (payload: Pick<Card, 'id' | 'boardId' | 'listId' | 'name'>) => Promise<void | Card>;
  /**
   * Delete card.
   *
   * @param payload - An object containing card properties
   * @returns Card.
   */
  delete: (payload: Pick<Card, 'id' | 'boardId' | 'listId'>) => Promise<void | Card>;
}

const cards: CardRepository = {
  getById(id) {
    return client.get(routes.apiCardsPath(id));
  },
  create(payload) {
    return client.post(routes.apiCardsPath(), {
      body: JSON.stringify(payload),
    });
  },
  update({ id, ...payload }) {
    return client.patch(routes.apiCardsPath(id), {
      body: JSON.stringify(payload),
    });
  },
  delete({ id, ...payload }) {
    return client.delete(routes.apiCardsPath(id), {
      body: JSON.stringify(payload),
    });
  },
};

export default cards;

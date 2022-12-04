// Helpers
import routes from '../../routes';
import { httpClient as client } from '../../utils/httpClient';
// Types
import type { Repository, DefaultPayload } from './index';
import type { User } from '../../types';

interface UserRepository extends Pick<Repository<DefaultPayload>, 'create'> {
  /**
   * Get user by ID.
   *
   * @param id - user ID.
   * @returns void | User.
   */
  getById: (id: User['id']) => Promise<void | Pick<User, 'id' | 'email' | 'name'>>;
  /**
   * Create user.
   *
   * @param payload - An object containing user properties
   * @returns void.
   */
  create: (payload: Pick<User, 'email' | 'name'> & { password: string }) => Promise<void>;
}

const users: UserRepository = {
  getById(id) {
    return client.get(routes.apiUsersPath(id));
  },
  create(payload) {
    return client.post(routes.apiUsersPath(), {
      body: JSON.stringify(payload),
      authorized: false,
    });
  },
};

export default users;

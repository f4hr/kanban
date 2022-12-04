// Helpers
import routes from '../../routes';
import { httpClient as client } from '../../utils/httpClient';

interface AuthRepository {
  /**
   * Login user.
   *
   * @param payload - An object containing user credentials
   * @returns User ID and token.
   */
  login: (payload: {
    email: string;
    password: string;
  }) => Promise<void | { userId: string; token: string }>;
}

const auth: AuthRepository = {
  login(payload) {
    return client.post(routes.apiLoginPath(), {
      body: JSON.stringify(payload),
      authorized: false,
    });
  },
};

export default auth;

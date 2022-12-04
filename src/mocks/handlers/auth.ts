import { rest } from 'msw';

import type { PathParams } from 'msw';

// Utils
import routes from '../../routes';
import { generateApiError, ms } from '../utils';
import { storage } from '../../utils/storage';
import { storageKeys } from '../index';
// Types
import type { ApiError, User, UserDetails } from '../../types';

type LoginBody = { email: string; password: string };

export const handlers = [
  // Login
  rest.post<LoginBody, PathParams, { userId: User['id']; token: string } | ApiError>(
    routes.apiLoginPath(),
    async (req, res, ctx) => {
      const { email, password }: LoginBody = await req.json();

      const usersMock: User[] = storage.getItem(storageKeys.USERS()) ?? [];
      const userDetailsMock: (UserDetails & { password: string })[] =
        storage.getItem(storageKeys.USER_DETAILS()) ?? [];

      const currentUser = usersMock.find((u) => u.email === email);
      if (!currentUser) {
        return res(
          ctx.delay(ms()),
          ctx.status(400),
          ctx.json(generateApiError(400, 'Invalid email or password')),
        );
      }

      const currentUserDetails = userDetailsMock.find((u) => u.userId === currentUser.id);
      if (!currentUserDetails) {
        return res(
          ctx.delay(ms()),
          ctx.status(400),
          ctx.json(generateApiError(400, 'Invalid email or password')),
        );
      }

      if (currentUserDetails.password !== password) {
        return res(
          ctx.delay(ms()),
          ctx.status(400),
          ctx.json(generateApiError(400, 'Invalid email or password')),
        );
      }

      return res(
        ctx.delay(ms()),
        ctx.status(201),
        ctx.json({ userId: currentUser.id, token: currentUser.id }),
      );
    },
  ),
];

export default handlers;

import { rest } from 'msw';
import { v4 as uuid } from 'uuid';

import type { DefaultBodyType, PathParams } from 'msw';

// Utils
import routes from '../../routes';
import { generateApiError, ms } from '../utils';
import { storage } from '../../utils/storage';
import { storageKeys } from '../index';
// Types
import type { ApiError, User, UserDetails } from '../../types';

type CreateUserBody = Pick<User, 'email' | 'name'> & {
  password: string;
};

export const handlers = [
  // Get user
  rest.get<DefaultBodyType, { id: string }, Pick<User, 'id' | 'email' | 'name'> | ApiError>(
    routes.apiUsersPath(':id'),
    (req, res, ctx) => {
      const { id } = req.params;

      const usersMock: User[] = storage.getItem(storageKeys.USERS()) ?? [];

      const currentUser = usersMock.find((b) => b.id === id);
      if (currentUser == null) {
        return res(ctx.delay(ms()), ctx.status(404), ctx.json(generateApiError(404)));
      }

      return res(
        ctx.delay(ms()),
        ctx.status(200),
        ctx.json({
          id: currentUser.id,
          email: currentUser.email,
          name: currentUser.name,
        }),
      );
    },
  ),
  // Create user
  rest.post<CreateUserBody, PathParams, User>(routes.apiUsersPath(), async (req, res, ctx) => {
    const { email, password, name }: CreateUserBody = await req.json();
    const user: User = {
      id: uuid(),
      email,
      name,
      boardIds: [],
    };
    const userDetails: UserDetails = {
      id: uuid(),
      userId: user.id,
      ownedBoards: [],
    };
    const userDetailsWithPassword = { ...userDetails, password };

    const users: User[] = storage.getItem(storageKeys.USERS()) ?? [];
    const usersDetails: UserDetails[] = storage.getItem(storageKeys.USER_DETAILS()) ?? [];

    // Update storage
    storage.setItem(storageKeys.USERS(), [...users, user]);
    storage.setItem(storageKeys.USER_DETAILS(), [...usersDetails, userDetailsWithPassword]);

    return res(ctx.delay(ms()), ctx.status(201), ctx.json(user));
  }),
];

export default handlers;

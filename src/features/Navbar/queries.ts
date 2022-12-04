import { useQuery } from '@tanstack/react-query';

import type { UseQueryOptions } from '@tanstack/react-query';

// Utils
import apiClient from '../../services/apiClient';
import { userKeys } from '../../utils/queryKeyFactory';
// Types
import type { User } from '../../types';

type UserQueryData = Pick<User, 'id' | 'email' | 'name'>;

export const useUserQuery = (
  userId?: string,
  options?: UseQueryOptions<
    void | UserQueryData,
    Error,
    void | UserQueryData,
    ReturnType<typeof userKeys.detail>
  >,
) =>
  useQuery<void | UserQueryData, Error, void | UserQueryData, ReturnType<typeof userKeys.detail>>(
    userKeys.detail(userId || ''),
    ({ queryKey }) => {
      const [, , id] = queryKey;

      return apiClient.users.getById(id);
    },
    {
      enabled: Boolean(userId),
      ...options,
    },
  );

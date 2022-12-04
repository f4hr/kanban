import { useQuery } from '@tanstack/react-query';

import type { UseQueryOptions } from '@tanstack/react-query';

// Utils
import apiClient from '../../services/apiClient';
import { boardKeys } from '../../utils/queryKeyFactory';
// Types
import { Board } from '../../types';

export const useBoardsQuery = (
  options?: UseQueryOptions<
    void | { boards: Board[] },
    Error,
    void | { boards: Board[] },
    ReturnType<typeof boardKeys.lists>
  >,
) =>
  useQuery<
    void | { boards: Board[] },
    Error,
    void | { boards: Board[] },
    ReturnType<typeof boardKeys.lists>
  >(boardKeys.lists(), () => apiClient.boards.getAll(), options);

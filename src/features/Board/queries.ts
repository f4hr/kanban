import { useQuery } from '@tanstack/react-query';

import type { UseQueryOptions } from '@tanstack/react-query';

// Utils
import apiClient from '../../services/apiClient';
import { boardKeys } from '../../utils/queryKeyFactory';
// Types
import type { BoardDetails } from '../../types';

export const useBoardQuery = (
  boardId: string,
  options?: UseQueryOptions<
    void | Required<BoardDetails>,
    Error,
    void | Required<BoardDetails>,
    ReturnType<typeof boardKeys.detail>
  >,
) =>
  useQuery<
    void | Required<BoardDetails>,
    Error,
    void | Required<BoardDetails>,
    ReturnType<typeof boardKeys.detail>
  >(
    boardKeys.detail(boardId),
    ({ queryKey }) => {
      const [, , id] = queryKey;

      return apiClient.boards.getById(id);
    },
    {
      staleTime: 0,
      ...options,
    },
  );

import { useMutation } from '@tanstack/react-query';

import type { QueryClient } from '@tanstack/react-query';

// Utils
import apiClient from '../../services/apiClient';
import { boardKeys } from '../../utils/queryKeyFactory';
// Types
import { Board } from '../../types';

export const useCreateBoard = (queryClient: QueryClient) =>
  useMutation<void | Board, Error, Parameters<typeof apiClient.boards.create>[0]>(
    apiClient.boards.create,
    {
      async onSuccess() {
        await queryClient.invalidateQueries(boardKeys.lists());
      },
    },
  );

export const useDeleteBoard = (queryClient: QueryClient) =>
  useMutation<void, Error, Parameters<typeof apiClient.boards.delete>[0]>(apiClient.boards.delete, {
    async onSuccess() {
      await queryClient.invalidateQueries(boardKeys.lists());
    },
  });

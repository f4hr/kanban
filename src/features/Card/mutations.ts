import { useMutation } from '@tanstack/react-query';

import type { QueryClient } from '@tanstack/react-query';

// Utils
import apiClient from '../../services/apiClient';
import { boardKeys } from '../../utils/queryKeyFactory';
// Types
import type { Card } from '../../types';

export const useCreateCard = (queryClient: QueryClient) =>
  useMutation<void | Card, Error, Parameters<typeof apiClient.cards.create>[0]>(
    apiClient.cards.create,
    {
      async onSuccess(_data, { boardId }) {
        await queryClient.invalidateQueries(boardKeys.detail(boardId));
      },
    },
  );

export const useUpdateCard = (queryClient: QueryClient) =>
  useMutation<void | Card, Error, Parameters<typeof apiClient.cards.update>[0]>(
    apiClient.cards.update,
    {
      async onSuccess(_data, { boardId }) {
        await queryClient.invalidateQueries(boardKeys.detail(boardId));
      },
    },
  );

export const useDeleteCard = (queryClient: QueryClient) =>
  useMutation<void | Card, Error, Parameters<typeof apiClient.cards.delete>[0]>(
    apiClient.cards.delete,
    {
      async onSuccess(_data, { boardId }) {
        await queryClient.invalidateQueries(boardKeys.detail(boardId));
      },
    },
  );

import { useMutation } from '@tanstack/react-query';

import type { QueryClient } from '@tanstack/react-query';

// Utils
import apiClient from '../../services/apiClient';
import { boardKeys } from '../../utils/queryKeyFactory';
// Types
import type { BoardDetails, List } from '../../types';

export const useCreateList = (queryClient: QueryClient) =>
  useMutation<void | List, Error, Parameters<typeof apiClient.lists.create>[0]>(
    apiClient.lists.create,
    {
      async onSuccess(_data, { boardId }) {
        // TODO: set query data instead
        await queryClient.invalidateQueries(boardKeys.detail(boardId));
      },
    },
  );

export const useUpdateList = (queryClient: QueryClient) =>
  useMutation<void | List, Error, Parameters<typeof apiClient.lists.update>[0]>(
    apiClient.lists.update,
    {
      onSuccess(data, { boardId }) {
        if (!boardId) {
          return;
        }
        queryClient.setQueryData<BoardDetails>(boardKeys.detail(boardId), (prev) => {
          if (!prev || !data) {
            return undefined;
          }

          // eslint-disable-next-line no-param-reassign
          prev.lists[data.id] = data;

          return prev;
        });
      },
    },
  );

export const useDeleteList = (queryClient: QueryClient) =>
  useMutation<void, Error, Parameters<typeof apiClient.lists.delete>[0]>(apiClient.lists.delete, {
    async onSuccess(_data, { boardId }) {
      // TODO: set query data instead
      await queryClient.invalidateQueries(boardKeys.detail(boardId));
    },
  });

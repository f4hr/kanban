import { useMutation } from '@tanstack/react-query';

import type { QueryClient } from '@tanstack/react-query';

// Utils
import apiClient from '../../services/apiClient';
import { boardKeys } from '../../utils/queryKeyFactory';
// Types
import type { Board, BoardDetails } from '../../types';

export const useUpdateBoard = (queryClient: QueryClient) =>
  useMutation<void | Board, Error, Parameters<typeof apiClient.boards.update>[0]>(
    apiClient.boards.update,
    {
      onSuccess(data, { id }) {
        queryClient.setQueryData<{ boards: Board[] }>(boardKeys.lists(), (prev) => {
          if (!prev || !data) return undefined;

          const currentBoardIndex = prev.boards.findIndex((b) => b.id === id);
          if (currentBoardIndex < 0) {
            return undefined;
          }

          // eslint-disable-next-line no-param-reassign
          prev.boards[currentBoardIndex] = data;

          return prev;
        });

        queryClient.setQueryData<BoardDetails>(boardKeys.detail(id), (prev) => {
          if (!prev || !data) return undefined;

          // eslint-disable-next-line no-param-reassign
          prev.name = data.name;

          return prev;
        });
      },
    },
  );

export const useReorderLists = () =>
  useMutation<void, Error, Parameters<typeof apiClient.boards.reorderLists>[0]>(
    apiClient.boards.reorderLists,
  );

export const useReorderCards = () =>
  useMutation<void, Error, Parameters<typeof apiClient.boards.reorderCards>[0]>(
    apiClient.boards.reorderCards,
  );

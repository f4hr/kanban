import { useMutation } from '@tanstack/react-query';

import type { UseMutationOptions } from '@tanstack/react-query';

// Utils
import apiClient from '../../services/apiClient';

export const useSignup = (
  options?: UseMutationOptions<
    Awaited<ReturnType<typeof apiClient.users.create>>,
    Error,
    Parameters<typeof apiClient.users.create>[0]
  >,
) =>
  useMutation<void, Error, Parameters<typeof apiClient.users.create>[0]>(
    apiClient.users.create,
    options,
  );

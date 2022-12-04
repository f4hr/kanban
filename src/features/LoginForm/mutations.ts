import { useMutation } from '@tanstack/react-query';

import type { UseMutationOptions } from '@tanstack/react-query';

// Hooks
import { useAuth } from '../../hooks';

export const useLogin = (
  options?: UseMutationOptions<void, Error, Parameters<ReturnType<typeof useAuth>['logIn']>[0]>,
) => {
  const { logIn } = useAuth();
  return useMutation<void, Error, Parameters<typeof logIn>[0]>(logIn, options);
};

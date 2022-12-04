import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { useAuth } from '../hooks';

type ApiError = {
  statusCode: number;
  error: string;
  message: string;
};

const statusCodes = {
  UNAUTHORIZED: 401,
};

export function AuthedQueryClientProvider({ children }: React.PropsWithChildren) {
  const { logOut } = useAuth();

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000 * 20,
        retry: (failureCount, err) => {
          const { statusCode } = err as ApiError;

          if (failureCount > 2) return false;
          if (statusCode === statusCodes.UNAUTHORIZED) {
            logOut();
            return false;
          }
          return true;
        },
      },
    },
  });

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}

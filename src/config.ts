import { QueryClientConfig } from '@tanstack/react-query';

export const QUERY_CLIENT_CONFIG: QueryClientConfig = {
  defaultOptions: {
    queries: {
      retry: false,
      retryOnMount: false,
      refetchOnMount: true,
      refetchOnWindowFocus: false,
      useErrorBoundary: true,
    },
  },
};

export const TOTAL_LIMIT = 200;

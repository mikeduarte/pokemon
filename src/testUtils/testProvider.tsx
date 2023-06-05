import { MemoryRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { QUERY_CLIENT_CONFIG } from '../config';
import theme from '../theme';
import SnackbarProvider from '../contexts/SnackbarContext';

type Props = {
  children: React.ReactNode;
};

const TestProvider: React.FC<Props> = ({ children }) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      ...QUERY_CLIENT_CONFIG.defaultOptions,
      queries: {
        ...QUERY_CLIENT_CONFIG.defaultOptions?.queries,
        useErrorBoundary: false,
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <MemoryRouter>
        <ThemeProvider theme={theme}>
          <SnackbarProvider>{children}</SnackbarProvider>
        </ThemeProvider>
      </MemoryRouter>
    </QueryClientProvider>
  );
};

export default TestProvider;

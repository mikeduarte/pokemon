import { MemoryRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { vi } from 'vitest';

import { QUERY_CLIENT_CONFIG } from '../config';
import theme from '../theme';
import SnackbarProvider from '../contexts/SnackbarContext';
import { FavoritesContext } from '../contexts/FavoritesContext';

type Props = {
  children: React.ReactNode;
};

const mockOnFavoritesChange = vi.fn();
const favoritesDefaultValue = {
  1: true,
  2: true,
  3: true,
  4: true,
};

const TestProvider: React.FC<Props> = ({ children }) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      ...QUERY_CLIENT_CONFIG.defaultOptions,
      queries: {
        ...QUERY_CLIENT_CONFIG.defaultOptions?.queries,
        retry: false,
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <MemoryRouter initialEntries={['/']}>
        <ThemeProvider theme={theme}>
          <SnackbarProvider>
            <FavoritesContext.Provider
              value={{
                favorites: { ...favoritesDefaultValue },
                onFavoritesChange: mockOnFavoritesChange,
              }}
            >
              {children}
            </FavoritesContext.Provider>
          </SnackbarProvider>
        </ThemeProvider>
      </MemoryRouter>
    </QueryClientProvider>
  );
};

export default TestProvider;

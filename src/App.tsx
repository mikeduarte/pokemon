import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider } from 'react-router-dom';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ThemeProvider, CssBaseline } from '@mui/material';
import '@fontsource/roboto';

import Router from './router';
import SnackbarProvider from './contexts/SnackbarContext';
import { QUERY_CLIENT_CONFIG } from './config';
import theme from './theme';

const queryClient = new QueryClient({
  ...QUERY_CLIENT_CONFIG,
});

function App() {
  return (
    <SnackbarProvider>
      <ThemeProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          <CssBaseline />
          <RouterProvider router={Router} />
          <ReactQueryDevtools />
        </QueryClientProvider>
      </ThemeProvider>
    </SnackbarProvider>
  );
}

export default App;

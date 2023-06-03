import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider } from 'react-router-dom';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ThemeProvider, CssBaseline, createTheme } from '@mui/material';
import '@fontsource/roboto';

import Router from './router';

const theme = createTheme({
  palette: {
    primary: {
      main: '#0075BE',
    },
    secondary: {
      main: '#0A285F',
    },
    info: {
      main: '#0075BE',
    },
    warning: {
      main: '#D5A100',
    },
  },
});

const queryClient = new QueryClient();

function App() {
  return (
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <CssBaseline />
        <RouterProvider router={Router} />
        <ReactQueryDevtools />
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;

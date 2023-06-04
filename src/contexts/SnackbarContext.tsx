import { SnackbarProvider as NotistackSnackbarProvider } from 'notistack';
import { ReactNode } from 'react';

const SnackbarProvider = ({ children }: { children: ReactNode }) => (
  <NotistackSnackbarProvider
    anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
    autoHideDuration={6000}
    maxSnack={1}
    preventDuplicate
  >
    {children}
  </NotistackSnackbarProvider>
);

export default SnackbarProvider;

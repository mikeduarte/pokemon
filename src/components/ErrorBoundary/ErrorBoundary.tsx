import { ComponentType } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { Link as RouterLink } from 'react-router-dom';
import { AxiosError, isAxiosError } from 'axios';
import { FallbackProps, withErrorBoundary as withErrorBoundaryWrapper } from 'react-error-boundary';
import { Box, Typography, Link, Stack } from '@mui/material';

import { ReactComponent as PokemonBall } from '../../assets/pokemon-ball.svg';

type ErrorBoundaryProps = {
  error?: FallbackProps['error'];
  resetErrorBoundary?: FallbackProps['resetErrorBoundary'];
  is404?: boolean;
};

const is404Error = (error: AxiosError) => error.response?.status === 404;

export const ErrorBoundary = ({ error, resetErrorBoundary, is404 = false }: ErrorBoundaryProps) => {
  const queryClient = useQueryClient();
  const display404Message = is404 || (isAxiosError(error) && is404Error(error as AxiosError));

  const handleLinkClick = () => {
    queryClient.clear();
    resetErrorBoundary?.();
  };

  return (
    <Stack
      data-testid="error-boundary"
      direction="column"
      width="100%"
      sx={{ height: 'calc(100vh - 60px)', margin: 'auto' }}
      justifyContent="center"
      alignItems="center"
      role="alert"
    >
      <Box
        sx={{
          width: '300px',
          lineHeight: 0,
          filter: 'drop-shadow(1px 1px 10px grey) invert(10%)',
        }}
      >
        <PokemonBall />
      </Box>
      <Typography component="h1" variant="h1">
        {display404Message ? '404' : 'Error'}
      </Typography>
      <Typography variant="h6" color="error.dark">
        {display404Message ? "Sorry, we can't find that page!" : 'Something went wrong!'}
      </Typography>
      <Link component={RouterLink} to={`/pokemon`} title="Pokemon home" onClick={handleLinkClick}>
        <Typography color="secondary">Let's try starting at the beginning</Typography>
      </Link>
    </Stack>
  );
};

export const withErrorBoundary = <P,>(
  Component: ComponentType<P>,
  FallbackComponent = ErrorBoundary
) => {
  return withErrorBoundaryWrapper(Component, {
    FallbackComponent: (fallbackProps) => <FallbackComponent {...fallbackProps} />,
  });
};

import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { vi } from 'vitest';

import server from '../../../testUtils/msw/server';
import { errorHandlers } from '../../../testUtils/msw/handlers';
import TestProvider from '../../../testUtils/testProvider';
import FavoriteButton from '../FavoriteButton';

const mockEnqueueSnackbar = vi.fn();
vi.mock('notistack', async () => {
  const mod = (await vi.importActual('notistack')) as any;

  return {
    ...mod,
    useSnackbar: () => {
      return {
        enqueueSnackbar: mockEnqueueSnackbar,
      };
    },
  };
});

const setup = () => {
  return render(<FavoriteButton id="001" isFavorite={false} name="name" />, {
    wrapper: TestProvider,
  });
};

describe('FavoriteButton', () => {
  afterEach(() => {
    server.resetHandlers();
  });

  it('renders add to favorite button when not a favorite', async () => {
    setup();

    expect(screen.getByRole('button', { name: /add/i })).toBeInTheDocument();
  });

  it('renders remove from favorite button when already a favorite', async () => {
    const { rerender } = setup();

    const button = screen.getByRole('button', { name: /add/i });
    fireEvent.click(button);

    await waitFor(() => expect(button).toBeDisabled());

    rerender(<FavoriteButton id="001" isFavorite name="name" />);
    expect(screen.getByRole('button', { name: /remove/i })).toBeInTheDocument();
  });

  it('displays error snackbar when POST fails', async () => {
    setup();

    server.use(...errorHandlers);
    vi.spyOn(console, 'error').mockImplementationOnce(() => 'error');

    const button = screen.getByRole('button', { name: /add/i });
    fireEvent.click(button);

    await waitFor(
      () =>
        expect(mockEnqueueSnackbar).toHaveBeenCalledWith(expect.stringMatching(/error/i), {
          variant: 'error',
        }),
      { timeout: 5000 }
    );
  });
});

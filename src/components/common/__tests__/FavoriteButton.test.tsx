import { fireEvent, render, screen } from '@testing-library/react';

import TestProvider from '../../../testUtils/testProvider';
import FavoriteButton from '../FavoriteButton';

const setup = () => {
  return render(<FavoriteButton id="1" isFavorite={false} name="name" />, {
    wrapper: TestProvider,
  });
};

describe('FavoriteButton', () => {
  it('renders add to favorite button when not a favorite', async () => {
    setup();

    expect(screen.getByRole('button', { name: /add/i })).toBeInTheDocument();
  });

  it('renders remove from favorite button when already a favorite', async () => {
    const { rerender } = setup();

    const button = screen.getByRole('button', { name: /add/i });
    fireEvent.click(button);

    rerender(<FavoriteButton id="1" isFavorite name="name" />);
    expect(screen.getByRole('button', { name: /remove/i })).toBeInTheDocument();
  });
});

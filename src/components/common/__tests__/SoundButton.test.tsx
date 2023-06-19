import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { vi } from 'vitest';

import TestProvider from '../../../testUtils/testProvider';
import SoundButton from '../SoundButton';

const mockMediaPlay = vi.fn();
window.HTMLMediaElement.prototype.play = mockMediaPlay;

const setup = () => {
  render(<SoundButton name="name" sound="/sound.mp3" />, {
    wrapper: TestProvider,
  });
};

describe('SoundButton', () => {
  it('renders', () => {
    setup();

    expect(screen.getByRole('button', { name: /listen to name/i })).toBeInTheDocument();
  });

  it('plays the sound', async () => {
    setup();

    const button = screen.getByRole('button', { name: /listen to name/i });

    fireEvent.click(button);

    await waitFor(() => expect(mockMediaPlay).toHaveBeenCalled());
  });
});

import { screen, render, waitFor, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';

import TestProvider from '../../testUtils/testProvider';
import SearchTextField from '../SearchTextField';

const mockOnChange = vi.fn();

describe('SearchTextField', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('renders', () => {
    render(<SearchTextField label="label" onChange={mockOnChange} debounceTimeout={0} />, {
      wrapper: TestProvider,
    });

    expect(screen.getByRole('textbox', { name: /label/i })).toBeInTheDocument();
  });

  it('onChange fires on typing event', async () => {
    render(<SearchTextField label="label" onChange={mockOnChange} debounceTimeout={0} />, {
      wrapper: TestProvider,
    });

    fireEvent.change(screen.getByRole('textbox', { name: /label/i }), {
      target: { value: 'bul' },
    });

    await waitFor(() => expect(mockOnChange).toHaveBeenCalledWith({ searchTerm: 'bul' }));
  });
});

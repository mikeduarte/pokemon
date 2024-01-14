import { screen, render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';

import TestProvider from '../../testUtils/testProvider';
import TypeSelect from '../TypeSelect';

const mockOnChange = vi.fn();

describe('TypeSelect', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('renders', () => {
    render(<TypeSelect onChange={mockOnChange} />, {
      wrapper: TestProvider,
    });

    expect(screen.findByRole('textbox', { name: /type/i }));
  });

  it('onChange fires on selection', async () => {
    render(<TypeSelect onChange={mockOnChange} />, {
      wrapper: TestProvider,
    });

    const autocomplete = screen.getByLabelText('Type');
    userEvent.click(autocomplete);

    const options = await screen.findAllByRole('option');
    expect(options).toHaveLength(20);

    userEvent.click(screen.getByRole('option', { name: 'grass' }));
    await waitFor(() => expect(mockOnChange).toHaveBeenCalledWith({ selectedType: 'grass' }));
  });
});

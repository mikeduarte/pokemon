import { screen, render, waitFor, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';

import TestProvider from '../../testUtils/testProvider';
import TabViewButtons from '../TabViewButtons';

const mockOnChange = vi.fn();

describe('TabViewButtons', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('renders', () => {
    render(<TabViewButtons tabView="all" onChange={mockOnChange} />, {
      wrapper: TestProvider,
    });

    expect(screen.getByRole('button', { name: /all/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /favorites/i })).toBeInTheDocument();
  });

  it('onChange fires on button click', async () => {
    render(<TabViewButtons tabView="all" onChange={mockOnChange} />, {
      wrapper: TestProvider,
    });

    fireEvent.click(screen.getByRole('button', { name: /favorites/i }));

    await waitFor(() => expect(mockOnChange).toHaveBeenCalledWith({ tabView: 'favorites' }));
  });

  it('onChange does not fire on already selected button click', async () => {
    render(<TabViewButtons tabView="all" onChange={mockOnChange} />, {
      wrapper: TestProvider,
    });

    fireEvent.click(screen.getByRole('button', { name: /all/i }));

    await waitFor(() => expect(mockOnChange).not.toHaveBeenCalled());
  });
});

import { screen, render, waitFor, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';

import TestProvider from '../../testUtils/testProvider';

import LayoutViewButtons from '../LayoutViewButtons';

const mockOnChange = vi.fn();

describe('LayoutViewButtons', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('renders', () => {
    render(<LayoutViewButtons layout="grid" onChange={mockOnChange} />, {
      wrapper: TestProvider,
    });

    expect(screen.getByRole('button', { name: /grid/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /list/i })).toBeInTheDocument();
  });

  it('onChange fires on button click', async () => {
    render(<LayoutViewButtons layout="grid" onChange={mockOnChange} />, {
      wrapper: TestProvider,
    });

    fireEvent.click(screen.getByRole('button', { name: /list/i }));

    await waitFor(() => expect(mockOnChange).toHaveBeenCalledWith({ layout: 'list' }));
  });

  it('onChange does not fire on already selected button click', async () => {
    render(<LayoutViewButtons layout="grid" onChange={mockOnChange} />, {
      wrapper: TestProvider,
    });

    fireEvent.click(screen.getByRole('button', { name: /grid/i }));

    await waitFor(() => expect(mockOnChange).not.toHaveBeenCalled());
  });
});

import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';

import TestProvider from '../../testUtils/testProvider';
import { ErrorBoundary, withErrorBoundary } from './ErrorBoundary';

const runtimeError = new SyntaxError('Whoops!');
const networkError = {
  isAxiosError: true,
  name: '',
  message: 'Request failed with status code 500',
  response: { status: 500, statusText: 'Server Error' },
};
const fourOhFourError = {
  isAxiosError: true,
  name: '',
  message: 'Request failed with status code 404',
  response: { status: 404, statusText: '' },
};

beforeEach(() => {
  vi.spyOn(console, 'error').mockImplementation(() => '');
});

afterEach(() => {
  vi.clearAllMocks();
});

describe('ErrorBoundary', () => {
  it('renders with runtime error', async () => {
    render(<ErrorBoundary error={runtimeError} />, {
      wrapper: TestProvider,
    });

    expect(screen.getByTestId('error-boundary')).toBeInTheDocument();
    expect(screen.getByText(/error/i)).toBeInTheDocument();
    expect(screen.getByText(/let's try starting at the beginning/i)).toBeInTheDocument();
  });

  it('renders with network error', async () => {
    render(<ErrorBoundary error={networkError} />, {
      wrapper: TestProvider,
    });

    expect(screen.getByTestId('error-boundary')).toBeInTheDocument();
    expect(screen.getByText(/error/i)).toBeInTheDocument();
    expect(screen.getByText(/something went wrong!/i)).toBeInTheDocument();
  });

  it('renders with 404 error', async () => {
    render(<ErrorBoundary error={fourOhFourError} />, {
      wrapper: TestProvider,
    });

    expect(screen.getByTestId('error-boundary')).toBeInTheDocument();
    expect(screen.getByText(/404/i)).toBeInTheDocument();
    expect(screen.getByText(/sorry, we can't find that page!/i)).toBeInTheDocument();
  });
});

describe('withErrorBoundary', () => {
  it('renders the wrapped component', () => {
    const WrappedComponent = withErrorBoundary(() => {
      return <div>component</div>;
    });

    render(<WrappedComponent />, { wrapper: TestProvider });
    expect(screen.getByText('component')).toBeInTheDocument();
    expect(screen.queryByTestId('error-boundary')).not.toBeInTheDocument();
  });

  it('renders error boundary fallback component when there is an error', () => {
    const WrappedComponent = withErrorBoundary(() => {
      throw new Error();

      return <div>component</div>;
    });

    render(<WrappedComponent />, { wrapper: TestProvider });
    expect(screen.getByTestId('error-boundary')).toBeInTheDocument();
    expect(screen.queryByText('component')).not.toBeInTheDocument();
  });
});

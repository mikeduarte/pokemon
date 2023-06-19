import { screen, render } from '@testing-library/react';

import TestProvider from '../../testUtils/testProvider';
import ListCardSkeleton from '../ListCardSkeleton';

describe('ListCardSkeleton', () => {
  it('renders vertical card skeleton', () => {
    render(<ListCardSkeleton count={2} isGridView />, {
      wrapper: TestProvider,
    });

    expect(screen.getAllByTestId('vertical-card-skeleton')).toHaveLength(2);
  });

  it('renders vertical card skeleton', () => {
    render(<ListCardSkeleton count={3} isGridView={false} />, {
      wrapper: TestProvider,
    });

    expect(screen.getAllByTestId('horizontal-card-skeleton')).toHaveLength(3);
  });
});

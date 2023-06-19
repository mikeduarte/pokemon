import { screen, render } from '@testing-library/react';

import TestProvider from '../../testUtils/testProvider';
import HorizontalCardSkeleton from '../HorizontalCardSkeleton';

describe('HorizontalCardSkeleton', () => {
  it('renders', () => {
    render(<HorizontalCardSkeleton count={3} />, {
      wrapper: TestProvider,
    });

    expect(screen.getAllByTestId('horizontal-card-skeleton')).toHaveLength(3);
  });
});

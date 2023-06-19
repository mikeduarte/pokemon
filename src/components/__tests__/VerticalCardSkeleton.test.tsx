import { screen, render } from '@testing-library/react';

import TestProvider from '../../testUtils/testProvider';
import VerticalCardSkeleton from '../VerticalCardSkeleton';

describe('VerticalCardSkeleton', () => {
  it('renders', () => {
    render(<VerticalCardSkeleton count={2} />, {
      wrapper: TestProvider,
    });

    expect(screen.getAllByTestId('vertical-card-skeleton')).toHaveLength(2);
  });
});

import { screen, render } from '@testing-library/react';

import TestProvider from '../../testUtils/testProvider';
import GridCardPlaceholder from '../GridCardPlaceholder';

describe('GridCardPlaceholder', () => {
  it('renders', () => {
    render(<GridCardPlaceholder count={2} />, {
      wrapper: TestProvider,
    });

    expect(screen.getAllByTestId('grid-card-placeholder')).toHaveLength(2);
  });
});

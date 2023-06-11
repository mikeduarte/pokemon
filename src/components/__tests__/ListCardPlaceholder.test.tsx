import { screen, render } from '@testing-library/react';

import TestProvider from '../../testUtils/testProvider';
import ListCardPlaceholder from '../ListCardPlaceholder';

describe('GridCardPlaceholder', () => {
  it('renders', () => {
    render(<ListCardPlaceholder count={3} />, {
      wrapper: TestProvider,
    });

    expect(screen.getAllByTestId('list-card-placeholder')).toHaveLength(3);
  });
});

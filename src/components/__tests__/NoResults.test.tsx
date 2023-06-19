import { screen, render } from '@testing-library/react';

import TestProvider from '../../testUtils/testProvider';
import NoResults from '../NoResults';

describe('NoResults', () => {
  it('renders', () => {
    render(<NoResults />, {
      wrapper: TestProvider,
    });

    expect(screen.getByTestId('no-results')).toBeInTheDocument();
    expect(screen.getByText('No Pokemon match that criteria.')).toBeInTheDocument();
  });
});

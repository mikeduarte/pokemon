import { screen, render } from '@testing-library/react';
import { vi } from 'vitest';

import TestProvider from '../../testUtils/testProvider';
import { FiltersContext } from '../../contexts/FiltersContext';
import { Filters } from '../types/Filters';
import FilterBar from '../FilterBar';

const mockOnFilterChange = vi.fn();
const defaultValue: Filters = {
  layout: 'grid',
  searchTerm: '',
  selectedType: '',
  tabView: 'all',
};

const setup = (value = defaultValue) => {
  return render(
    <FiltersContext.Provider value={{ filters: { ...value }, onFilterChange: mockOnFilterChange }}>
      <FilterBar />
    </FiltersContext.Provider>,
    {
      wrapper: TestProvider,
    }
  );
};

describe('FilterBar', () => {
  it('renders', () => {
    setup();

    expect(screen.getByTestId('search-text-field-Search'));
    expect(screen.getByTestId('layout-view-buttons'));
    expect(screen.getByTestId('tab-view-buttons'));
    expect(screen.getByTestId('type-select'));
  });
});

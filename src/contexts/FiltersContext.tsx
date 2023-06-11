import { createContext, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { Filters } from '../components/types/Filters';

const defaultFilters: Filters = {
  layout: 'grid',
  searchTerm: '',
  selectedType: '',
  tabView: 'all',
};

const FiltersContext = createContext({} as ReturnType<typeof useFilters>);

function useFilters() {
  const queryClient = useQueryClient();
  const [filters, setFilters] = useState({ ...defaultFilters });

  const clearQueries = () => {
    queryClient.removeQueries({ queryKey: ['pokemon'], exact: true });
  };

  const onFilterChange = (filter: Partial<Filters>) => {
    clearQueries();
    setFilters((currentState) => {
      return {
        ...currentState,
        ...filter,
      };
    });
  };

  return {
    filters,
    onFilterChange,
  };
}

export { FiltersContext, useFilters };

import { useContext } from 'react';
import { Paper, Stack } from '@mui/material';

import TabViewButtons from './TabViewButtons';
import SearchTextField from './SearchTextField';
import TypeSelect from './TypeSelect';
import LayoutViewButtons from './LayoutViewButtons';
import { FiltersContext } from '../contexts/FiltersContext';

const FilterBar = () => {
  const { filters, onFilterChange } = useContext(FiltersContext);

  return (
    <Paper
      square
      elevation={0}
      sx={{
        position: 'sticky',
        top: 0,
        p: 2,
        boxShadow: (theme) => theme.shadows[1],
        zIndex: (theme) => theme.zIndex.appBar,
      }}
    >
      <Stack spacing={2} maxWidth="lg" margin="auto">
        <TabViewButtons tabView={filters.tabView} onChange={onFilterChange} />
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <Stack direction="row" width="100%" spacing={{ xs: 1, sm: 2 }}>
            <SearchTextField
              debounceTimeout={500}
              onChange={onFilterChange}
              label="Search"
              placeholder="Search"
              size="small"
            />
            <Stack width="17rem">
              <TypeSelect onChange={onFilterChange} />
            </Stack>
          </Stack>
          <Stack sx={{ alignSelf: 'flex-end' }}>
            <LayoutViewButtons layout={filters.layout} onChange={onFilterChange} />
          </Stack>
        </Stack>
      </Stack>
    </Paper>
  );
};

export default FilterBar;

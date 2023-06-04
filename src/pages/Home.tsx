import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { DebounceInput } from 'react-debounce-input';
import {
  Autocomplete,
  Paper,
  Stack,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Container,
  InputAdornment,
} from '@mui/material';
import ViewListIcon from '@mui/icons-material/ViewList';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import SearchIcon from '@mui/icons-material/Search';
import PokemonList from '../components/PokemonList';
import { useGetPokemonTypes } from '../api/hooks';
import { PokemonTypes } from '../types/PokemonTypes';
import { TabViewTypes } from '../types/TabViewTypes';
import { LayoutTypes } from '../types/LayoutTypes';
import { withErrorBoundary } from '../components/ErrorBoundary/ErrorBoundary';

const Home = () => {
  const [tabView, setTabView] = useState<TabViewTypes>('all');
  const [layout, setLayout] = useState<LayoutTypes>('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<PokemonTypes | ''>('');
  const queryClient = useQueryClient();
  const { data, isLoading, isError } = useGetPokemonTypes();

  const pokemonTypes = data?.map((type) => {
    return {
      value: type,
      label: type,
    };
  });

  const clearQueries = () => {
    queryClient.removeQueries({ queryKey: ['pokemon'], exact: true });
  };

  const handleTabViewChange = (value: TabViewTypes) => {
    clearQueries();
    setTabView(value);
  };

  const handleTypeChange = (value: PokemonTypes | '') => {
    clearQueries();
    setSelectedType(value);
  };

  const handleSearchTermChange = (value: string) => {
    clearQueries();
    setSearchTerm(value);
  };

  const handleLayoutChange = (value: LayoutTypes) => {
    clearQueries();
    setLayout(value);
  };

  return (
    <>
      <Paper
        square
        elevation={0}
        sx={{
          position: 'sticky',
          top: 0,
          p: 2,
          boxShadow: (theme) => theme.shadows[2],
          zIndex: (theme) => theme.zIndex.appBar,
        }}
      >
        <Stack spacing={2} maxWidth="lg" margin="auto">
          <Stack>
            <ToggleButtonGroup
              size="small"
              color="primary"
              value={tabView}
              exclusive
              fullWidth
              onChange={(_event, value) => handleTabViewChange(value)}
              aria-label="Tab View"
            >
              <ToggleButton value="all" sx={{ fontWeight: 'bold' }}>
                All
              </ToggleButton>
              <ToggleButton value="favorites" sx={{ fontWeight: 'bold' }}>
                Favorites
              </ToggleButton>
            </ToggleButtonGroup>
          </Stack>
          <Stack
            direction={{
              xs: 'column',
              sm: 'row',
            }}
            spacing={2}
          >
            <Stack
              direction="row"
              spacing={{
                xs: 1,
                sm: 2,
              }}
              width="100%"
            >
              <DebounceInput
                size="small"
                element={TextField}
                debounceTimeout={500}
                onChange={(event) => handleSearchTermChange(event.target.value)}
                sx={{ width: '100%' }}
                placeholder="Search"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
              />
              <Autocomplete
                size="small"
                disablePortal
                id="combo-box-demo"
                options={pokemonTypes ?? []}
                sx={{ width: '17rem' }}
                loading={isLoading || isError}
                loadingText={isError ? 'Error...' : 'Loading...'}
                value={{
                  label: selectedType,
                  value: selectedType,
                }}
                onChange={(_event, option) => handleTypeChange(option?.value ?? '')}
                renderInput={(params) => <TextField {...params} label="Type" />}
              />
            </Stack>
            <ToggleButtonGroup
              size="small"
              color="primary"
              value={layout}
              exclusive
              onChange={(_event, value) => handleLayoutChange(value)}
              aria-label="Layout View"
              sx={{
                alignSelf: 'flex-end',
              }}
            >
              <ToggleButton value="grid" aria-label="Grid View">
                <ViewModuleIcon />
              </ToggleButton>
              <ToggleButton value="list" aria-label="List View">
                <ViewListIcon />
              </ToggleButton>
            </ToggleButtonGroup>
          </Stack>
        </Stack>
      </Paper>
      <Container disableGutters>
        <PokemonList
          tabView={tabView}
          searchTerm={searchTerm}
          selectedType={selectedType}
          layout={layout}
        />
      </Container>
      <Outlet />
    </>
  );
};

export default withErrorBoundary(Home);

import { useContext, useMemo } from 'react';
import { useInView } from 'react-intersection-observer';
import { Box, Grid } from '@mui/material';

import { useGetAllPokemon, useGetPokemonPageable } from '../api/hooks';
import { FiltersContext } from '../contexts/FiltersContext';
import PokemonLoader from './common/PokemonLoader';
import ListCard from './ListCard';
import ListCardSkeleton from './ListCardSkeleton';
import NoResults from './NoResults';
import useFilteredList from '../hooks/useFilteredList';

const PokemonList = () => {
  const { filters } = useContext(FiltersContext);
  const { layout, searchTerm, selectedType, tabView } = filters;
  const isGridView = layout === 'grid';
  const isFavoriteView = tabView !== 'all';

  const { data: allPokemon, isLoading: isAllPokemonLoading } = useGetAllPokemon();
  const {
    data: unfilteredList,
    isLoading: isPageableLoading,
    fetchNextPage,
    hasNextPage,
  } = useGetPokemonPageable(16);
  const {
    filteredList,
    hasFilters,
    isFetching: isFiltersLoading,
    isError,
  } = useFilteredList(unfilteredList, allPokemon, selectedType, searchTerm, isFavoriteView);

  const isLoading = isPageableLoading || isAllPokemonLoading || isFiltersLoading;

  const inViewOptions = useMemo(
    () => ({
      initialInView: false,
      delay: 100,
      onChange: (inview: boolean) => {
        if (inview) fetchNextPage();
      },
    }),
    [fetchNextPage]
  );

  const [observerRef] = useInView(inViewOptions);
  const [endObserverRef] = useInView(inViewOptions);

  if (isError) throw new Error();

  return (
    <>
      {isLoading && <PokemonLoader />}
      {!isLoading && !filteredList?.pages[0].data.pokemons.results.length && <NoResults />}
      <Grid
        data-testid="pokemon-list"
        component="ul"
        container
        spacing={2}
        p={{ xs: 2, md: 4 }}
        sx={{ listStyle: 'none' }}
      >
        {!isLoading &&
          filteredList?.pages?.map((page) => {
            return page.data.pokemons.results.map((pokemon, index) => {
              return (
                <ListCard
                  id={pokemon.id}
                  image={pokemon.artwork}
                  isGridView={isGridView}
                  name={pokemon.name}
                  key={pokemon.id}
                  ref={index === page.data.pokemons.results.length - 5 ? observerRef : undefined}
                />
              );
            });
          })}
        {hasNextPage && !hasFilters && <ListCardSkeleton isGridView={isGridView} count={24} />}
      </Grid>
      {hasNextPage && !hasFilters && (
        <Box ref={endObserverRef} sx={{ height: '100vh', mt: '-100vh' }}></Box>
      )}
    </>
  );
};

export default PokemonList;

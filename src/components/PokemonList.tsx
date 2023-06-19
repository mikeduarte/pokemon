import { useContext } from 'react';
import { useInView } from 'react-intersection-observer';
import { Grid } from '@mui/material';

import { useGetPokemonPageable } from '../api/hooks';
import { FiltersContext } from '../contexts/FiltersContext';
import PokemonLoader from './common/PokemonLoader';
import ListCard from './ListCard';
import GridCardPlaceholder from './GridCardPlaceholder';
import ListCardPlaceholder from './ListCardPlaceholder';
import NoResults from './NoResults';

const PokemonList = () => {
  const { filters } = useContext(FiltersContext);
  const { layout, searchTerm, selectedType, tabView } = filters;
  const isGridView = layout === 'grid';
  const isFavoriteView = tabView !== 'all';
  const isFiltering = Boolean(searchTerm) || Boolean(selectedType) || isFavoriteView;

  const { data, isLoading, fetchNextPage, hasNextPage } = useGetPokemonPageable({
    limit: 16,
    type: selectedType,
    search: searchTerm,
    isFavorite: isFavoriteView,
  });

  const { ref } = useInView({
    initialInView: false,
    delay: 100,
    onChange: (inview) => {
      if (inview) fetchNextPage();
    },
  });

  return (
    <>
      {isLoading && <PokemonLoader />}
      {!isLoading && !data?.pages?.[0]?.items.length && <NoResults />}
      <Grid
        data-testid="pokemon-list"
        component="ul"
        container
        spacing={2}
        p={{ xs: 2, md: 4 }}
        sx={{ listStyle: 'none' }}
      >
        {!isLoading &&
          data?.pages &&
          data?.pages?.map((page) => {
            return page.items?.map((pokemon, index) => {
              if (isFavoriteView && !pokemon.isFavorite) return null;

              return (
                <ListCard
                  id={pokemon.id}
                  image={pokemon.image}
                  isFavorite={pokemon.isFavorite}
                  isGridView={isGridView}
                  name={pokemon.name}
                  types={pokemon.types}
                  isFiltering={isFiltering}
                  key={pokemon.id}
                  ref={index === page.items.length - 5 ? ref : undefined}
                />
              );
            });
          })}
        {hasNextPage &&
          (isGridView ? <GridCardPlaceholder count={24} /> : <ListCardPlaceholder count={24} />)}
      </Grid>
    </>
  );
};

export default PokemonList;

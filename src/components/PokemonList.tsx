import { useInView } from 'react-intersection-observer';
import { Grid } from '@mui/material';

import { useGetPokemonPageable } from '../api/hooks';
import PokemonLoader from './common/PokemonLoader';
import GridCardPlaceholder from './GridCardPlaceholder';
import ListCardPlaceholder from './ListCardPlaceholder';
import GridCard from './GridCard';
import ListCard from './ListCard';
import { PokemonTypes } from '../types/PokemonTypes';
import { TabViewTypes } from '../types/TabViewTypes';
import { LayoutTypes } from '../types/LayoutTypes';

type PokemonListProps = {
  tabView: TabViewTypes;
  searchTerm: string;
  selectedType: PokemonTypes | '';
  layout: LayoutTypes;
};

const PokemonList = ({ tabView, searchTerm, selectedType, layout }: PokemonListProps) => {
  const isFavoriteView = tabView !== 'all';
  const isFiltering = Boolean(searchTerm) || Boolean(selectedType) || isFavoriteView;

  const { data, isLoading, isFetchingNextPage, fetchNextPage, hasNextPage } = useGetPokemonPageable(
    {
      limit: 16,
      type: selectedType,
      search: searchTerm,
      isFavorite: isFavoriteView,
    }
  );

  const { ref } = useInView({
    initialInView: false,
    delay: 100,
    onChange: (inview) => {
      if (inview) fetchNextPage();
    },
  });

  return (
    <>
      <Grid
        component="ul"
        container
        spacing={2}
        p={{
          xs: 2,
          md: 4,
        }}
        sx={{
          listStyle: 'none',
        }}
      >
        {isLoading && <PokemonLoader />}
        {!isLoading &&
          data?.pages &&
          data?.pages?.map((page) => {
            return page.items?.map((pokemon, index) => {
              if (isFavoriteView && !pokemon.isFavorite) return null;

              if (layout === 'grid') {
                return (
                  <GridCard
                    id={pokemon.id}
                    image={pokemon.image}
                    isFavorite={pokemon.isFavorite}
                    name={pokemon.name}
                    types={pokemon.types}
                    isFiltering={isFiltering}
                    key={pokemon.id}
                    ref={index === page.items.length - 5 ? ref : undefined}
                  />
                );
              }

              return (
                <ListCard
                  id={pokemon.id}
                  image={pokemon.image}
                  isFavorite={pokemon.isFavorite}
                  name={pokemon.name}
                  types={pokemon.types}
                  isFiltering={isFiltering}
                  key={pokemon.id}
                  ref={index === page.items.length - 7 ? ref : undefined}
                />
              );
            });
          })}
        {isFetchingNextPage &&
          hasNextPage &&
          (layout === 'list' ? (
            <ListCardPlaceholder count={24} />
          ) : (
            <GridCardPlaceholder count={24} />
          ))}
      </Grid>
    </>
  );
};

export default PokemonList;

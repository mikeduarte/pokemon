import { useInView } from 'react-intersection-observer';
import { Grid } from '@mui/material';
import { useGetPokemonPageable } from '../api/hooks';
import LoadingPlaceholder from './LoadingPlaceholder';
import { LayoutTypes, TabViewTypes } from '../pages/Home';

import PokemonLoader from './common/PokemonLoader';
import GridLayout from './GridLayout';
import ListLayout from './ListLayout';
import HorizontalLoadingPlaceholder from './HorizontalLoadingPlaceholder';

export interface Pokemon extends PokemonPreview {
  weight: {
    minimum: string;
    maximum: string;
  };
  height: {
    minimum: string;
    maximum: string;
  };
  evolutions: PokemonPreview[];
  maxCP: number;
  maxHP: number;
  previousEvolutions: PokemonPreview[];
  image: string;
  sound: string;
}

export interface PokemonPreview {
  id: string;
  name: string;
  number: number;
  image: string;
  isFavorite: boolean;
  types: string[];
}

export interface PokemonPageable {
  limit: number;
  offset: number;
  count: number;
  items: PokemonPreview[];
}

export type PokemonTypes =
  | 'Grass'
  | 'Poison'
  | 'Fire'
  | 'Flying'
  | 'Water'
  | 'Bug'
  | 'Normal'
  | 'Electric'
  | 'Ground'
  | 'Fairy'
  | 'Fighting'
  | 'Psychic'
  | 'Rock'
  | 'Steel'
  | 'Ice'
  | 'Ghost'
  | 'Dragon';

interface PokemonListProps {
  tabView: TabViewTypes;
  searchTerm: string;
  selectedType: PokemonTypes | '';
  layout: LayoutTypes;
}

const PokemonList = ({ tabView, searchTerm, selectedType, layout }: PokemonListProps) => {
  const isFavoriteView = tabView !== 'all';
  const isFiltering = Boolean(searchTerm) || Boolean(selectedType) || isFavoriteView;

  const { data, isLoading, isFetchingNextPage, fetchNextPage, hasNextPage } = useGetPokemonPageable(
    {
      limit: 12,
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
        container
        spacing={2}
        p={{
          xs: 2,
          md: 4,
        }}
      >
        {isLoading && <PokemonLoader />}
        {!isLoading &&
          data?.pages &&
          data?.pages?.map((page) => {
            return page.items?.map((pokemon) => {
              if (isFavoriteView && !pokemon.isFavorite) return null;

              if (layout === 'grid') {
                return <GridLayout pokemon={pokemon} isFiltering={isFiltering} key={pokemon.id} />;
              }

              return <ListLayout pokemon={pokemon} isFiltering={isFiltering} key={pokemon.id} />;
            });
          })}
        {isFetchingNextPage &&
          hasNextPage &&
          (layout === 'list' ? (
            <HorizontalLoadingPlaceholder count={12} />
          ) : (
            <LoadingPlaceholder count={12} />
          ))}

        {!isLoading && hasNextPage && <Grid item xs={12} ref={ref} sx={{ mt: '-300px' }}></Grid>}
      </Grid>
    </>
  );
};

export default PokemonList;

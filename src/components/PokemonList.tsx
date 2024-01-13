import { useContext, useMemo } from 'react';
import { useInView } from 'react-intersection-observer';
import { Box, Grid } from '@mui/material';
import { InfiniteData } from '@tanstack/react-query';

import { useGetAllPokemon, useGetPokemonPageable, useGetPokemonTypeByName } from '../api/hooks';
import { FiltersContext } from '../contexts/FiltersContext';
import PokemonLoader from './common/PokemonLoader';
import ListCard from './ListCard';
import ListCardSkeleton from './ListCardSkeleton';
import NoResults from './NoResults';
import { PokemonPageable } from '../types/PokemonPageable';

import { PokemonTypes } from '../types/PokemonTypes';

const useFilteredList = (
  unfilteredList: InfiniteData<PokemonPageable> | undefined,
  allPokemon: InfiniteData<PokemonPageable> | undefined,
  selectedType: PokemonTypes | '',
  search: string
  //isFavorite: boolean
) => {
  const filteredList: InfiniteData<PokemonPageable> = {
    pageParams: [],
    pages: [
      {
        data: {
          pokemons: {
            results: [],
          },
        },
      },
    ],
  };

  let hasFilters = false;
  const { data: pokemonTypeByName, isFetching, isError } = useGetPokemonTypeByName(selectedType);

  if (allPokemon?.pages) {
    let filteredResults = [...allPokemon.pages[0].data.pokemons.results];

    if (search?.length > 2) {
      hasFilters = true;
      const filteredResultsBySearch = filteredResults.filter((pokemon) =>
        pokemon.name.includes(search.toLocaleLowerCase())
      );

      filteredResults = filteredResultsBySearch;
      hasFilters = true;
    }

    if (pokemonTypeByName?.pokemon) {
      const pokemonNames = pokemonTypeByName.pokemon.map((pokemon) => pokemon.pokemon.name);

      const filteredResultsByType = filteredResults.filter((pokemon) =>
        pokemonNames.includes(pokemon.name)
      );

      filteredResults = filteredResultsByType;
      hasFilters = true;
    }

    filteredList.pages[0].data.pokemons.results.push(...filteredResults);
  }

  return {
    isFetching,
    filteredList: hasFilters ? filteredList : unfilteredList,
    hasFilters,
    isError,
  };
};

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
  } = useFilteredList(unfilteredList, allPokemon, selectedType, searchTerm /*isFavoriteView*/);

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
              if (isFavoriteView && !pokemon.isFavorite) return null;

              return (
                <ListCard
                  id={pokemon.id}
                  image={pokemon.artwork}
                  isFavorite={pokemon.isFavorite}
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

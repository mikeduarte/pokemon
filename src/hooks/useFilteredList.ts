import { useContext, useMemo } from 'react';
import { InfiniteData } from '@tanstack/react-query';

import { PokemonPageable } from '../types/PokemonPageable';
import { PokemonTypes } from '../types/PokemonTypes';
import { FavoritesContext } from '../contexts/FavoritesContext';
import { useGetPokemonTypeByName } from '../api/hooks';
import { PokemonPreview } from '../types/Pokemon';

const useFilteredList = (
  unfilteredList: InfiniteData<PokemonPageable> | undefined,
  allPokemon: InfiniteData<PokemonPageable> | undefined,
  selectedType: PokemonTypes | '',
  search: string,
  isFavoriteView: boolean
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
  const { favorites } = useContext(FavoritesContext);
  const { data: pokemonTypeByName, isFetching, isError } = useGetPokemonTypeByName(selectedType);

  const filteredData = useMemo(() => {
    let hasFilters = false;
    let filteredResults: PokemonPreview[] = [];

    if (allPokemon?.pages) {
      filteredResults = [...allPokemon.pages[0].data.pokemons.results];

      if (isFavoriteView) {
        filteredResults = filteredResults.filter((pokemon) => {
          return favorites[pokemon.id];
        });
        hasFilters = true;
      }

      if (search) {
        filteredResults = filteredResults.filter((pokemon) =>
          pokemon.name.includes(search.toLocaleLowerCase())
        );
        hasFilters = true;
      }

      if (pokemonTypeByName?.pokemon) {
        const pokemonNames = pokemonTypeByName.pokemon.map((pokemon) => pokemon.pokemon.name);
        filteredResults = filteredResults.filter((pokemon) => pokemonNames.includes(pokemon.name));
        hasFilters = true;
      }
    }

    return {
      hasFilters,
      filteredResults,
    };
  }, [allPokemon, isFavoriteView, search, pokemonTypeByName, favorites]);

  if (filteredData.hasFilters) {
    filteredList.pages[0].data.pokemons.results.push(...filteredData.filteredResults);
  }

  return {
    isFetching,
    filteredList: filteredData.hasFilters ? filteredList : unfilteredList,
    hasFilters: filteredData.hasFilters,
    isError,
  };
};

export default useFilteredList;

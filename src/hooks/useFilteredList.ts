import { useContext } from 'react';
import { InfiniteData } from '@tanstack/react-query';

import { PokemonPageable } from '../types/PokemonPageable';
import { PokemonTypes } from '../types/PokemonTypes';
import { FavoritesContext } from '../contexts/FavoritesContext';
import { useGetPokemonTypeByName } from '../api/hooks';

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
  let hasFilters = false;

  if (allPokemon?.pages) {
    let filteredResults = [...allPokemon.pages[0].data.pokemons.results];

    if (isFavoriteView) {
      const filteredResultsByFavorites = filteredResults.filter((pokemon) => {
        return favorites[pokemon.id];
      });

      filteredResults = filteredResultsByFavorites;
      hasFilters = true;
    }

    if (search) {
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

export default useFilteredList;

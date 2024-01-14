import { AxiosError } from 'axios';
import { useQuery, useInfiniteQuery } from '@tanstack/react-query';
import { get, post } from './Axios';
import { Pokemon } from '../types/Pokemon';
import { PokemonPageable } from '../types/PokemonPageable';
import { PokemonType, PokemonTypesPageable } from '../types/PokemonTypes';
import { TOTAL_LIMIT } from '../config';

const GRAPH_QL_BASE_URL = 'https://graphql-pokeapi.graphcdn.app/';
const BASE_URL = 'https://pokeapi.co/api/v2/';

const gqlQuery = `query pokemons($limit: Int, $offset: Int) {
  pokemons(limit: $limit, offset: $offset) {
    count
    next
    previous
    status
    message
    results {
      id
      name
      artwork
    }
  }
}`;

export const useGetPokemonPageable = (limit: number) => {
  const request = ({ pageParam = 0 }): Promise<PokemonPageable> => {
    return post(`${GRAPH_QL_BASE_URL}`, {
      query: gqlQuery,
      variables: {
        limit: limit,
        offset: pageParam,
      },
    });
  };

  return useInfiniteQuery<PokemonPageable, AxiosError>(['pokemon'], request, {
    cacheTime: Infinity,
    staleTime: Infinity,
    getNextPageParam: (page) => {
      const params = new URLSearchParams(page.data.pokemons.next?.split('?')[1]);

      const nextOffset = Number(params.get('offset')) ?? 0;

      if (nextOffset >= TOTAL_LIMIT) return undefined;

      return nextOffset;
    },
  });
};

export const useGetAllPokemon = () => {
  const request = (): Promise<PokemonPageable> => {
    return post(`${GRAPH_QL_BASE_URL}`, {
      query: gqlQuery,
      variables: {
        limit: TOTAL_LIMIT,
        offset: 0,
      },
    });
  };

  return useInfiniteQuery<PokemonPageable, AxiosError>(['all-pokemon'], request, {
    cacheTime: Infinity,
    staleTime: Infinity,
  });
};

export const useGetPokemon = (id: Pokemon['id'] | null) => {
  const request = (): Promise<Pokemon> => get(`${BASE_URL}pokemon/${id}`);

  return useQuery<Pokemon, AxiosError>(['pokemon', id], request, {
    enabled: Boolean(id),
  });
};

export const useGetPokemonTypeByName = (name: PokemonType['name'] | '') => {
  const request = (): Promise<PokemonType> => get(`${BASE_URL}type/${name}`);

  return useQuery<PokemonType, AxiosError>(['pokemon-type', name], request, {
    cacheTime: Infinity,
    staleTime: Infinity,
    useErrorBoundary: false,
    enabled: Boolean(name),
  });
};

export const useGetPokemonTypes = () => {
  const request = (): Promise<PokemonTypesPageable> => get(`${BASE_URL}type/`);

  return useQuery<PokemonTypesPageable, AxiosError>(['pokemon-types'], request, {
    cacheTime: Infinity,
    staleTime: Infinity,
    useErrorBoundary: false,
  });
};

import { AxiosError } from 'axios';
import {
  useQuery,
  useInfiniteQuery,
  useMutation,
  useQueryClient,
  InfiniteData,
} from '@tanstack/react-query';
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

/**
 * @deprecated The method should not be used. This uses legacy APIs.
 * // @ts-ignore below is used because funciton is deprecated
 */
export const usePostPokemonFavorite = () => {
  const queryClient = useQueryClient();
  const request = (id: Pokemon['id'], isFavorite: Pokemon['isFavorite']): Promise<Pokemon> =>
    post(`${BASE_URL}pokemon/${id}/${isFavorite ? '' : 'un'}favorite`, null);

  return useMutation(
    ({ id, isFavorite }: { id: Pokemon['id']; isFavorite: Pokemon['isFavorite'] }) =>
      request(id, isFavorite),
    {
      onSuccess: (_data, variables) => {
        const cachedPokemonPageable = queryClient.getQueryData<InfiniteData<PokemonPageable>>([
          'pokemon',
        ]);
        const cachedPokemon = queryClient.getQueryData<Pokemon>(['pokemon', variables.id]);
        const updatedData = {
          ...cachedPokemonPageable,
          pages: cachedPokemonPageable?.pages.map((page) => {
            return {
              ...page,
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              items: page.items.map((pokemon) => {
                if (pokemon.id === variables.id) {
                  return {
                    ...pokemon,
                    isFavorite: variables.isFavorite,
                  };
                }

                return { ...pokemon };
              }),
            };
          }),
        };

        if (cachedPokemonPageable) {
          queryClient.setQueryData(['pokemon'], {
            ...updatedData,
          });
        }

        if (cachedPokemon) {
          queryClient.setQueryData(['pokemon', variables.id], {
            ...cachedPokemon,
            isFavorite: variables.isFavorite,
          });
        }

        queryClient.refetchQueries({ queryKey: ['pokemon'], exact: true });
      },
    }
  );
};

export const useGetPokemonTypes = () => {
  const request = (): Promise<PokemonTypesPageable> => get(`${BASE_URL}type/`);

  return useQuery<PokemonTypesPageable, AxiosError>(['pokemon-types'], request, {
    cacheTime: Infinity,
    staleTime: Infinity,
    useErrorBoundary: false,
  });
};

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
import { PokemonTypesPageable } from '../types/PokemonTypes';

const TOTAL_LIMIT = 300;
const BASE_URL = 'https://graphql-pokeapi.graphcdn.app/';

const gqlQuery = `query pokemons($limit: Int, $offset: Int) {
  pokemons(limit: $limit, offset: $offset) {
    count
    next
    previous
    status
    message
    results {
      url
      name
      artwork
    }
  }
}`;

export const useGetPokemonPageable = ({
  limit = 19,
  // type = '',
  // search = '',
  // isFavorite = false,
}) => {
  const request = ({ pageParam = 0 }): Promise<PokemonPageable> => {
    return post(`${BASE_URL}`, {
      query: gqlQuery,
      variables: {
        limit: limit,
        offset: pageParam,
      },
      //limit: limit,
      //offset: pageParam,
      //type: type,
      ///search: search,
      //...(isFavorite && { isFavorite: true }),
    });
  };

  return useInfiniteQuery<PokemonPageable, AxiosError>(['pokemon'], request, {
    cacheTime: Infinity,
    staleTime: Infinity,
    getNextPageParam: (page) => {
      const params = new URLSearchParams(page.data.pokemons.next?.split('?')[1]);

      const lastPage = {
        count: page.data.pokemons.count,
        limit: Number(params.get('limit')) ?? 0,
        offset: Number(params.get('offset')) ?? 0,
      };

      if (lastPage.offset >= TOTAL_LIMIT) return undefined;

      const pagesLeft =
        lastPage.count <= lastPage.limit || lastPage.count === lastPage.offset + lastPage.limit
          ? 0
          : Math.floor((lastPage.count - lastPage.offset) / lastPage.limit);
      if (pagesLeft <= 0) return undefined;

      return lastPage.offset + lastPage.limit ?? 0;
    },
  });
};

export const useGetPokemon = (id: Pokemon['id'] | null) => {
  const request = (): Promise<Pokemon> => get(`${BASE_URL}pokemon/${id}`);

  return useQuery<Pokemon, AxiosError>(['pokemon', id], request, {
    enabled: Boolean(id),
  });
};

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
  const request = (): Promise<PokemonTypesPageable> => get('https://pokeapi.co/api/v2/type/');

  return useQuery<PokemonTypesPageable, AxiosError>(['pokemon', 'types'], request, {
    cacheTime: Infinity,
    staleTime: Infinity,
    useErrorBoundary: false,
  });
};

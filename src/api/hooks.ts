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
import { PokemonTypes } from '../types/PokemonTypes';

const BASE_URL = 'https://q-exercise-api.o64ixruq9hj.us-south.codeengine.appdomain.cloud/api/rest/';

export const useGetPokemonPageable = ({
  limit = 19,
  type = '',
  search = '',
  isFavorite = false,
}) => {
  const request = ({ pageParam = 0 }): Promise<PokemonPageable> => {
    return get(
      `${BASE_URL}pokemon/?limit=${limit}&offset=${pageParam}&type=${type}&search=${search}${
        isFavorite ? '&isFavorite=true' : ''
      }`
    );
  };

  return useInfiniteQuery<PokemonPageable, AxiosError>(['pokemon'], request, {
    cacheTime: Infinity,
    staleTime: Infinity,
    getNextPageParam: (lastPage) => {
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

        queryClient.setQueryData(['pokemon'], {
          ...updatedData,
        });

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
  const request = (): Promise<PokemonTypes[]> => get(`${BASE_URL}pokemon-types`);

  return useQuery<PokemonTypes[], AxiosError>(['pokemon', 'types'], request, {
    cacheTime: Infinity,
    staleTime: Infinity,
    useErrorBoundary: false,
  });
};

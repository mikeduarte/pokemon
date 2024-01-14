import { createContext, useState } from 'react';
import { Pokemon } from '../types/Pokemon';

const FavoritesContext = createContext({} as ReturnType<typeof useFavorites>);

const favoritesMap: {
  [id: string]: boolean;
} = localStorage.pokemonFavorites ? JSON.parse(localStorage.pokemonFavorites) : new Map();

function useFavorites() {
  const [favorites, setFavorites] = useState(favoritesMap);

  const onFavoritesChange = (id: Pokemon['id']) => {
    setFavorites((currentState) => {
      const updatedFavorites = {
        ...currentState,
        [id]: !currentState[id],
      };

      localStorage.pokemonFavorites = JSON.stringify(updatedFavorites);

      return updatedFavorites;
    });
  };

  return {
    favorites,
    onFavoritesChange,
  };
}

export { FavoritesContext, useFavorites };

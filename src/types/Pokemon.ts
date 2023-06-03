import { PokemonStat } from './PokemonStat';
import { PokemonTypes } from './PokemonTypes';

export interface PokemonPreview {
  id: string;
  image: string;
  isFavorite: boolean;
  name: string;
  number: number;
  types: PokemonTypes[];
}

export interface Pokemon extends PokemonPreview {
  evolutions: PokemonPreview[];
  height: PokemonStat;
  maxCP: number;
  maxHP: number;
  previousEvolutions: PokemonPreview[];
  sound: string;
  weight: PokemonStat;
}

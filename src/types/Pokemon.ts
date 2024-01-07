import { PokemonStat } from './PokemonStat';
import { PokemonType } from './PokemonTypes';
import { Sprites } from './Sprites';

export interface PokemonPreview {
  id: string;
  image: string;
  artwork: string;
  isFavorite: boolean;
  name: string;
  number: number;
}

export interface Pokemon extends PokemonPreview {
  //id: string;
  //evolutions: PokemonPreview[];
  height: number;
  //previousEvolutions: PokemonPreview[];
  //sound: string;
  weight: number;
  stats: PokemonStat[];
  types: Array<{
    slot: number;
    type: PokemonType;
  }>;
  sprites: Sprites;
}

import { PokemonStat } from './PokemonStat';
import { PokemonType } from './PokemonTypes';
import { Sprites } from './Sprites';

export interface PokemonPreview {
  id: number;
  image?: string;
  artwork?: string;
  name: string;
}

export interface Pokemon extends PokemonPreview {
  height: number;
  weight: number;
  stats: PokemonStat[];
  types: Array<{
    slot?: number;
    type: PokemonType;
  }>;
  sprites: Sprites;
}

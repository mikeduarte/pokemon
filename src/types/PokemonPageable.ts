import { PokemonPreview } from './Pokemon';

export interface PokemonPageable {
  limit: number;
  offset: number;
  count: number;
  items: PokemonPreview[];
}

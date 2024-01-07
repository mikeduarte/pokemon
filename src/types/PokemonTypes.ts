import { Pageable } from './Pageable';

export type PokemonTypes =
  | 'grass'
  | 'poison'
  | 'fire'
  | 'flying'
  | 'water'
  | 'bug'
  | 'normal'
  | 'electric'
  | 'ground'
  | 'fairy'
  | 'fighting'
  | 'psychic'
  | 'rock'
  | 'steel'
  | 'ice'
  | 'ghost'
  | 'dragon'
  | 'dark'
  | 'shadow'
  | 'unknown';

interface PokemonTypesDto {
  name: PokemonTypes;
  url: string;
}

export interface PokemonTypesPageable extends Pageable {
  results: PokemonTypesDto[];
}

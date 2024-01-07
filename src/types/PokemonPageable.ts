import { Pageable } from './Pageable';
import { PokemonPreview } from './Pokemon';

interface Pokemons extends Pageable {
  results: PokemonPreview[];
}

export interface PokemonPageable {
  data: {
    pokemons: Pokemons;
  };
}

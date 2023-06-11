import { LayoutTypes } from '../../types/LayoutTypes';
import { PokemonTypes } from '../../types/PokemonTypes';
import { TabViewTypes } from '../../types/TabViewTypes';

export interface Filters {
  layout: LayoutTypes;
  searchTerm: string;
  selectedType: PokemonTypes | '';
  tabView: TabViewTypes;
}

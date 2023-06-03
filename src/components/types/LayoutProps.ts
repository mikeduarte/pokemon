import { Pokemon } from '../../types/Pokemon';

export interface LayoutProps {
  id: Pokemon['id'];
  image: Pokemon['image'];
  isFavorite: Pokemon['isFavorite'];
  name: Pokemon['name'];
  types: Pokemon['types'];
  isFiltering: boolean;
}

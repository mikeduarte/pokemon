import { Typography } from '@mui/material';
import { Pokemon } from '../PokemonList';

type PokemonCardTitleProps = {
  name: Pokemon['name'];
  types: Pokemon['types'];
};

const PokemonCardTitle = ({ name, types }: PokemonCardTitleProps) => {
  return (
    <>
      <Typography component="h2" variant="h6">
        {name}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {types.join(', ')}
      </Typography>
    </>
  );
};

export default PokemonCardTitle;

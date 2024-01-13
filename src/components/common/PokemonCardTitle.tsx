import { Typography } from '@mui/material';
import { Pokemon } from '../../types/Pokemon';

type PokemonCardTitleProps = {
  name: Pokemon['name'];
  types?: Pokemon['types'];
};

const PokemonCardTitle = ({ name, types }: PokemonCardTitleProps) => {
  return (
    <>
      <Typography component="h2" variant="h6" sx={{ textTransform: 'capitalize' }}>
        {name}
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ textTransform: 'capitalize' }}>
        {types?.map((type) => type.type.name).join(', ')}
      </Typography>
    </>
  );
};

export default PokemonCardTitle;

import { CardMedia } from '@mui/material';
import { PokemonPreview } from '../PokemonList';

const PokemonImage = ({ pokemon }: { pokemon: PokemonPreview }) => {
  return (
    <CardMedia
      component="img"
      image={pokemon?.image}
      alt={pokemon?.name}
      sx={{
        objectFit: 'scale-down',
        maxWidth: '100%',
        flexGrow: 1,
        height: '1px',
        padding: (theme) => theme.spacing(2),
      }}
    />
  );
};

export default PokemonImage;

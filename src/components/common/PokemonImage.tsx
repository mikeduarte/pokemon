import { CardMedia, SxProps } from '@mui/material';
import { Pokemon } from '../../types/Pokemon';

type PokemonImageProps = {
  image: Pokemon['image'];
  name: Pokemon['name'];
  sx?: SxProps;
};

const PokemonImage = ({ image, name, sx = {} }: PokemonImageProps) => {
  return (
    <CardMedia
      data-testid="pokemon-image"
      component="img"
      image={image}
      alt={name}
      sx={{
        objectFit: 'scale-down',
        maxWidth: '100%',
        flexGrow: 1,
        height: '1px',
        padding: (theme) => theme.spacing(2),
        ...sx,
      }}
    />
  );
};

export default PokemonImage;

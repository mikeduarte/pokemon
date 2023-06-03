import { CardMedia, SxProps } from '@mui/material';
import { PokemonPreview } from '../PokemonList';

type PokemonImageProps = {
  pokemon: PokemonPreview;
  sx?: SxProps;
};

const PokemonImage = ({ pokemon, sx = {} }: PokemonImageProps) => {
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
        ...sx,
      }}
    />
  );
};

export default PokemonImage;

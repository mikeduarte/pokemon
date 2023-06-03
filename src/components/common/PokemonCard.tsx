import { ReactNode } from 'react';
import { Box, Card, CardActions, Stack, Typography } from '@mui/material';
import FavoriteButton from './FavoriteButton';
import PokemonImage from './PokemonImage';
import { Pokemon, PokemonPreview } from '../PokemonList';
import SoundButton from './SoundButton';

interface PokemonCardProps {
  pokemon: PokemonPreview | Pokemon;
  sound?: Pokemon['sound'];
  disableBorder?: boolean;
  disableHover?: boolean;
  children?: ReactNode;
}

const PokemonCard = ({
  pokemon,
  sound,
  disableBorder,
  disableHover,
  children,
}: PokemonCardProps) => {
  return (
    <Card
      variant="outlined"
      sx={{
        width: '100%',
        height: '100%',
        position: 'relative',
        borderWidth: () => (disableBorder ? 0 : '1px'),
        borderColor: (theme) => theme.palette.grey[300],
        '&:hover': {
          borderColor: (theme) => (disableHover ? 'auto' : theme.palette.warning.main),
        },
      }}
    >
      <Box sx={{ width: '100%', position: 'absolute', left: '0', top: '8px', pr: 1, zIndex: 99 }}>
        <Stack direction="row" justifyContent="space-between" width="100%">
          {sound && <SoundButton sound={sound} />}
          <Box sx={{ ml: 'auto' }}>
            <FavoriteButton id={pokemon.id} isFavorite={pokemon.isFavorite} />
          </Box>
        </Stack>
      </Box>
      <Stack height="100%">
        <PokemonImage pokemon={pokemon} />
        <CardActions
          sx={{
            flexDirection: 'column',
            padding: (theme) => theme.spacing(3, 2, 2, 2),
          }}
        >
          <Typography component="h2" variant="h6">
            {pokemon.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {pokemon.types?.join(', ')}
          </Typography>
        </CardActions>
        {children}
      </Stack>
    </Card>
  );
};

export default PokemonCard;

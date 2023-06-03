import { ReactNode } from 'react';
import { Box, Card, CardContent, Stack } from '@mui/material';
import FavoriteButton from './common/FavoriteButton';
import PokemonImage from './common/PokemonImage';

import SoundButton from './common/SoundButton';
import PokemonCardTitle from './common/PokemonCardTitle';
import { Pokemon } from '../types/Pokemon';

interface PokemonCardProps {
  disableBorder?: boolean;
  disableHover?: boolean;
  children?: ReactNode;
  id: Pokemon['id'];
  image: Pokemon['image'];
  isFavorite: Pokemon['isFavorite'];
  name: Pokemon['name'];
  types: Pokemon['types'];
  sound?: Pokemon['sound'];
}

const PokemonVerticalCard = ({
  id,
  image,
  isFavorite,
  name,
  types,
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
          {sound && (
            <Box sx={{ mt: -0.5 }}>
              <SoundButton sound={sound} name={name} />
            </Box>
          )}
          <Box sx={{ ml: 'auto' }}>
            <FavoriteButton id={id} isFavorite={isFavorite} name={name} />
          </Box>
        </Stack>
      </Box>
      <Stack height="100%">
        <PokemonImage image={image} name={name} />
        <CardContent
          sx={{
            flexDirection: 'column',
            padding: (theme) => theme.spacing(3, 2, 2, 2),
            '&:last-child': {
              paddingBottom: 2,
            },
          }}
        >
          <PokemonCardTitle name={name} types={types} />
        </CardContent>
        {children}
      </Stack>
    </Card>
  );
};

export default PokemonVerticalCard;

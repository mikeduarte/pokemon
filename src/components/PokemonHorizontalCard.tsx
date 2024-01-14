import { useContext } from 'react';
import { Box, Card, CardContent, Stack } from '@mui/material';
import FavoriteButton from './common/FavoriteButton';
import PokemonImage from './common/PokemonImage';

import PokemonCardTitle from './common/PokemonCardTitle';
import { Pokemon } from '../types/Pokemon';
import { FavoritesContext } from '../contexts/FavoritesContext';

type PokemonCardProps = {
  id: Pokemon['id'];
  image: Pokemon['image'];
  name: Pokemon['name'];
  types?: Pokemon['types'];
};

const PokemonHorizontalCard = ({ id, image, name, types }: PokemonCardProps) => {
  const { favorites } = useContext(FavoritesContext);

  return (
    <Card
      data-testid="pokemon-horizontal-card"
      variant="outlined"
      sx={{
        position: 'relative',
        '&:hover': {
          borderColor: (theme) => theme.palette.warning.main,
        },
      }}
    >
      <Stack
        direction="row"
        alignItems="center"
        sx={{
          height: '100px',
          paddingRight: 1,
          backgroundColor: (theme) => theme.palette.grey[100],
        }}
      >
        <Box
          sx={{
            flexShrink: 0,
            height: '100%',
            backgroundColor: (theme) => theme.palette.background.default,
          }}
        >
          <PokemonImage
            image={image}
            name={name}
            sx={{
              width: '120px',
              height: '100%',
              padding: 1.5,
            }}
          />
        </Box>
        <CardContent
          sx={{
            width: '100%',
          }}
        >
          <PokemonCardTitle name={name} types={types} />
        </CardContent>
        <FavoriteButton id={id} isFavorite={favorites[id]} name={name} />
      </Stack>
    </Card>
  );
};

export default PokemonHorizontalCard;

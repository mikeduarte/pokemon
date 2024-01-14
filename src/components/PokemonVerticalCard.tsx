import { ReactNode, useContext } from 'react';
import { Box, Link, Card, CardContent, Stack } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

import FavoriteButton from './common/FavoriteButton';
import PokemonImage from './common/PokemonImage';
import PokemonCardTitle from './common/PokemonCardTitle';
import { Pokemon } from '../types/Pokemon';
import { FavoritesContext } from '../contexts/FavoritesContext';
import PokemonBall from './common/PokemonBall';

type PokemonCardProps = {
  disableBorder?: boolean;
  disableHover?: boolean;
  children?: ReactNode;
  id: Pokemon['id'];
  image: Pokemon['image'];
  name: Pokemon['name'];
  types?: Pokemon['types'];
  showHomeLink?: boolean;
};

const PokemonVerticalCard = ({
  id,
  image,
  name,
  types,
  disableBorder,
  disableHover,
  children,
  showHomeLink = false,
}: PokemonCardProps) => {
  const { favorites } = useContext(FavoritesContext);

  return (
    <Card
      data-testid="pokemon-vertical-card"
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
      <Box
        sx={{ width: '100%', position: 'absolute', left: '0', top: '10px', pr: 1.25, zIndex: 99 }}
      >
        <Stack direction="row" justifyContent="space-between" width="100%">
          {showHomeLink && (
            <Link
              sx={{ width: 30, ml: 1.75, mt: 0.5 }}
              component={RouterLink}
              underline="none"
              to={`/pokemon`}
              title="View all Pokemon"
            >
              <PokemonBall />
            </Link>
          )}
          <Box sx={{ ml: 'auto' }}>
            <FavoriteButton id={id} isFavorite={favorites[id]} name={name} />
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

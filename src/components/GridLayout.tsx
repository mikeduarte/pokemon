import {
  Stack,
  Card,
  CardActions,
  CardHeader,
  CardMedia,
  Fade,
  Grid,
  Typography,
  Link,
} from '@mui/material';

import { Link as RouterLink } from 'react-router-dom';
import { PokemonPreview } from './PokemonList';
import FavoriteButton from './common/FavoriteButton';

interface GridLayoutProps {
  pokemon: PokemonPreview;
  isFiltering: boolean;
}

const GridLayout = ({ pokemon, isFiltering }: GridLayoutProps) => {
  return (
    <Grid item xs={12} sm={6} md={4} lg={3}>
      <Fade
        in
        timeout={{
          enter: isFiltering ? 0 : 800,
        }}
      >
        <Card
          variant="outlined"
          sx={{
            position: 'relative',
            '&:hover': {
              border: () => `1px solid darkgoldenrod`,
            },
          }}
        >
          <CardHeader
            sx={{ position: 'absolute', right: '12px', top: '8px', p: 0, zIndex: 1 }}
            action={<FavoriteButton id={pokemon.id} isFavorite={pokemon.isFavorite} />}
          />
          <Stack
            sx={{
              height: {
                xs: '50vh',
                sm: '50vh',
                md: '40vh',
              },
              padding: (theme) => theme.spacing(2),
            }}
          >
            <Link
              component={RouterLink}
              to={`/${pokemon.name}/${pokemon.id}`}
              sx={{
                flexGrow: 1,
                height: '1px',
              }}
            >
              <CardMedia
                component="img"
                image={pokemon.image}
                alt={pokemon.name}
                sx={{
                  objectFit: 'contain',
                  height: '100%',
                }}
              />
            </Link>
            <CardActions
              sx={{
                flexDirection: 'column',
                padding: (theme) => theme.spacing(3, 0, 0, 0),
              }}
            >
              <Link
                variant="h6"
                component={RouterLink}
                to={`/${pokemon.name}/${pokemon.id}`}
                underline="none"
                color="black"
              >
                {pokemon.name}
              </Link>
              <Typography variant="body2" color="text.secondary">
                {pokemon.types?.join(', ')}
              </Typography>
            </CardActions>
          </Stack>
        </Card>
      </Fade>
    </Grid>
  );
};

export default GridLayout;

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

interface ListLayoutProps {
  pokemon: PokemonPreview;
  isFiltering: boolean;
}

const ListLayout = ({ pokemon, isFiltering }: ListLayoutProps) => {
  return (
    <Grid item xs={12}>
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
          <Stack
            direction="row"
            alignItems="center"
            spacing={1.5}
            sx={{
              height: '100px',
              paddingRight: 1,
              backgroundColor: (theme) => theme.palette.grey[100],
            }}
          >
            <Link
              component={RouterLink}
              to={`/${pokemon.name}/${pokemon.id}`}
              sx={{
                height: '100%',
                backgroundColor: (theme) => theme.palette.background.default,
              }}
            >
              <CardMedia
                component="img"
                image={pokemon.image}
                alt={pokemon.name}
                sx={{
                  objectFit: 'contain',
                  width: '120px',
                  height: '100%',
                  padding: (theme) => theme.spacing(1.5),
                }}
              />
            </Link>
            <CardActions
              sx={{
                flexDirection: 'column',
                alignItems: 'flex-start',
                width: '100%',
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
            <CardHeader
              action={<FavoriteButton id={pokemon.id} isFavorite={pokemon.isFavorite} />}
            />
          </Stack>
        </Card>
      </Fade>
    </Grid>
  );
};

export default ListLayout;

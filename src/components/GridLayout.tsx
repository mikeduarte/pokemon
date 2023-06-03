import { Fade, Grid, Link } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

import { PokemonPreview } from './PokemonList';
import PokemonCard from './common/PokemonCard';

interface GridLayoutProps {
  pokemon: PokemonPreview;
  isFiltering: boolean;
}

const GridLayout = ({ pokemon, isFiltering }: GridLayoutProps) => {
  return (
    <Grid
      item
      xs={12}
      sm={6}
      md={4}
      lg={3}
      sx={{
        aspectRatio: '1 / 1.25',
      }}
    >
      <Fade
        in
        timeout={{
          enter: isFiltering ? 0 : 800,
        }}
      >
        <Link
          component={RouterLink}
          underline="none"
          to={`/${pokemon.name}/${pokemon.id}`}
          sx={{
            display: 'block',
            height: '100%',
          }}
        >
          <PokemonCard pokemon={pokemon} />
        </Link>
      </Fade>
    </Grid>
  );
};

export default GridLayout;

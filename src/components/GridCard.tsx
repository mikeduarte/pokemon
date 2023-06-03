import { Fade, Grid, Box } from '@mui/material';

import { PokemonPreview } from './PokemonList';
import PokemonCard from './common/PokemonCard';
import PokemonLink from './common/PokemonLink';

interface GridLayoutProps {
  pokemon: PokemonPreview;
  isFiltering: boolean;
}

const GridCard = ({ pokemon, isFiltering }: GridLayoutProps) => {
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
        <Box
          sx={{
            height: '100%',
          }}
        >
          <PokemonLink id={pokemon.id} name={pokemon.name}>
            <PokemonCard pokemon={pokemon} />
          </PokemonLink>
        </Box>
      </Fade>
    </Grid>
  );
};

export default GridCard;

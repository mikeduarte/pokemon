import { Fade, Grid, Box } from '@mui/material';

import { PokemonPreview } from './PokemonList';

import PokemonLink from './common/PokemonLink';
import PokemonHorizontalCard from './PokemonHorizontalCard';

interface ListLayoutProps {
  pokemon: PokemonPreview;
  isFiltering: boolean;
}

const ListCard = ({ pokemon, isFiltering }: ListLayoutProps) => {
  return (
    <Grid item xs={12}>
      <Fade
        in
        timeout={{
          enter: isFiltering ? 0 : 800,
        }}
      >
        <Box>
          <PokemonLink id={pokemon.id} name={pokemon.name}>
            <PokemonHorizontalCard pokemon={pokemon} />
          </PokemonLink>
        </Box>
      </Fade>
    </Grid>
  );
};

export default ListCard;

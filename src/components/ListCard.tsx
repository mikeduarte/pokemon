import { Fade, Grid, Box } from '@mui/material';

import PokemonLink from './common/PokemonLink';
import PokemonHorizontalCard from './PokemonHorizontalCard';
import { LayoutProps } from './types/LayoutProps';

const ListCard = ({ id, image, isFavorite, name, types, isFiltering }: LayoutProps) => {
  return (
    <Grid item xs={12}>
      <Fade
        in
        timeout={{
          enter: isFiltering ? 0 : 800,
        }}
      >
        <Box>
          <PokemonLink id={id} name={name}>
            <PokemonHorizontalCard
              id={id}
              image={image}
              isFavorite={isFavorite}
              name={name}
              types={types}
            />
          </PokemonLink>
        </Box>
      </Fade>
    </Grid>
  );
};

export default ListCard;

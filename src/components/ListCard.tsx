import { forwardRef } from 'react';
import { Fade, Grid, Box } from '@mui/material';

import PokemonLink from './common/PokemonLink';
import PokemonHorizontalCard from './PokemonHorizontalCard';
import { LayoutProps } from './types/LayoutProps';

const ListCard = forwardRef(function ListCard(
  props: LayoutProps,
  ref: React.ForwardedRef<HTMLLIElement>
) {
  const { id, image, isFavorite, name, types, isFiltering } = props;

  return (
    <Grid component="li" item xs={12} ref={ref} data-testid="list-card">
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
});

export default ListCard;

import { forwardRef } from 'react';
import { Fade, Grid, Box } from '@mui/material';

import PokemonVerticalCard from './PokemonVerticalCard';
import PokemonLink from './common/PokemonLink';
import { LayoutProps } from './types/LayoutProps';

const GridCard = forwardRef(function GridCard(
  props: LayoutProps,
  ref: React.ForwardedRef<HTMLLIElement>
) {
  const { id, image, isFavorite, name, types, isFiltering } = props;

  return (
    <Grid
      component="li"
      item
      xs={12}
      sm={6}
      md={4}
      lg={3}
      sx={{
        aspectRatio: '1 / 1.25',
      }}
      ref={ref}
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
          <PokemonLink id={id} name={name}>
            <PokemonVerticalCard
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

export default GridCard;

import { Fade, Grid, Box } from '@mui/material';

import PokemonVerticalCard from './PokemonVerticalCard';
import PokemonLink from './common/PokemonLink';
import { LayoutProps } from './types/LayoutProps';

const GridCard = ({ id, image, isFavorite, name, types, isFiltering }: LayoutProps) => {
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
};

export default GridCard;

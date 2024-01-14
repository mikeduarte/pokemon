import { createElement, forwardRef, useMemo } from 'react';
import { Grid, Box } from '@mui/material';

import PokemonVerticalCard from './PokemonVerticalCard';
import PokemonHorizontalCard from './PokemonHorizontalCard';
import PokemonLink from './common/PokemonLink';
import verticalCardStyles from './styles/verticalCard';
import { Pokemon } from '../types/Pokemon';

type ListCardProps = {
  id: Pokemon['id'];
  image: Pokemon['image'];
  isGridView: boolean;
  name: Pokemon['name'];
};

const ListCard = forwardRef(function GridCard(
  props: ListCardProps,
  ref: React.ForwardedRef<HTMLLIElement>
) {
  const { id, image, isGridView, name } = props;

  const layoutStyles = useMemo(
    () => ({
      xs: 12,
      ...(isGridView && { ...verticalCardStyles }),
    }),
    [isGridView]
  );

  return (
    <Grid data-testid="list-card" component="li" item ref={ref} {...layoutStyles}>
      <Box sx={{ height: isGridView ? '100%' : 'auto' }}>
        <PokemonLink id={id} name={name}>
          {createElement(isGridView ? PokemonVerticalCard : PokemonHorizontalCard, {
            id,
            image,
            name,
          })}
        </PokemonLink>
      </Box>
    </Grid>
  );
});

export default ListCard;

import { createElement, forwardRef, useMemo } from 'react';
import { Grid, Box } from '@mui/material';

import PokemonVerticalCard from './PokemonVerticalCard';
import PokemonHorizontalCard from './PokemonHorizontalCard';
import PokemonLink from './common/PokemonLink';
import gridCardStyles from './styles/gridCard';
import { Pokemon } from '../types/Pokemon';

interface ListCardProps {
  id: Pokemon['id'];
  image: Pokemon['image'];
  isFavorite: Pokemon['isFavorite'];
  isGridView: boolean;
  name: Pokemon['name'];
  types: Pokemon['types'];
}

const ListCard = forwardRef(function GridCard(
  props: ListCardProps,
  ref: React.ForwardedRef<HTMLLIElement>
) {
  const { id, image, isFavorite, isGridView, name, types } = props;

  const layoutStyles = useMemo(
    () => ({
      xs: 12,
      ...(isGridView && { ...gridCardStyles }),
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
            isFavorite,
            name,
            types,
          })}
        </PokemonLink>
      </Box>
    </Grid>
  );
});

export default ListCard;

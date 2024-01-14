import { MouseEvent, useContext } from 'react';
import { IconButton, Tooltip } from '@mui/material';
import FavoriteTwoToneIcon from '@mui/icons-material/FavoriteTwoTone';
import FavoriteIcon from '@mui/icons-material/Favorite';

import { Pokemon } from '../../types/Pokemon';
import { FavoritesContext } from '../../contexts/FavoritesContext';

type FavoriteButtonProps = {
  id: Pokemon['id'];
  isFavorite: Pokemon['isFavorite'];
  name: Pokemon['name'];
};

const FavoriteButton = ({ id, isFavorite, name }: FavoriteButtonProps) => {
  const { onFavoritesChange } = useContext(FavoritesContext);

  const label = `${isFavorite ? 'Remove' : 'Add'} ${name} ${isFavorite ? 'from' : 'to'} favorites`;

  const onFavoriteClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    onFavoritesChange(id);
  };

  return (
    <Tooltip title={label}>
      <IconButton
        data-testid="favorite-button"
        size="small"
        onClick={(event) => onFavoriteClick(event)}
        aria-label={label}
      >
        {!isFavorite ? (
          <FavoriteTwoToneIcon color="error" sx={{ fontSize: '1.65rem' }} />
        ) : (
          <FavoriteIcon color="error" sx={{ fontSize: '1.65rem' }} />
        )}
      </IconButton>
    </Tooltip>
  );
};

export default FavoriteButton;

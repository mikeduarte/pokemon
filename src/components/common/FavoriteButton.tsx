import { MouseEvent } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { IconButton } from '@mui/material';
import FavoriteTwoToneIcon from '@mui/icons-material/FavoriteTwoTone';
import FavoriteIcon from '@mui/icons-material/Favorite';

import { usePostPokemonFavorite } from '../../api/hooks';
import { Pokemon } from '../../types/Pokemon';

interface FavoriteButtonProps {
  id: Pokemon['id'];
  isFavorite: Pokemon['isFavorite'];
  parentId?: Pokemon['id'];
}

const FavoriteButton = ({ id, isFavorite, parentId }: FavoriteButtonProps) => {
  const queryClient = useQueryClient();
  const favoriteMutation = usePostPokemonFavorite();

  const onFavoriteClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    favoriteMutation.mutate(
      { id, isFavorite: !isFavorite },
      {
        onSuccess: () => {
          if (parentId) queryClient.invalidateQueries(['pokemon', parentId]);
        },
      }
    );
  };

  return (
    <IconButton
      size="small"
      disableRipple
      onClick={(event) => onFavoriteClick(event)}
      disabled={favoriteMutation.isLoading ? true : false}
    >
      {!isFavorite ? (
        <FavoriteTwoToneIcon color="error" sx={{ fontSize: '1.25rem' }} />
      ) : (
        <FavoriteIcon color="error" sx={{ fontSize: '1.25rem' }} />
      )}
    </IconButton>
  );
};

export default FavoriteButton;

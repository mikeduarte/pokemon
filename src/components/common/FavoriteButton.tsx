import { MouseEvent } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useSnackbar } from 'notistack';
import { IconButton, Tooltip } from '@mui/material';
import FavoriteTwoToneIcon from '@mui/icons-material/FavoriteTwoTone';
import FavoriteIcon from '@mui/icons-material/Favorite';

import { usePostPokemonFavorite } from '../../api/hooks';
import { Pokemon } from '../../types/Pokemon';

type FavoriteButtonProps = {
  id: Pokemon['id'];
  isFavorite: Pokemon['isFavorite'];
  name: Pokemon['name'];
  parentId?: Pokemon['id'];
};

const FavoriteButton = ({ id, isFavorite, name, parentId }: FavoriteButtonProps) => {
  const queryClient = useQueryClient();
  const favoriteMutation = usePostPokemonFavorite();
  const { enqueueSnackbar } = useSnackbar();
  const label = `${isFavorite ? 'Remove' : 'Add'} ${name} ${isFavorite ? 'from' : 'to'} favorites`;

  const onFavoriteClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    favoriteMutation.mutate(
      { id, isFavorite: !isFavorite },
      {
        onSuccess: () => {
          if (parentId) queryClient.invalidateQueries(['pokemon', parentId]);
        },
        onError: () => {
          enqueueSnackbar('Error saving favorite!', {
            variant: 'error',
          });
        },
      }
    );
  };

  return (
    <Tooltip title={label}>
      <IconButton
        data-testid="favorite-button"
        size="small"
        onClick={(event) => onFavoriteClick(event)}
        disabled={favoriteMutation.isLoading ? true : false}
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

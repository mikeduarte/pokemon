import { useQueryClient } from '@tanstack/react-query';
import { IconButton } from '@mui/material';
import FavoriteTwoToneIcon from '@mui/icons-material/FavoriteTwoTone';
import FavoriteIcon from '@mui/icons-material/Favorite';

import { usePostPokemonFavorite } from '../../api/hooks';

interface FavoriteButtonProps {
  id: string;
  isFavorite: boolean;
  parentId?: string;
}

const FavoriteButton = ({ id, isFavorite, parentId }: FavoriteButtonProps) => {
  const queryClient = useQueryClient();
  const favoriteMutation = usePostPokemonFavorite();

  const onFavoriteClick = () => {
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
      onClick={onFavoriteClick}
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

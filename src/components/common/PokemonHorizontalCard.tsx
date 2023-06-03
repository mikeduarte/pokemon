import { Box, Card, CardContent, Stack } from '@mui/material';
import FavoriteButton from './FavoriteButton';
import PokemonImage from './PokemonImage';
import { Pokemon, PokemonPreview } from '../PokemonList';
import PokemonCardTitle from './PokemonCardTitle';

interface PokemonCardProps {
  pokemon: PokemonPreview | Pokemon;
}

const PokemonHorizontalCard = ({ pokemon }: PokemonCardProps) => {
  return (
    <Card
      variant="outlined"
      sx={{
        position: 'relative',
        '&:hover': {
          borderColor: (theme) => theme.palette.warning.main,
        },
      }}
    >
      <Stack
        direction="row"
        alignItems="center"
        sx={{
          height: '100px',
          paddingRight: 1,
          backgroundColor: (theme) => theme.palette.grey[100],
        }}
      >
        <Box
          sx={{
            flexShrink: 0,
            height: '100%',
            backgroundColor: (theme) => theme.palette.background.default,
          }}
        >
          <PokemonImage
            pokemon={pokemon}
            sx={{
              width: '120px',
              height: '100%',
              padding: 1.5,
            }}
          />
        </Box>
        <CardContent
          sx={{
            width: '100%',
          }}
        >
          <PokemonCardTitle name={pokemon.name} types={pokemon.types} />
        </CardContent>
        <FavoriteButton id={pokemon.id} isFavorite={pokemon.isFavorite} />
      </Stack>
    </Card>
  );
};

export default PokemonHorizontalCard;

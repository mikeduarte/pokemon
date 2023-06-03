import { Avatar, Badge, Chip, Divider, Stack, Typography } from '@mui/material';
import { Pokemon } from '../PokemonList';
import FavoriteButton from './FavoriteButton';
import useMobileBreakpoint from '../../hooks/useMobileBreakpoint';

const PokemonStats = ({ pokemon }: { pokemon: Pokemon }) => {
  const { isMobileBreakpoint } = useMobileBreakpoint();

  return (
    <Stack
      width="100%"
      justifyContent="space-between"
      direction={{
        xs: 'column',
        sm: 'row',
      }}
      sx={{
        mt: 1,
        backgroundColor: (theme) => theme.palette.grey[100],
      }}
    >
      <Stack
        width="100%"
        alignItems="center"
        justifyContent="space-between"
        spacing={2}
        sx={{
          px: {
            xs: 3,
            md: 4,
          },
          py: 2,
        }}
      >
        <Typography variant="subtitle1" component="h2">
          Stats
        </Typography>
        <Stack width="100%">
          <Stack direction="row" justifyContent="space-between">
            <Typography variant="caption" fontWeight="bold">
              Weight
            </Typography>
            <Typography variant="body2">
              {pokemon?.weight.minimum} - {pokemon?.weight.maximum}
            </Typography>
          </Stack>
          <Divider
            flexItem
            light
            variant="middle"
            sx={{
              my: 1,
            }}
          />
          <Stack direction="row" justifyContent="space-between">
            <Typography variant="caption" fontWeight="bold">
              Height
            </Typography>
            <Typography variant="body2">
              {pokemon?.height.minimum} - {pokemon?.height.maximum}
            </Typography>
          </Stack>
        </Stack>
        <Stack direction="row" spacing={1}>
          <Chip
            size="small"
            variant="outlined"
            avatar={<Avatar sx={{ color: 'white !important' }}>CP</Avatar>}
            label={pokemon?.maxCP}
            color="primary"
            sx={{
              background: 'white',
            }}
          />
          <Chip
            size="small"
            variant="outlined"
            avatar={<Avatar sx={{ color: 'white !important' }}>HP</Avatar>}
            label={pokemon?.maxHP}
            color="secondary"
            sx={{
              background: 'white',
            }}
          />
        </Stack>
      </Stack>
      {!!pokemon?.evolutions?.length && (
        <>
          {!isMobileBreakpoint && (
            <Divider orientation="vertical" flexItem light variant="middle" />
          )}
          <Stack
            width="100%"
            alignItems="center"
            sx={{
              px: {
                xs: 3,
                md: 4,
              },
              py: 2,
            }}
          >
            <Typography variant="subtitle1" component="h2">
              Evolutions
            </Typography>
            <Stack direction="row" spacing={2} mt={1}>
              {pokemon?.evolutions.map((evolution) => (
                <Badge
                  key={evolution.id}
                  overlap="circular"
                  anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                  badgeContent={
                    <FavoriteButton
                      id={evolution.id}
                      isFavorite={evolution.isFavorite}
                      parentId={pokemon.id}
                    />
                  }
                >
                  <Avatar
                    alt={evolution.name}
                    src={evolution.image}
                    sx={{
                      width: 80,
                      height: 80,
                      backgroundColor: 'white',
                    }}
                    imgProps={{
                      sx: {
                        objectFit: 'contain',
                        p: 1.5,
                      },
                    }}
                  />
                </Badge>
              ))}
            </Stack>
          </Stack>
        </>
      )}
    </Stack>
  );
};

export default PokemonStats;

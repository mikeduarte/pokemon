import { Avatar, Chip, Divider, Stack, Typography } from '@mui/material';

import useMobileBreakpoint from '../../hooks/useMobileBreakpoint';
import { Pokemon } from '../../types/Pokemon';
import { PokemonStat } from '../../types/PokemonStat';

const findStatByName = (stats: PokemonStat[], name: string) => {
  const stat = stats.find((stat) => name === stat.stat.name);

  return stat?.base_stat;
};

type PokemonStatsProps = {
  name: Pokemon['name'];
  height: Pokemon['height'];
  weight: Pokemon['weight'];
  stats: Pokemon['stats'];
  sprites: Pokemon['sprites'];
};

const PokemonStats = ({ name, sprites, height, stats, weight }: PokemonStatsProps) => {
  const { isMobileBreakpoint } = useMobileBreakpoint();

  return (
    <Stack
      data-testid="pokemon-stats"
      width="100%"
      justifyContent="space-between"
      direction={{ xs: 'column', sm: 'row' }}
      sx={{ mt: 1, backgroundColor: (theme) => theme.palette.grey[100] }}
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
            <Typography variant="body2">{weight}</Typography>
          </Stack>
          <Divider flexItem light variant="middle" sx={{ my: 1 }} />
          <Stack direction="row" justifyContent="space-between">
            <Typography variant="caption" fontWeight="bold">
              Height
            </Typography>
            <Typography variant="body2">{height}</Typography>
          </Stack>
        </Stack>
        <Stack direction="row" spacing={1}>
          <Chip
            size="small"
            variant="outlined"
            avatar={<Avatar sx={{ color: 'white !important' }}>AP</Avatar>}
            label={findStatByName(stats, 'attack')}
            color="primary"
            sx={{ background: 'white' }}
          />
          <Chip
            size="small"
            variant="outlined"
            avatar={<Avatar sx={{ color: 'white !important' }}>HP</Avatar>}
            label={findStatByName(stats, 'hp')}
            color="secondary"
            sx={{ background: 'white' }}
          />
        </Stack>
      </Stack>
      {sprites && (
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
              Showdown
            </Typography>
            <Stack direction="row" spacing={2} mt={1} flexGrow={1}>
              <Avatar
                alt={`${name} showdown animation`}
                variant="rounded"
                src={sprites.other.showdown.front_default}
                sx={{ width: 'auto', height: 'auto', margin: 'auto' }}
              />
            </Stack>
          </Stack>
        </>
      )}
    </Stack>
  );
};

export default PokemonStats;

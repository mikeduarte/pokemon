import { Stack, Typography } from '@mui/material';
import PokemonBall from './common/PokemonBall';

const NoResults = () => {
  return (
    <Stack
      data-testid="no-results"
      role="alert"
      width="1"
      direction="row"
      justifyContent="center"
      alignItems="center"
      spacing={1.25}
      mt={4}
    >
      <Stack
        height="30px"
        width="30px"
        sx={{ flexShrink: 0, filter: 'grayscale(20%)', opacity: 0.45 }}
      >
        <PokemonBall />
      </Stack>
      <Typography>No Pokemon match that criteria.</Typography>
    </Stack>
  );
};

export default NoResults;

import { useParams } from 'react-router-dom';
import { Grid, Modal, Stack } from '@mui/material';

import { useGetPokemon } from '../api/hooks';
import PokemonLoader from './common/PokemonLoader';
import PokemonCard from './PokemonVerticalCard';
import PokemonStats from './common/PokemonStats';
import useMobileBreakpoint from '../hooks/useMobileBreakpoint';

const PokemonDetail = () => {
  const { id } = useParams() as { id: string };
  const { isMobileBreakpoint } = useMobileBreakpoint();
  const { isLoading, data: pokemon } = useGetPokemon(id);

  return (
    <Modal open>
      <Stack
        sx={{
          height: '100%',
          backgroundColor: 'background.paper',
        }}
      >
        {isLoading && <PokemonLoader />}
        {!isLoading && pokemon && (
          <Grid
            container
            height={{
              xs: '100%',
              sm: '80vh',
            }}
            width="100vw"
            maxWidth="sm"
            m="auto"
          >
            <PokemonCard
              pokemon={pokemon}
              sound={pokemon.sound}
              disableBorder={isMobileBreakpoint}
              disableHover
            >
              <PokemonStats pokemon={pokemon} />
            </PokemonCard>
          </Grid>
        )}
      </Stack>
    </Modal>
  );
};

export default PokemonDetail;

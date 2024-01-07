import { useParams } from 'react-router-dom';
import { Grid, Modal, Stack } from '@mui/material';

import { useGetPokemon } from '../api/hooks';
import PokemonLoader from './common/PokemonLoader';
import PokemonVerticalCard from './PokemonVerticalCard';
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
          outline: 'none',
        }}
      >
        {isLoading && <PokemonLoader />}
        {!isLoading && pokemon && (
          <Grid
            data-testid="pokemon-detail"
            container
            height={{ xs: '100%', sm: '80vh' }}
            width="100vw"
            maxWidth="sm"
            m="auto"
          >
            <PokemonVerticalCard
              id={pokemon.id}
              image={pokemon.sprites?.other?.['official-artwork'].front_default}
              isFavorite={pokemon.isFavorite}
              name={pokemon.name}
              types={pokemon.types}
              disableBorder={isMobileBreakpoint}
              disableHover
            >
              <PokemonStats
                name={pokemon.name}
                sprites={pokemon.sprites}
                height={pokemon.height}
                weight={pokemon.weight}
                stats={pokemon.stats}
                parentId={pokemon.id}
              />
            </PokemonVerticalCard>
          </Grid>
        )}
      </Stack>
    </Modal>
  );
};

export default PokemonDetail;

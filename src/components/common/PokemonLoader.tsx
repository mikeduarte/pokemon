import { Backdrop, Box, styled, keyframes } from '@mui/material';
import { ReactComponent as PokemonBall } from '../../assets/pokemon-ball.svg';

const animation = keyframes`
  from {
    transform: scale3d(1, 1, 1);
  }

  10%,
  20% {
    transform: scale3d(0.9, 0.9, 0.9) rotate3d(0, 0, 1, -3deg);
  }

  30%,
  50%,
  70%,
  90% {
    transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, 3deg);
  }

  40%,
  60%,
  80% {
    transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, -3deg);
  }

  to {
    transform: scale3d(1, 1, 1);
  }
`;

const StyledLoader = styled(Box)`
  width: 100px;
  height: auto;
  filter: drop-shadow(1px 1px 6px darkgrey);
  animation: ${animation} 1200ms infinite;
`;

const PokemonLoader = () => (
  <Backdrop
    sx={{
      color: '#fff',
      backgroundColor: 'rgba(255, 255, 255, .5)',
      zIndex: (theme) => theme.zIndex.drawer + 1,
    }}
    open
  >
    <StyledLoader role="alert" aria-busy="true">
      <PokemonBall />
    </StyledLoader>
  </Backdrop>
);

export default PokemonLoader;

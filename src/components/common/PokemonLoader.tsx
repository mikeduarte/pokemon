import { Backdrop, Box, styled, keyframes } from '@mui/material';

const tada = keyframes`
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
  width: 50px;
  height: 50px;
  border-radius: 50px;
  border: solid 2px black;
  position: relative;
  background: linear-gradient(to bottom, #eeeeee 0%, #ffffff 100%);
  margin: 10px auto;

  &:before,
  &:after {
    content: '';
    display: block;
  }

  &,
  &:before,
  &:after {
    transition: all 600ms cubic-bezier(0.67, 0.4, 0.36, 0.75);
  }

  &:before {
    width: 46px;
    height: 25px;
    border-bottom: solid 2px black;
    border-radius: 25px 25px 0 0;
    background: linear-gradient(to bottom, #d10000 0%, #ff0000 50%);
  }

  &:after {
    content: '';
    width: 10px;
    height: 10px;
    background: linear-gradient(to bottom, #fff 0%, #ccc 100%);
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    border-radius: 50%;
    box-shadow: 0 0 0 1px black, 0 0 0 2px #ddd, 0 0 0 3.6px black, 0 0 5px 3px rgba(0, 0, 0, 0.4);
  }

  animation: ${tada} 1200ms infinite;
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
    <StyledLoader />
  </Backdrop>
);

export default PokemonLoader;

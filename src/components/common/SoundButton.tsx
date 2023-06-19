import { IconButton, Tooltip } from '@mui/material';
import { useSnackbar } from 'notistack';
import VolumeMuteIcon from '@mui/icons-material/VolumeMute';

import { Pokemon } from '../../types/Pokemon';

type SoundButtonProps = {
  name: Pokemon['name'];
  sound: Pokemon['sound'];
};

const SoundButton = ({ name, sound }: SoundButtonProps) => {
  const { enqueueSnackbar } = useSnackbar();
  const label = `Listen to ${name}`;

  const handleButtonClick = () => {
    const audio = new Audio(sound);
    audio.onerror = () => {
      enqueueSnackbar('Error playing sound!', {
        variant: 'error',
      });
    };
    audio.play();
  };

  return (
    <Tooltip title={label}>
      <IconButton data-testid="sound-button" onClick={handleButtonClick} aria-label={label}>
        <VolumeMuteIcon color="info" sx={{ fontSize: '2.5rem' }} />
      </IconButton>
    </Tooltip>
  );
};

export default SoundButton;

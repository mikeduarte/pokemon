import { IconButton } from '@mui/material';
import VolumeMuteIcon from '@mui/icons-material/VolumeMute';
import { Pokemon } from '../../types/Pokemon';

const SoundButton = ({ sound }: { sound: Pokemon['sound'] }) => {
  const handleButtonClick = () => {
    new Audio(sound).play();
  };

  return (
    <IconButton disableRipple onClick={handleButtonClick}>
      <VolumeMuteIcon color="info" sx={{ fontSize: '1.75rem' }} />
    </IconButton>
  );
};

export default SoundButton;

import { IconButton } from '@mui/material';
import VolumeMuteIcon from '@mui/icons-material/VolumeMute';
import { Pokemon } from '../../types/Pokemon';

type SoundButtonProps = {
  name: Pokemon['name'];
  sound: Pokemon['sound'];
};

const SoundButton = ({ name, sound }: SoundButtonProps) => {
  const handleButtonClick = () => {
    new Audio(sound).play();
  };

  return (
    <IconButton onClick={handleButtonClick} aria-label={`Listen to ${name}`}>
      <VolumeMuteIcon color="info" sx={{ fontSize: '2.5rem' }} />
    </IconButton>
  );
};

export default SoundButton;

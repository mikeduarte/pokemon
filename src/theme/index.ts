import { createTheme } from '@mui/material';
import palette from './palette';

const theme = createTheme({
  palette: {
    ...palette,
  },
  components: {
    MuiAutocomplete: {
      styleOverrides: {
        input: {
          textTransform: 'capitalize',
        },
        option: {
          textTransform: 'capitalize',
        },
      },
    },
  },
});

export default theme;

import { useMediaQuery, useTheme } from '@mui/material';

const useMobileBreakpoint = () => {
  const theme = useTheme();
  const isMobileBreakpoint = useMediaQuery(theme.breakpoints.down('sm'));

  return {
    isMobileBreakpoint,
  };
};

export default useMobileBreakpoint;

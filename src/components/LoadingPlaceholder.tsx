import { Grid, Skeleton, Card, Stack } from '@mui/material';

const LoadingPlaceholder = ({ count }: { count: number }) => (
  <>
    {Array(count)
      .fill({})
      .map((_x, idx) => (
        <Grid item xs={3} key={`placeholder-${idx}`}>
          <Card variant="outlined">
            <Stack
              spacing={1}
              alignContent="center"
              alignItems="center"
              sx={{
                display: 'flex',
                flexDirection: 'column',
                height: {
                  xs: '50vh',
                  sm: '50vh',
                  md: '40vh',
                },
                padding: (theme) => theme.spacing(2),
              }}
            >
              <Skeleton
                animation="wave"
                variant="rectangular"
                height="calc(100% - 64px)"
                width="100%"
                sx={{ borderRadius: 1, mb: 2 }}
              />
              <Skeleton
                animation="wave"
                variant="rectangular"
                height="20px"
                width="110px"
                sx={{ borderRadius: 10 }}
              />
              <Skeleton
                animation="wave"
                variant="rectangular"
                height="16px"
                width="80px"
                sx={{ borderRadius: 10 }}
              />
            </Stack>
          </Card>
        </Grid>
      ))}
  </>
);

export default LoadingPlaceholder;

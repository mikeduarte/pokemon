import { Grid, Skeleton, Card, Stack } from '@mui/material';

const LoadingPlaceholder = ({ count }: { count: number }) => (
  <>
    {Array(count)
      .fill({})
      .map((_x, idx) => (
        <Grid
          item
          key={`placeholder-${idx}`}
          xs={12}
          sm={6}
          md={4}
          lg={3}
          sx={{
            aspectRatio: '1 / 1.25',
          }}
        >
          <Card variant="outlined" sx={{ height: '100%' }}>
            <Stack
              spacing={1}
              alignContent="center"
              alignItems="center"
              sx={{
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
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

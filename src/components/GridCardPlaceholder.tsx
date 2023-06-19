import { Grid, Skeleton, Card, Stack } from '@mui/material';
import gridCard from './styles/gridCard';

const GridCardPlaceholder = ({ count }: { count: number }) => (
  <>
    {Array(count)
      .fill({})
      .map((_x, idx) => (
        <Grid
          data-testid="grid-card-placeholder"
          item
          key={`placeholder-${idx}`}
          aria-disabled="true"
          aria-label="loading"
          {...gridCard}
        >
          <Card variant="outlined" sx={{ height: '100%' }}>
            <Stack
              spacing={1}
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
                height="100%"
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

export default GridCardPlaceholder;

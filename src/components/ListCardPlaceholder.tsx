import { Grid, Skeleton, Card, Stack } from '@mui/material';

const ListCardPlaceholder = ({ count }: { count: number }) => (
  <>
    {Array(count)
      .fill({})
      .map((_x, idx) => (
        <Grid item xs={12} key={`placeholder-${idx}`} aria-disabled="true" aria-label="loading">
          <Card variant="outlined">
            <Stack direction="row" spacing={2.5} alignItems="center" height="100px">
              <Skeleton animation="wave" variant="rectangular" height="100%" width="120px" />
              <Stack spacing={1.5}>
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
            </Stack>
          </Card>
        </Grid>
      ))}
  </>
);

export default ListCardPlaceholder;

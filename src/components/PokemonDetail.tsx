import { useParams } from 'react-router-dom';
import {
  Avatar,
  Badge,
  Card,
  CardHeader,
  CardMedia,
  Chip,
  Divider,
  Grid,
  Modal,
  Stack,
  Typography,
  Button,
  Box,
} from '@mui/material';

import { useGetPokemon } from '../api/hooks';
import FavoriteButton from './common/FavoriteButton';
import PokemonLoader from './common/PokemonLoader';

const PokemonSound = ({ audio }: { audio: string }) => {
  const handleButtonClick = () => {
    new Audio(audio).play();
  };

  return <Button onClick={handleButtonClick}>Play</Button>;
};

const PokemonDetail = () => {
  const { id } = useParams() as { id: string };
  const { isLoading, data: pokemon } = useGetPokemon(id);

  return (
    <Modal open>
      <Stack
        sx={{
          height: '100%',
          backgroundColor: 'background.paper',
        }}
      >
        {isLoading && <PokemonLoader />}
        {!isLoading && pokemon && (
          <Grid container height="100%" maxWidth="sm" m="auto">
            <Card
              variant="outlined"
              sx={{
                position: 'relative',
                width: '100%',
                height: '80vh',
                m: 'auto',
              }}
            >
              <CardHeader
                sx={{ position: 'absolute', right: '12px', top: '8px', p: 0, zIndex: 1 }}
                action={<FavoriteButton id={pokemon.id} isFavorite={pokemon.isFavorite} />}
              />
              <Box sx={{ position: 'absolute', left: '12px', top: '8px', p: 0, zIndex: 1 }}>
                <PokemonSound audio={pokemon.sound} />
              </Box>
              <Stack height="100%">
                <CardMedia
                  component="img"
                  image={pokemon?.image}
                  alt={pokemon?.name}
                  sx={{
                    objectFit: 'scale-down',
                    maxWidth: '100%',
                    flexGrow: 1,
                    height: '1px',
                  }}
                />
                <Stack
                  direction="column"
                  alignItems="center"
                  sx={{
                    padding: (theme) => theme.spacing(3, 0, 0, 0),
                  }}
                >
                  <Typography variant="h6">{pokemon?.name}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {pokemon?.types?.join(', ')}
                  </Typography>
                  {!isLoading && (
                    <Stack
                      width="100%"
                      direction="row"
                      justifyContent="space-between"
                      sx={{
                        mt: 2,
                        p: (theme) => theme.spacing(2, 0, 2, 0),
                        backgroundColor: (theme) => theme.palette.grey[100],
                      }}
                    >
                      <Stack
                        width="100%"
                        alignItems="center"
                        justifyContent="space-between"
                        spacing={2}
                        sx={{
                          px: 4,
                        }}
                      >
                        <Typography variant="subtitle1" component="h2">
                          Stats
                        </Typography>
                        <Stack width="100%">
                          <Stack direction="row" justifyContent="space-between">
                            <Typography variant="caption" fontWeight="bold">
                              Weight
                            </Typography>
                            <Typography variant="body2">
                              {pokemon?.weight.minimum} - {pokemon?.weight.maximum}
                            </Typography>
                          </Stack>
                          <Divider
                            flexItem
                            light
                            variant="middle"
                            sx={{
                              my: 1,
                            }}
                          />
                          <Stack direction="row" justifyContent="space-between">
                            <Typography variant="caption" fontWeight="bold">
                              Height
                            </Typography>
                            <Typography variant="body2">
                              {pokemon?.height.minimum} - {pokemon?.height.maximum}
                            </Typography>
                          </Stack>
                        </Stack>
                        <Stack direction="row" spacing={1}>
                          <Chip
                            size="small"
                            variant="outlined"
                            avatar={<Avatar sx={{ color: 'white !important' }}>CP</Avatar>}
                            label={pokemon?.maxCP}
                            color="primary"
                            sx={{
                              background: 'white',
                            }}
                          />
                          <Chip
                            size="small"
                            variant="outlined"
                            avatar={<Avatar sx={{ color: 'white !important' }}>HP</Avatar>}
                            label={pokemon?.maxHP}
                            color="secondary"
                            sx={{
                              background: 'white',
                            }}
                          />
                        </Stack>
                      </Stack>
                      {!!pokemon?.evolutions?.length && (
                        <>
                          <Divider orientation="vertical" flexItem light />
                          <Stack width="100%" alignItems="center">
                            <Typography variant="subtitle1" component="h2">
                              Evolutions
                            </Typography>
                            <Stack direction="row" spacing={2} mt={1}>
                              {pokemon?.evolutions.map((evolution) => (
                                <Badge
                                  key={evolution.id}
                                  overlap="circular"
                                  anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                  badgeContent={
                                    <FavoriteButton
                                      id={evolution.id}
                                      isFavorite={evolution.isFavorite}
                                      parentId={pokemon.id}
                                    />
                                  }
                                >
                                  <Avatar
                                    //key={evolution.id}
                                    alt={evolution.name}
                                    src={evolution.image}
                                    sx={{
                                      width: 80,
                                      height: 80,
                                      backgroundColor: 'white',
                                      //boxShadow: (theme) => theme.shadows[1],
                                    }}
                                    imgProps={{
                                      sx: {
                                        objectFit: 'contain',
                                        p: 1.5,
                                      },
                                    }}
                                  />
                                </Badge>
                              ))}
                            </Stack>
                          </Stack>
                        </>
                      )}
                    </Stack>
                  )}
                </Stack>
              </Stack>
            </Card>
          </Grid>
        )}
      </Stack>
    </Modal>
  );
};

export default PokemonDetail;

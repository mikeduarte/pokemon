import { rest } from 'msw';
import pokemonPageableOne from '../../__mocks__/pokemonPageableOne.json';
import pokemonPageableTwo from '../../__mocks__/pokemonPageableTwo.json';
import pokemonPageableOneSearch from '../../__mocks__/pokemonPageableOneSearch.json';
import pokemonPageableOneType from '../../__mocks__/pokemonPageableOneType.json';
import pokemonPageableOneFavorites from '../../__mocks__/pokemonPageableOneFavorites.json';
import pokemonTypes from '../../__mocks__/pokemonTypes.json';
import pokemon from '../../__mocks__/pokemon.json';

const handlers = [
  // ----------------------------------------------------------------------
  // GET
  // ----------------------------------------------------------------------
  rest.get(/\/pokemon\/$/, (req, res, ctx) => {
    const offset = req.url.searchParams.getAll('offset')?.[0];
    const isFavorite = req.url.searchParams.getAll('isFavorite')?.[0];
    const type = req.url.searchParams.getAll('type')?.[0];
    const search = req.url.searchParams.getAll('search')?.[0];

    if (search === 'Bul') return res(ctx.json(pokemonPageableOneSearch));
    if (type === 'Grass') return res(ctx.json(pokemonPageableOneType));
    if (isFavorite === 'true') return res(ctx.json(pokemonPageableOneFavorites));
    if (offset === '0') return res(ctx.delay(2000), ctx.json(pokemonPageableOne));

    return res(ctx.delay(2000), ctx.json(pokemonPageableTwo));
  }),
  rest.get(/\/pokemon\/[0-9]{3}/, (_req, res, ctx) => {
    return res(ctx.delay(2000), ctx.json(pokemon));
  }),
  rest.get(/\/pokemon-types/, (_req, res, ctx) => {
    return res(ctx.json(pokemonTypes));
  }),
  // ----------------------------------------------------------------------
  // POST
  // ----------------------------------------------------------------------
  rest.post(/\/pokemon\/.+\/favorite/, (_req, res, ctx) => {
    return res(ctx.delay(2000), ctx.json({}));
  }),
];

export default handlers;

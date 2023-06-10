import { rest } from 'msw';
import mockPokemon from '../../__mocks__/pokemon.json';

const handlers = [
  // ----------------------------------------------------------------------
  // GET
  // ----------------------------------------------------------------------
  rest.get(/\/pokemon\/[0-9]{3}/, (_req, res, ctx) => {
    return res(ctx.json(mockPokemon));
  }),
  // ----------------------------------------------------------------------
  // POST
  // ----------------------------------------------------------------------
  rest.post(/\/pokemon\/.+\/favorite/, (_req, res, ctx) => {
    return res(ctx.delay(2000), ctx.json({}));
  }),
];

export default handlers;

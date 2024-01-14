import { rest, graphql } from 'msw';
import pokemonPageableOne from '../../__mocks__/pokemonPageableOne.json';
import pokemonPageableTwo from '../../__mocks__/pokemonPageableTwo.json';
import pokemonPageableOneType from '../../__mocks__/pokemonPageableOneType.json';
import pokemonTypes from '../../__mocks__/pokemonTypes.json';
import pokemon from '../../__mocks__/pokemon.json';
import { TOTAL_LIMIT } from '../../../config';

const handlers = [
  // ----------------------------------------------------------------------
  // GET
  // ----------------------------------------------------------------------
  graphql.query('pokemons', ({ variables }, res, ctx) => {
    if (variables.limit === TOTAL_LIMIT) {
      return res(ctx.data({ ...pokemonPageableOne.data }));
    }

    if (variables.limit !== TOTAL_LIMIT && variables.offset === 0) {
      return res(ctx.delay(2000), ctx.data({ ...pokemonPageableOne.data }));
    }

    return res(ctx.delay(2000), ctx.data({ ...pokemonPageableTwo.data }));
  }),
  rest.get(/\/pokemon\/[0-9]{1}/, (_req, res, ctx) => {
    return res(ctx.delay(2000), ctx.json(pokemon));
  }),
  rest.get(/\/type\/grass/, (_req, res, ctx) => {
    return res(ctx.json(pokemonPageableOneType));
  }),
  rest.get(/\/type/, (_req, res, ctx) => {
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

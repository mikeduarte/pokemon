import { rest } from 'msw';

const handlers = [
  rest.get('*', (_req, res, ctx) => res(ctx.status(400), ctx.json({}))),
  rest.post('*', (_req, res, ctx) => res(ctx.status(400), ctx.json({}))),
  rest.put('*', (_req, res, ctx) => res(ctx.status(400), ctx.json({}))),
  rest.patch('*', (_req, res, ctx) => res(ctx.status(400), ctx.json({}))),
  rest.delete('*', (_req, res, ctx) => res(ctx.status(400), ctx.json({}))),
];

export default handlers;

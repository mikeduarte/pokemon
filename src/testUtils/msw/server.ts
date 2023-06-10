import { setupServer } from 'msw/node';
import { handlers } from './handlers';

const requestHandlers = [...handlers];

const server = setupServer(...requestHandlers);

export default server;

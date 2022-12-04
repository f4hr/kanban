import { setupServer } from 'msw/node';
import { rest } from 'msw';

import { initHandlers } from './handlers';

const handlers = initHandlers();

const server = setupServer(...handlers);

export { server, rest };

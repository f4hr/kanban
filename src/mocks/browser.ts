import { setupWorker } from 'msw';

import { initHandlers } from './handlers';

const handlers = initHandlers();

export const worker = setupWorker(...handlers);

export default worker;

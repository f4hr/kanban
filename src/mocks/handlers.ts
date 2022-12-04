import { handlers as authHandlers } from './handlers/auth';
import { handlers as usersHandlers } from './handlers/users';
import { handlers as boardsHandlers } from './handlers/boards';
import { handlers as listsHandlers } from './handlers/lists';
import { handlers as cardsHandlers } from './handlers/cards';
import { initStorage } from './index';

export const handlers = [
  ...authHandlers,
  ...usersHandlers,
  ...boardsHandlers,
  ...listsHandlers,
  ...cardsHandlers,
];

export const initHandlers = () => {
  initStorage();
  return handlers;
};

export default initHandlers;

import auth from './auth';
import users from './userRepo';
import boards from './boardRepo';
import lists from './listRepo';
import cards from './cardRepo';

// TODO: replace "any" type with "unknown"
export type DefaultPayload = any;
export type DefaultData = any;

export interface Repository<TPayload = DefaultPayload, TData = DefaultData> {
  getAll?: (payload?: TPayload) => Promise<TData>;
  create?: (payload: TPayload) => Promise<void | TData>;
  update?: (payload: TPayload) => Promise<void | TData>;
  delete?: (payload: TPayload) => Promise<void | TData>;
}

export default {
  auth,
  users,
  boards,
  lists,
  cards,
};

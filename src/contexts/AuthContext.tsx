import { createContext } from 'react';

export type AuthContextValue = {
  user: {
    userId: string;
    token: string;
  } | null;
  loggedIn: boolean;
  logIn: (payload: { email: string; password: string }) => Promise<void>;
  logOut: () => void;
};

export const AuthContext = createContext({} as AuthContextValue);

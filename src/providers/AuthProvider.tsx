import React, { useCallback, useMemo, useState } from 'react';

import apiClient from '../services/apiClient';
import { storage } from '../utils/storage';
import { AuthContext } from '../contexts/AuthContext';

type User = {
  userId: string;
  token: string;
};

export function AuthProvider({ children }: React.PropsWithChildren) {
  const [user, setUser] = useState<User | null>(storage.getUser());
  const [loggedIn, setLoggedIn] = useState<boolean>(user != null);

  const logIn = useCallback(async (payload: { email: string; password: string }) => {
    const loggedInUser: User | null = (await apiClient.auth.login(payload)) || null;

    if (!loggedInUser) {
      setLoggedIn(false);
      return;
    }

    storage.setUser(loggedInUser);
    setUser(loggedInUser);
    setLoggedIn(true);
  }, []);

  const logOut = () => {
    storage.removeUser();
    setUser(null);
    setLoggedIn(false);
  };

  const value = useMemo(
    () => ({
      user,
      loggedIn,
      logIn,
      logOut,
    }),
    [user, loggedIn, logIn],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

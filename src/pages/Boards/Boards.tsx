import React from 'react';
import { Redirect } from 'wouter';

// Utils
import routes from '../../routes';
// Hooks
import { useAuth } from '../../hooks';
// Components
import { Boards as BoardsComponent } from '../../features/Boards';

export function Boards() {
  const { user } = useAuth();

  if (!user) {
    return <Redirect to={routes.loginPath()} />;
  }

  return <BoardsComponent userId={user.userId} />;
}

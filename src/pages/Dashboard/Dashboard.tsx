import React from 'react';
import { Redirect } from 'wouter';

// Utils
import routes from '../../routes';
// Hooks
import { useAuth } from '../../hooks';
// Components
import { Dashboard as DashboardComponent } from '../../features/Dashboard';

export function Dashboard() {
  const { user } = useAuth();

  if (!user) {
    return <Redirect to={routes.loginPath()} />;
  }

  return <DashboardComponent userId={user.userId} />;
}

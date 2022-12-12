import React from 'react';
import { Router, Switch, Route, Redirect } from 'wouter';

import type { RouteProps } from 'wouter';

import './App.css';
import routes from './routes';
import { useAuth } from './hooks';
import { Dashboard } from './pages/Dashboard';
import { NoMatch } from './pages/NoMatch';
import { Login } from './pages/Login';
import { Signup } from './pages/Signup';
import { Board } from './pages/Board';
import { Boards } from './pages/Boards';
import { Settings } from './pages/Settings';
import { Account } from './pages/Account';

function ProtectedRoute({ path, children }: RouteProps) {
  const { loggedIn } = useAuth();

  if (!loggedIn) {
    return <Redirect to={routes.loginPath()} />;
  }

  return <Route path={path}>{children}</Route>;
}

export function App() {
  return (
    <Router>
      <Switch>
        <ProtectedRoute path={routes.homePath()}>
          <Redirect to={routes.dashboardPath()} />
        </ProtectedRoute>
        <ProtectedRoute path={routes.dashboardPath()}>
          <Dashboard />
        </ProtectedRoute>
        <ProtectedRoute path={routes.boardPath(':boardId')}>
          {({ boardId }) => (boardId ? <Board boardId={boardId} /> : <NoMatch />)}
        </ProtectedRoute>
        <ProtectedRoute path={routes.boardsPath()}>
          <Boards />
        </ProtectedRoute>
        <ProtectedRoute path={routes.settingsPath()}>
          <Settings />
        </ProtectedRoute>
        <ProtectedRoute path={routes.accountPath()}>
          <Account />
        </ProtectedRoute>
        <Route path={routes.loginPath()}>
          <Login />
        </Route>
        <Route path={routes.signupPath()}>
          <Signup />
        </Route>
        <Route>
          <NoMatch />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;

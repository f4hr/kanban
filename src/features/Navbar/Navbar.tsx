import React from 'react';
import { IconGauge, IconAdjustments } from '@tabler/icons';

import './Navbar.css';
// Utils
import routes from '../../routes';
// Hooks
import { useAuth } from '../../hooks';
// Components
import { Button, Code, ScrollArea, LinksGroup } from '../../components';
import { BoardList } from './BoardList';
import { UserButton } from './UserButton';

export function Navbar() {
  const { logOut, user } = useAuth();

  return (
    <div className="navbar">
      <div className="navbar__section navbar__header">
        <span className="navbar__title">Kanban</span>
        <Code className="font-bold">v0.1.0</Code>
      </div>
      <div className="navbar__section grow">
        <ScrollArea>
          <ul className="navbar__list">
            <li>
              <LinksGroup
                key="dashboard"
                label="Dashboard"
                icon={<IconGauge size={18} />}
                to={routes.dashboardPath()}
              />
            </li>
            <li>
              <BoardList />
            </li>
            <li>
              <LinksGroup
                key="settings"
                label="Settings"
                icon={<IconAdjustments size={18} />}
                to={routes.settingsPath()}
              />
            </li>
          </ul>
        </ScrollArea>
      </div>
      <div className="navbar__section p-4">
        <UserButton className="mb-3" userId={user?.userId} color="accent" />
        <Button
          className="uppercase"
          type="button"
          variant="outline"
          fullWidth
          size="sm"
          onClick={() => logOut()}
        >
          Log Out
        </Button>
      </div>
    </div>
  );
}

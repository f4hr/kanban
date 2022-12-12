import React from 'react';
import cn from 'classnames';
import { IconGauge, IconNotes, IconAdjustments, IconUser } from '@tabler/icons';

import './Tapbar.css';
// Utils
import routes from '../../routes';
// Components
import { NavLink } from '../../components/NavLink';

const iconSize = 24;
const links = [
  { to: routes.dashboardPath(), title: 'Dashboard', icon: <IconGauge size={iconSize} /> },
  { to: routes.boardsPath(), title: 'Boards', icon: <IconNotes size={iconSize} /> },
  { to: routes.settingsPath(), title: 'Settings', icon: <IconAdjustments size={iconSize} /> },
  { to: routes.accountPath(), title: 'Account', icon: <IconUser size={iconSize} /> },
];

export function Tapbar() {
  return (
    <div className="tapbar">
      <ul className="tapbar__list">
        {links.map(({ title, icon, to }) => (
          <li key={title} className="tapbar__item">
            <NavLink
              className={({ isActive }) =>
                cn('tapbar__item-link', { 'tapbar__item-link--active': isActive })
              }
              to={to}
              title={title}
            >
              <span className="tapbar__item-icon">{icon}</span>
              <span className="tapbar__item-title">{title}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
}

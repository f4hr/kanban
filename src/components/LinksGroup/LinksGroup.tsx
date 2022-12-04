import React, { useEffect, useState } from 'react';
import cn from 'classnames';
import { IconChevronRight } from '@tabler/icons';

import './LinksGroup.css';
// Utils
import { storage } from '../../utils/storage';
// Components
import { NavLink } from '../NavLink';
import { Button } from '../Button';
import { Collapsible } from '../Collapsible';
import { ThemeIcon } from '../ThemeIcon';

interface LinksGroupProps {
  children?: React.ReactNode;
  icon?: React.ReactNode;
  label: string;
  links?: { label: string; link: string; active?: boolean }[];
  to: string;
  defaultOpen?: boolean;
  preserveStateKey?: string | false;
}

export function LinksGroup({
  children,
  icon,
  label,
  links,
  to,
  defaultOpen = false,
  preserveStateKey = false,
}: LinksGroupProps) {
  const hasLinks = Array.isArray(links) && links.length > 0;
  const [opened, setOpened] = useState<boolean>(defaultOpen);

  useEffect(() => {
    if (preserveStateKey) storage.setItem(preserveStateKey, opened);
  }, [opened, preserveStateKey]);

  const ChevronIcon = IconChevronRight;
  const items = (hasLinks ? links : []).map((link) => (
    <NavLink
      className={cn('links-group__link', { 'links-group__link--active': link.active })}
      key={link.label}
      to={link.link}
    >
      {link.label}
    </NavLink>
  ));

  const linkIcon = icon ? (
    <ThemeIcon className="links-group__control-icon" variant="light" role="presentation">
      {icon}
    </ThemeIcon>
  ) : null;

  if (!hasLinks && !children) {
    return (
      <NavLink
        className={({ isActive }) =>
          cn('links-group__control', { 'links-group__control--active': isActive })
        }
        to={to}
      >
        <span className="links-group__control-content">
          {linkIcon}
          <span className="ml-3">{label}</span>
        </span>
      </NavLink>
    );
  }

  return (
    <>
      <Button
        onClick={() => setOpened((o) => !o)}
        className="links-group__control"
        variant="unstyled"
      >
        <span className="links-group__control-content">
          {linkIcon}
          <span className="ml-3">{label}</span>
        </span>
        {hasLinks || children ? (
          <ChevronIcon
            className={cn('links-group__chevron', { 'links-group__chevron--opened': opened })}
            size={14}
            stroke={1.5}
          />
        ) : null}
      </Button>
      {hasLinks || children ? (
        <Collapsible open={opened}>
          {items}
          {children}
        </Collapsible>
      ) : null}
    </>
  );
}

LinksGroup.defaultProps = {
  children: null,
  icon: null,
  links: [],
  defaultOpen: false,
  preserveStateKey: false,
};

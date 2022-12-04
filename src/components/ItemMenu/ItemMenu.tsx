import React from 'react';
import * as DropdownMenuBase from '@radix-ui/react-dropdown-menu';

import type {
  DropdownMenuProps,
  DropdownMenuTriggerProps,
  DropdownMenuItemProps,
} from '@radix-ui/react-dropdown-menu';

import './ItemMenu.css';

function ItemMenuTrigger({ children, ...props }: DropdownMenuTriggerProps) {
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <DropdownMenuBase.Trigger className="item-menu__trigger" {...props}>
      {children}
    </DropdownMenuBase.Trigger>
  );
}

function ItemMenuItem({ children }: DropdownMenuItemProps) {
  return <DropdownMenuBase.Item className="item-menu__item">{children}</DropdownMenuBase.Item>;
}

interface IItemMenuProps extends DropdownMenuProps {
  trigger: React.ReactNode;
}

// FIXME: check keyboard navigation
export function ItemMenu({ trigger, children }: IItemMenuProps) {
  return (
    <DropdownMenuBase.Root>
      {trigger}
      <DropdownMenuBase.Portal>
        <DropdownMenuBase.Content className="item-menu">
          {children}
          <DropdownMenuBase.Arrow className="item-menu__arrow fill-main-500" />
        </DropdownMenuBase.Content>
      </DropdownMenuBase.Portal>
    </DropdownMenuBase.Root>
  );
}

ItemMenu.Trigger = ItemMenuTrigger;
ItemMenu.Item = ItemMenuItem;

import React from 'react';
import * as CollapsibleBase from '@radix-ui/react-collapsible';

import type { CollapsibleProps as CollapsibleBaseProps } from '@radix-ui/react-collapsible';

import './Collapsible.css';

export function Collapsible({ children, open = false }: CollapsibleBaseProps) {
  return (
    <CollapsibleBase.Root className="collapsible" open={open}>
      <CollapsibleBase.Content className="collapsible__content">{children}</CollapsibleBase.Content>
    </CollapsibleBase.Root>
  );
}

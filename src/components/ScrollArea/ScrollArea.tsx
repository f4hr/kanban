import React from 'react';
import * as ScrollAreaBase from '@radix-ui/react-scroll-area';

import './ScrollArea.css';

export function ScrollArea({ children }: React.PropsWithChildren) {
  return (
    <ScrollAreaBase.Root className="scroll-area">
      <ScrollAreaBase.Viewport className="scroll-area__viewport">
        {children}
      </ScrollAreaBase.Viewport>
      <ScrollAreaBase.Scrollbar className="scroll-area__scrollbar" orientation="horizontal">
        <ScrollAreaBase.Thumb className="scroll-area__thumb" />
      </ScrollAreaBase.Scrollbar>
      <ScrollAreaBase.Scrollbar className="scroll-area__scrollbar" orientation="vertical">
        <ScrollAreaBase.Thumb className="scroll-area__thumb" />
      </ScrollAreaBase.Scrollbar>
      <ScrollAreaBase.Corner className="scroll-area__corner" />
    </ScrollAreaBase.Root>
  );
}

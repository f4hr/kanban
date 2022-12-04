import React from 'react';
import * as ToastBase from '@radix-ui/react-toast';

import type { ToastOptions } from '../../contexts/ToastContext';

interface ToastProps extends Pick<ToastOptions, 'type' | 'title' | 'description'> {
  open: boolean;
  setOpen: (isOpened: boolean) => void;
}

export function Toast({ type = 'info', title, description, open, setOpen }: ToastProps) {
  return (
    <>
      <ToastBase.Root className={`toast toast--${type}`} open={open} onOpenChange={setOpen}>
        <ToastBase.Title className="toast__title">{title}</ToastBase.Title>
        {description ? (
          <ToastBase.Description asChild>
            <div className="toast__description">{description}</div>
          </ToastBase.Description>
        ) : null}
      </ToastBase.Root>
      <ToastBase.Viewport className="toast__viewport" />
    </>
  );
}

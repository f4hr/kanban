import React, { useState, useMemo } from 'react';
import * as ToastBase from '@radix-ui/react-toast';

import type { ToastProviderProps } from '@radix-ui/react-toast';

import '../components/Toast/Toast.css';
// Components
import { ToastContext } from '../contexts/ToastContext';
import { Toast } from '../components';
// Types
import type { Toast as ToastType, ToastOptions } from '../contexts/ToastContext';

const defaultOptions: ToastOptions = {
  type: 'info',
  title: null,
};

export function ToastProvider({ children }: ToastProviderProps) {
  const [open, setOpen] = useState<boolean>(false);
  const [options, setOptions] = useState<ToastOptions>(defaultOptions);

  const value = useMemo<ToastType>(
    () => ({
      show(opts) {
        setOptions(opts);
        setOpen(true);
      },
    }),
    [],
  );

  return (
    <ToastContext.Provider value={value}>
      <ToastBase.Provider swipeDirection="right">
        {children}
        <Toast
          type={options.type}
          title={options.title}
          description={options.description}
          open={open}
          setOpen={setOpen}
        />
      </ToastBase.Provider>
    </ToastContext.Provider>
  );
}

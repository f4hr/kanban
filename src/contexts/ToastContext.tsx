import { createContext } from 'react';

type ToastType = 'info' | 'success' | 'error';

export interface ToastOptions {
  type?: ToastType;
  title: React.ReactNode;
  description?: React.ReactNode;
}

export type Toast = {
  show: (options: ToastOptions) => void;
};

export const ToastContext = createContext({} as Toast);

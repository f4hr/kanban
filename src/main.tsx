import React from 'react';
import ReactDOM from 'react-dom/client';

import './index.css';
import { AuthProvider } from './providers/AuthProvider';
import { AuthedQueryClientProvider } from './providers/AuthedQueryClientProvider';
import { ThemeProvider } from './providers/ThemeProvider';
import { App } from './App';
import { ToastProvider } from './providers/ToastProvider';

if (import.meta.env.VITE_MOCK_SERVER === 'true') {
  // eslint-disable-next-line global-require, @typescript-eslint/no-var-requires, @typescript-eslint/no-unsafe-assignment
  const { worker } = require('./mocks/browser');

  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
  worker.start();
}

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <AuthProvider>
    <AuthedQueryClientProvider>
      <ThemeProvider>
        <ToastProvider>
          <App />
        </ToastProvider>
      </ThemeProvider>
    </AuthedQueryClientProvider>
  </AuthProvider>,
);

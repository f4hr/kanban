import React from 'react';
import ReactDOM from 'react-dom/client';

import './index.css';
import { AuthProvider } from './providers/AuthProvider';
import { AuthedQueryClientProvider } from './providers/AuthedQueryClientProvider';
import { ThemeProvider } from './providers/ThemeProvider';
import { App } from './App';
import { ToastProvider } from './providers/ToastProvider';

function init() {
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
}

if (import.meta.env.DEV && import.meta.env.VITE_MOCK_SERVER) {
  import('./mocks/browser')
    .then(({ worker }) => worker.start())
    .then(() => init())
    // eslint-disable-next-line no-console
    .catch((err) => console.warn(err));
} else {
  init();
}

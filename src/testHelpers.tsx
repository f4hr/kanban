import fetch from 'node-fetch';
import ResizeObserver from 'resize-observer-polyfill';
import React from 'react';
import { render } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Router } from 'wouter';
import { DragDropContext } from 'react-beautiful-dnd';

import type { DropResult } from 'react-beautiful-dnd';

// Components
import { ThemeProvider } from './providers/ThemeProvider';
import { ToastProvider } from './providers/ToastProvider';
// Types
import type { ThemeMode } from './providers/ThemeProvider';

/**
 * Polyfills
 */
// @ts-ignore
globalThis.fetch = fetch;

globalThis.ResizeObserver = ResizeObserver;

function createTestQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
    logger: {
      log: console.log,
      warn: console.warn,
      error: () => {},
    },
  });
}

export function createThemeWrapper() {
  return ({ children }: { children: React.ReactNode }) => <ThemeProvider>{children}</ThemeProvider>;
}

export function createQueryWrapper() {
  const testQueryClient = createTestQueryClient();
  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={testQueryClient}>{children}</QueryClientProvider>
  );
}

// Wrappers
export function wrapWithQueryClient(ui: React.ReactNode) {
  const testQueryClient = createTestQueryClient();
  return <QueryClientProvider client={testQueryClient}>{ui}</QueryClientProvider>;
}

export function wrapWithTheme(ui: React.ReactNode, options?: { theme: ThemeMode }) {
  return <ThemeProvider theme={options?.theme}>{ui}</ThemeProvider>;
}

export function wrapWithRouter(ui: React.ReactNode, { route }: { route: string }) {
  return <Router base={route}>{ui}</Router>;
}

export function wrapWithDnd(ui: React.ReactNode, dragEndHandler: (result: DropResult) => void) {
  return <DragDropContext onDragEnd={dragEndHandler}>{ui}</DragDropContext>;
}

export function wrapWithToast(ui: React.ReactNode) {
  return <ToastProvider>{ui}</ToastProvider>;
}

// Renderers
export function renderWithQueryClient(ui: React.ReactNode) {
  return render(wrapWithQueryClient(ui));
}

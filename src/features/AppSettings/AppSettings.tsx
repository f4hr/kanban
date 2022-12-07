import React, { useState, useId } from 'react';

import './AppSettings.css';
// Layouts
import { Main } from '../../layouts/Main';
// Components
import { Button, Loader } from '../../components';
import { ThemeSettings } from './ThemeSettings';
import { Status } from '../../types';

export function AppSettings() {
  const componentId = useId();

  const [state, setState] = useState<Status>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setState('loading');

    return Promise.resolve(
      setTimeout(() => {
        setState('success');
      }, 200),
    );
  };

  return (
    <Main title={<h1>Settings</h1>}>
      <div className="app-settings">
        <form
          onSubmit={(e) => {
            handleSubmit(e).catch(() => {});
          }}
        >
          <section>
            <h2>Theme settings</h2>
            <ThemeSettings id={componentId} />
          </section>
          <Button type="submit" disabled={state === 'loading'}>
            {state === 'loading' ? <Loader className="stroke-white" size="sm" /> : 'Save'}
          </Button>
        </form>
      </div>
    </Main>
  );
}

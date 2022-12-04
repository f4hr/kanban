import React, { useState, useId } from 'react';

import './AppSettings.css';
// Layouts
import { Main } from '../../layouts/Main';
// Components
import { Button } from '../../components';
import { ThemeSettings } from './ThemeSettings';
import { Status } from '../../types';

export function AppSettings() {
  const componentId = useId();

  const [state, setState] = useState<Status>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setState('loading');

    return Promise.resolve(() => setState('success'));
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
            Save
          </Button>
        </form>
      </div>
    </Main>
  );
}

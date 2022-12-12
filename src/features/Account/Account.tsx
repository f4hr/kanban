import React from 'react';

// Layouts
import { Main } from '../../layouts/Main';
// Hooks
import { useAuth } from '../../hooks';
// Components
import { Button } from '../../components';

export function Account() {
  const { logOut } = useAuth();

  return (
    <Main title={<h1>Account</h1>}>
      <div className="account p-2.5">
        <Button type="button" variant="outline" onClick={() => logOut()}>
          Log Out
        </Button>
      </div>
    </Main>
  );
}

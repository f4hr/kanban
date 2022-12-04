import React from 'react';

import './Dashboard.css';
// Layouts
import { Main } from '../../layouts/Main';
// Components
import { BoardsComponent } from '../Boards';

export function Dashboard() {
  return (
    <Main title={<h1>Dashboard</h1>}>
      <div className="dashboard">
        <section>
          <h2>Boards</h2>
          <BoardsComponent />
        </section>
      </div>
    </Main>
  );
}

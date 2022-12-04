import React from 'react';

import './Dashboard.css';
// Layouts
import { Main } from '../../layouts/Main';
// Components
import { BoardsComponent } from '../Boards';

interface DashboardProps {
  userId: string;
}

export function Dashboard({ userId }: DashboardProps) {
  return (
    <Main title={<h1>Dashboard</h1>}>
      <div className="dashboard">
        <section>
          <h2>Boards</h2>
          <BoardsComponent userId={userId} />
        </section>
      </div>
    </Main>
  );
}

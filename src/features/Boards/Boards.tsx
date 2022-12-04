import React from 'react';

// Layouts
import { Main } from '../../layouts/Main';
// Components
import { BoardsComponent } from './BoardsComponent';

export function Boards() {
  return (
    <Main title={<h1>Boards</h1>}>
      <BoardsComponent className="p-2.5" />
    </Main>
  );
}

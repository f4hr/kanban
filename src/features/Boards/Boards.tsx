import React from 'react';

// Layouts
import { Main } from '../../layouts/Main';
// Components
import { BoardsComponent } from './BoardsComponent';

interface BoardsProps {
  userId: string;
}

export function Boards({ userId }: BoardsProps) {
  return (
    <Main title={<h1>Boards</h1>}>
      <BoardsComponent className="p-2.5" userId={userId} />
    </Main>
  );
}

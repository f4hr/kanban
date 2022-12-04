import React from 'react';

// Components
import { Board as BoardComponent } from '../../features/Board';

interface BoardProps {
  boardId: string;
}

export function Board({ boardId }: BoardProps) {
  return <BoardComponent boardId={boardId} />;
}

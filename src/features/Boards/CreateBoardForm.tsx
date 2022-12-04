import React from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useLocation } from 'wouter';

// Utils
import routes from '../../routes';
// Components
import { CreateItemForm } from '../../components';
// Types
import { Board } from '../../types';
import { useCreateBoard } from './mutations';

export function CreateBoardForm() {
  const [, setLocation] = useLocation();
  const queryClient = useQueryClient();

  // Mutations
  const { mutateAsync: createBoard } = useCreateBoard(queryClient);

  const handleCreateBoard = (name: string): Promise<void | Board> =>
    createBoard({ name }).then((board) => {
      if (board) {
        setLocation(routes.boardPath(board.id));
      }
      return board;
    });

  return (
    <CreateItemForm
      onCreateItem={handleCreateBoard}
      placeholder="Board name"
      submitText="Create board"
    />
  );
}

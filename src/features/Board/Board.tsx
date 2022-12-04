import React from 'react';
import { useQueryClient } from '@tanstack/react-query';

// Hooks
import { useToast } from '../../hooks';
import { useBoardQuery } from './queries';
import { useUpdateBoard } from './mutations';
// Layouts
import { Main } from '../../layouts/Main';
// Components
import { BoardComponent } from './BoardComponent';
import { RenameItemForm, Placeholder } from '../../components';
// Types
import type { Board as BoardType } from '../../types';

interface BoardProps {
  boardId: BoardType['id'];
}

export function Board({ boardId }: BoardProps) {
  const toast = useToast();
  const queryClient = useQueryClient();

  // Queries
  const { status, data } = useBoardQuery(boardId, {
    onError(err) {
      toast.show({ type: 'error', title: 'Error', description: err.message });
    },
  });

  // Mutations
  const updateBoard = useUpdateBoard(queryClient);

  // Handlers
  const handleRename = (name: string) => updateBoard.mutateAsync({ id: boardId, name });

  if (status === 'loading') {
    return (
      <Main
        title={
          <h1>
            <Placeholder className="w-1/6 h-7" title="Loading board..." />
          </h1>
        }
      />
    );
  }

  if (status === 'error' || !data) {
    return <Main title={<h1>Failed to load board</h1>} />;
  }

  return (
    <Main
      title={
        <RenameItemForm
          values={{ name: data.name }}
          onRename={handleRename}
          placeholder="Board name..."
          label="Board name"
          styles={{
            formContainer: 'inline-flex',
            input: 'font-bold text-xl bg-inherit',
          }}
          resetOnDefaultValuesChange
        />
      }
    >
      <BoardComponent
        boardId={boardId}
        listIds={data.listIds}
        lists={data.lists}
        cards={data.cards}
      />
    </Main>
  );
}

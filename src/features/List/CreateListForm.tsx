import React from 'react';
import { useQueryClient } from '@tanstack/react-query';

// Hooks
import { useCreateList } from './mutations';
// Components
import { CreateItemForm } from '../../components/CreateItemForm';
// Types
import type { List } from '../../types';

export function CreateListForm({ boardId }: { boardId: string }) {
  const queryClient = useQueryClient();

  // Mutations
  const { mutateAsync: createList } = useCreateList(queryClient);

  // TODO: on success scroll created list in to view
  const handleCreateList = (name: string): Promise<void | List> => createList({ boardId, name });

  return (
    <CreateItemForm
      onCreateItem={handleCreateList}
      placeholder="List name..."
      submitText="Create list"
    />
  );
}

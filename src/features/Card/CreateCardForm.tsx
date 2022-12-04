import React from 'react';
import { useQueryClient } from '@tanstack/react-query';

// Hooks
import { useCreateCard } from './mutations';
// Components
import { CreateItemForm } from '../../components/CreateItemForm';
// Types
import type { Card } from '../../types';

interface CreateCardFormProps {
  className?: string;
  boardId: string;
  listId: string;
}

export function CreateCardForm({ className, boardId, listId }: CreateCardFormProps) {
  const queryClient = useQueryClient();

  // Mutations
  const { mutateAsync: createCard } = useCreateCard(queryClient);

  const handleCreateCard = (name: string): Promise<void | Card> =>
    createCard({ boardId, listId, name });

  return (
    <CreateItemForm
      onCreateItem={handleCreateCard}
      placeholder="Card name..."
      submitText="Create card"
      styles={{
        formContainer: className,
      }}
    />
  );
}

CreateCardForm.defaultProps = {
  className: undefined,
};

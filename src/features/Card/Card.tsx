import React from 'react';
import { useQueryClient } from '@tanstack/react-query';
import cn from 'classnames';
import { IconSettings, IconTrash } from '@tabler/icons';

import './Card.css';
// Hooks
import { useToast } from '../../hooks';
import { useUpdateCard, useDeleteCard } from './mutations';
// Components
import { Button, ItemMenu, RenameItemForm } from '../../components';
// Types
import type { Card as CardType } from '../../types';

interface CardProps {
  card: CardType;
  dragHandle: React.ReactNode;
  isDragging?: boolean;
}

export function Card({ card, dragHandle, isDragging = false }: CardProps) {
  const toast = useToast();
  const queryClient = useQueryClient();

  // Mutations
  const mutations = {
    updateCard: useUpdateCard(queryClient),
    deleteCard: useDeleteCard(queryClient),
  };

  const handleMutation = async <T,>(mutation: Promise<T>): Promise<void | T> =>
    mutation.catch((err: Error) => {
      toast.show({ type: 'error', title: 'Error', description: err.message });
    });

  // Handlers
  const handlers = {
    cardDelete: () =>
      handleMutation(
        mutations.deleteCard.mutateAsync({
          id: card.id,
          boardId: card.boardId,
          listId: card.listId,
        }),
      ),
    cardRename: (name: string) =>
      handleMutation(
        mutations.updateCard.mutateAsync({
          id: card.id,
          boardId: card.boardId,
          listId: card.listId,
          name,
        }),
      ),
  };

  const isLoading = Object.values(mutations).some(({ status }) => status === 'loading');

  const cardClasses = cn('card', {
    'card--is-dragging': isDragging,
  });

  return (
    <div className={cardClasses}>
      {dragHandle}
      <RenameItemForm
        values={{ name: card.name }}
        onRename={handlers.cardRename}
        placeholder="Card name"
        label="Card name"
        styles={{
          formContainer: 'pr-5',
          input: 'bg-inherit max-md:text-base',
        }}
      />
      <ItemMenu
        trigger={
          <ItemMenu.Trigger asChild>
            <Button
              className="card__menu-btn"
              icon={<IconSettings size={16} />}
              variant="action-icon"
              title="Card settings"
            />
          </ItemMenu.Trigger>
        }
      >
        <ItemMenu.Item>
          <Button
            className="w-full text-left text-danger-600 dark:text-danger-100"
            onClick={handlers.cardDelete}
            variant="menu-item"
            icon={<IconTrash size={14} />}
            disabled={isLoading}
            fullWidth
          >
            Delete
          </Button>
        </ItemMenu.Item>
      </ItemMenu>
    </div>
  );
}

Card.defaultProps = {
  isDragging: false,
};

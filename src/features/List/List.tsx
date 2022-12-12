import React from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import cn from 'classnames';
import { IconSettings, IconTrash, IconGripVertical } from '@tabler/icons';

import type { DroppableProvided } from 'react-beautiful-dnd';

import './List.css';
// Hooks
import { useUpdateList, useDeleteList } from './mutations';
import { useToast } from '../../hooks';
// Components
import { Button, ItemMenu, RenameItemForm } from '../../components';
import { Card, CreateCardForm } from '../Card';
// Types
import type { List as ListType, Card as CardType } from '../../types';

type ListProps = {
  list: ListType;
  cards: CardType[];
  dragHandle: React.ReactNode;
  isDragging: boolean;
};

export function List({ list, cards, dragHandle, isDragging }: ListProps) {
  const { id, boardId } = list;

  const toast = useToast();
  const queryClient = useQueryClient();

  // Mutations
  const mutations = {
    updateList: useUpdateList(queryClient),
    deleteList: useDeleteList(queryClient),
  };

  const handleMutation = async <T,>(mutation: Promise<T>): Promise<void | T> =>
    mutation.catch((err: Error) => {
      toast.show({ type: 'error', title: 'Error', description: err.message });
    });

  // Handlers
  const handlers = {
    listUpdate: (listName: string) =>
      handleMutation(mutations.updateList.mutateAsync({ id, boardId, name: listName })),
    listDelete: () => handleMutation(mutations.deleteList.mutateAsync({ id, boardId })),
  };

  const isLoading = Object.values(mutations).some(({ status }) => status === 'loading');

  const headerContent = (
    <div className="list__title">
      <RenameItemForm
        values={{ name: list.name }}
        onRename={handlers.listUpdate}
        placeholder="List name..."
        label="List name"
        styles={{
          formContainer: 'pr-7',
          input: 'font-bold max-md:text-lg md:text-xl bg-inherit dark:text-main-300',
        }}
      />
      <ItemMenu
        trigger={
          <ItemMenu.Trigger asChild>
            <Button
              className="list__menu-btn"
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
            onClick={handlers.listDelete}
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

  const listClasses = cn('list', {
    'list--empty': cards.length === 0,
    'list--is-dragging': isDragging,
  });

  return (
    <div className={listClasses}>
      <div className="list__header mb-2">
        {dragHandle}
        {headerContent}
      </div>

      <Droppable droppableId={id} type="card">
        {(dropProvided: DroppableProvided) => (
          <div className="list__main">
            <div
              className="list__list"
              ref={dropProvided.innerRef}
              // eslint-disable-next-line react/jsx-props-no-spreading
              {...dropProvided.droppableProps}
            >
              <div className="list__drop-zone" aria-hidden="true" />
              {cards.map((card, index) => (
                <Draggable key={card.id} draggableId={card.id} index={index}>
                  {(dragProvided, snapshotCard) => (
                    <div
                      className="list__item"
                      ref={dragProvided.innerRef}
                      // eslint-disable-next-line react/jsx-props-no-spreading
                      {...dragProvided.draggableProps}
                    >
                      <Card
                        card={card}
                        dragHandle={
                          // eslint-disable-next-line react/jsx-props-no-spreading
                          <span {...dragProvided.dragHandleProps}>
                            <IconGripVertical
                              className="text-main-400 dark:text-main-300"
                              size={18}
                            />
                          </span>
                        }
                        isDragging={snapshotCard.isDragging}
                      />
                    </div>
                  )}
                </Draggable>
              ))}
              {dropProvided.placeholder}
            </div>
            <CreateCardForm boardId={boardId} listId={id} />
          </div>
        )}
      </Droppable>
    </div>
  );
}

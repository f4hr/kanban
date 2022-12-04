import React from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { Link } from 'wouter';
import cn from 'classnames';
import { IconSettings, IconTrash } from '@tabler/icons';

import './BoardItem.css';
// Hooks
import { useToast } from '../../hooks';
import { useDeleteBoard } from './mutations';
// Components
import { Button, ItemMenu } from '../../components';

export interface BoardItemProps {
  boardId: string;
  link: string;
  title: string;
}

export function BoardItem({ boardId, link, title }: BoardItemProps) {
  const toast = useToast();
  const queryClient = useQueryClient();

  // Mutations
  const { status, mutate: deleteBoard } = useDeleteBoard(queryClient);

  const handleDelete = () =>
    deleteBoard(boardId, {
      onError(err) {
        toast.show({ type: 'error', title: 'Error', description: err.message });
      },
    });

  const baseClasses = cn('board-item', {
    'board-item--error': status === 'error',
  });

  return (
    <div className={baseClasses}>
      <div className="board-item__content">
        <Link className="board-item__title" to={link}>
          {title}
        </Link>
        <ItemMenu
          trigger={
            <ItemMenu.Trigger asChild>
              <Button
                className="item-menu__toggle absolute top-0 right-0 text-main-600 dark:text-main-400"
                icon={<IconSettings size={16} />}
                variant="action-icon"
                title="Board settings"
              />
            </ItemMenu.Trigger>
          }
        >
          <ItemMenu.Item>
            <Button
              className="w-full text-left text-danger-600 dark:text-danger-100"
              onClick={handleDelete}
              variant="menu-item"
              icon={<IconTrash size={14} />}
              disabled={status === 'loading'}
              fullWidth
            >
              Delete
            </Button>
          </ItemMenu.Item>
        </ItemMenu>
      </div>
    </div>
  );
}

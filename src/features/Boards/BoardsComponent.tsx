import React from 'react';
import cn from 'classnames';

import './Boards.css';
// Utils
import routes from '../../routes';
// Hooks
import { useToast } from '../../hooks';
import { useBoardsQuery } from './queries';
// Components
import { BoardItem } from './BoardItem';
import { CreateBoardForm } from './CreateBoardForm';

interface BoardsComponentProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export function BoardsComponent({ className }: BoardsComponentProps) {
  const toast = useToast();

  // Queries
  const { status, data } = useBoardsQuery({
    onError(err) {
      toast.show({ type: 'error', title: 'Error', description: err.message });
    },
  });

  // TODO: show placeholder
  if (status === 'loading') {
    return <p className="sr-only">Loading boards...</p>;
  }

  if (status === 'error' || !data) {
    return <p>Failed to load board</p>;
  }

  const containerClasses = cn('boards', className);

  return (
    <div className={containerClasses}>
      {data.boards.length > 0 ? (
        <ul className="boards__list mb-3">
          {data.boards.map(({ id, name }) => (
            <li key={id}>
              <BoardItem boardId={id} link={routes.boardPath(id)} title={name} />
            </li>
          ))}
        </ul>
      ) : null}
      <ul className="boards__list">
        <li>
          <CreateBoardForm />
        </li>
      </ul>
    </div>
  );
}

BoardsComponent.defaultProps = {
  className: undefined,
};

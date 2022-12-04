import React, { useCallback } from 'react';
import { useRoute, Link } from 'wouter';
import { IconNotes } from '@tabler/icons';

// Utils
import routes from '../../routes';
import { storage } from '../../utils/storage';
// Hooks
import { useToast } from '../../hooks';
import { useBoardsQuery } from '../Boards/queries';
// Components
import { ThemeIcon, LinksGroup, Loader } from '../../components';

const STORAGE_UI_STATE_KEY = 'ui.navbar.boards';

interface BoardListProps {
  userId: string;
}

export function BoardList({ userId }: BoardListProps) {
  const toast = useToast();
  const [, params] = useRoute<{ boardId: string }>(routes.boardPath(':boardId'));

  // Queries
  const { status, data } = useBoardsQuery(userId, {
    onError(err) {
      toast.show({ type: 'error', title: 'Error', description: err.message });
    },
  });

  const getBoardLinks = useCallback(
    (boardsData: typeof data) =>
      boardsData
        ? boardsData.boards.map((b) => ({
            label: b.name,
            link: routes.boardPath(b.id),
            active: b.id === params?.boardId,
          }))
        : [],
    [params],
  );

  if (status !== 'success') {
    return (
      <Link className="links-group__control" to={routes.boardsPath()}>
        <span className="links-group__control-content">
          <ThemeIcon className="links-group__control-icon" variant="light">
            <IconNotes size={18} />
          </ThemeIcon>
          <span className="ml-3">Boards</span>
        </span>
        {status === 'loading' ? <Loader size="xs" /> : null}
      </Link>
    );
  }

  return (
    <LinksGroup
      key="boards"
      label="Boards"
      icon={<IconNotes size={18} />}
      links={getBoardLinks(data)}
      to={routes.boardsPath()}
      defaultOpen={storage.getItem(STORAGE_UI_STATE_KEY) ?? false}
      preserveStateKey={STORAGE_UI_STATE_KEY}
    />
  );
}

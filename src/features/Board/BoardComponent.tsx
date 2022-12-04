import React, { useEffect, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { Draggable } from 'react-beautiful-dnd';
import { IconGripVertical } from '@tabler/icons';

import './BoardComponent.css';
// Utils
import { generateCardMap } from './utils';
import { boardKeys } from '../../utils/queryKeyFactory';
// Hooks
import { useToast } from '../../hooks';
import { useReorderCards, useReorderLists } from './mutations';
// Components
import { BoardDnd } from './BoardDnd';
import { List, CreateListForm } from '../List';
// Types
import type { BoardDetails, List as ListType } from '../../types';
import type { CardMap } from './utils';

export type BoardProps = Pick<BoardDetails, 'boardId' | 'listIds' | 'lists' | 'cards'>;

export type BoardState = {
  lists: CardMap;
  ordered: ListType['id'][];
};

export function BoardComponent({ boardId, listIds, lists, cards }: BoardProps) {
  const toast = useToast();
  const queryClient = useQueryClient();

  const [state, setState] = useState<BoardState>({
    lists: generateCardMap(lists, cards),
    ordered: listIds,
  });

  useEffect(() => {
    setState({
      lists: generateCardMap(lists, cards),
      ordered: listIds,
    });
  }, [listIds, lists, cards]);

  // Mutations
  const mutations = {
    reorderLists: useReorderLists(),
    reorderCards: useReorderCards(),
  };

  const handleMutationSuccess = () => {
    // TODO: set query data
  };

  const handleMutationError = (err: Error) => {
    queryClient.invalidateQueries(boardKeys.detail(boardId)).catch(() => {});

    toast.show({ type: 'error', title: 'Error', description: err.message });
  };

  // Handlers
  const handleListReorder = (ids: ListType['id'][]) => {
    mutations.reorderLists.mutate(
      { id: boardId, listIds: ids },
      {
        onSuccess: handleMutationSuccess,
        onError: handleMutationError,
      },
    );
  };
  const handleCardReorder = (listItems: Pick<ListType, 'id' | 'cardIds'>[]) => {
    mutations.reorderCards.mutate(
      { id: boardId, lists: listItems },
      {
        onSuccess: handleMutationSuccess,
        onError: handleMutationError,
      },
    );
  };

  return (
    <BoardDnd
      state={state}
      setState={setState}
      onListReorder={handleListReorder}
      onCardReorder={handleCardReorder}
    >
      <div className="lists">
        {state.ordered.map((key, index) =>
          lists[key] ? (
            <Draggable key={key} draggableId={key} index={index}>
              {(providedDraggableList, snapshot) => (
                <div
                  ref={providedDraggableList.innerRef}
                  className="lists__item"
                  // eslint-disable-next-line react/jsx-props-no-spreading
                  {...providedDraggableList.draggableProps}
                >
                  <List
                    list={lists[key]}
                    cards={state.lists ? state.lists[key] : []}
                    isDragging={snapshot.isDragging}
                    dragHandle={
                      // eslint-disable-next-line react/jsx-props-no-spreading
                      <span {...providedDraggableList.dragHandleProps}>
                        <IconGripVertical className="text-main-400" size={20} />
                      </span>
                    }
                  />
                </div>
              )}
            </Draggable>
          ) : null,
        )}
        <div className="lists__item">
          <CreateListForm boardId={boardId} />
        </div>
      </div>
    </BoardDnd>
  );
}

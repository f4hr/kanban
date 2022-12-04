import React from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

import type { DropResult } from 'react-beautiful-dnd';

// Utils
import { ItemTypes } from '../../utils/dnd';
import { reorderListCardMap, reorder } from './utils';
// Types
import type { List as ListType, Card } from '../../types';
import type { BoardState } from './BoardComponent';

export interface BoardProps {
  children: React.ReactNode;
  state: BoardState;
  setState: (state: BoardState) => void;
  onListReorder: (listIds: ListType['id'][]) => void;
  onCardReorder: (lists: { id: Card['listId']; cardIds: Card['id'][] }[]) => void;
}

export function BoardDnd({ children, state, setState, onListReorder, onCardReorder }: BoardProps) {
  const onDragEnd = (result: DropResult) => {
    // Dropped nowhere
    if (!result.destination) {
      return;
    }

    const { source, destination } = result;

    // Did not move anywhere - can bail early
    if (source.droppableId === destination.droppableId && source.index === destination.index) {
      return;
    }

    // Reordering column
    if (result.type === ItemTypes.LIST) {
      const ordered: string[] = reorder(state.ordered, source.index, destination.index);

      setState({
        ...state,
        ordered,
      });

      // Handle list reorder
      onListReorder(ordered);

      return;
    }

    const orderedCardMap = reorderListCardMap({
      cardMap: state.lists,
      source,
      destination,
    });

    setState({
      ...state,
      lists: orderedCardMap,
    });

    // Handle card reorder
    const listsToReorder = [
      {
        id: source.droppableId,
        cardIds: orderedCardMap ? orderedCardMap[source.droppableId].map((c) => c.id) : [],
      },
    ];
    // Move card to different list
    if (source.droppableId !== destination.droppableId) {
      listsToReorder.push({
        id: destination.droppableId,
        cardIds: orderedCardMap ? orderedCardMap[destination.droppableId].map((c) => c.id) : [],
      });
    }
    // Handle card reorder
    onCardReorder(listsToReorder);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="board" type={ItemTypes.LIST} direction="horizontal">
        {(providedDroppableBoard) => (
          <div
            className="h-full"
            ref={providedDroppableBoard.innerRef}
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...providedDroppableBoard.droppableProps}
          >
            {children}
            {providedDroppableBoard.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}

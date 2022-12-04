import type { DraggableLocation } from 'react-beautiful-dnd';
// Types
import type { List, Card } from '../../types';
import type { BoardProps } from './BoardComponent';

export type CardMap = {
  [listId: List['id']]: Card[];
} | null;

type ReorderCardMapArgs = {
  cardMap: CardMap;
  source: DraggableLocation;
  destination: DraggableLocation;
};

const getListCards = (list: List, cards: BoardProps['cards']): Card[] =>
  list.cardIds.map((cardId) => cards[cardId]);

export const generateCardMap = (lists: BoardProps['lists'], cards: BoardProps['cards']): CardMap =>
  Object.keys(lists).reduce(
    (prev: CardMap, id) => ({
      ...prev,
      [id]: getListCards(lists[id], cards),
    }),
    {},
  );

export const reorder = <T>(lists: T[], startIndex: number, endIndex: number): T[] => {
  const result = Array.from(lists);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

export const reorderListCardMap = ({
  cardMap,
  source,
  destination,
}: ReorderCardMapArgs): CardMap => {
  if (cardMap == null) {
    return null;
  }

  const current: Card[] = [...cardMap[source.droppableId]];
  const next: Card[] = [...cardMap[destination.droppableId]];
  const target: Card = current[source.index];

  // moving to same list
  if (source.droppableId === destination.droppableId) {
    const reordered: Card[] = reorder(current, source.index, destination.index);
    const result: CardMap = {
      ...cardMap,
      [source.droppableId]: reordered,
    };
    return result;
  }

  // remove from original
  current.splice(source.index, 1);
  // insert into next
  next.splice(destination.index, 0, target);

  const result: CardMap = {
    ...cardMap,
    [source.droppableId]: current,
    [destination.droppableId]: next,
  };

  return result;
};

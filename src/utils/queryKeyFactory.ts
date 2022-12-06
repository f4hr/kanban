interface QueryKeyFactory<K> {
  /**
   * All item queries
   *
   * @example
   * ```ts
   * // Usage
   * todoKeys.all
   * // Output
   * ['todos']
   * ```
   * @returns Array of query keys
   */
  all: readonly [K];
  /**
   * Item lists query
   *
   * @example
   * ```ts
   * // Usage
   * todoKeys.lists()
   * // Output
   * ['todos', 'list']
   * ```
   * @returns Array of query keys
   */
  lists: () => readonly [K, 'list'];
  /**
   * Item list query
   *
   * @example
   * ```ts
   * // Usage
   * todoKeys.list('done')
   * // Output
   * ['todos', 'list', { filters: 'done' }]
   * ```
   * @returns Array of query keys
   */
  list: (filters: string) => readonly [K, 'list', { filters: typeof filters }];
  /**
   * Item details query
   *
   * @example
   * ```ts
   * // Usage
   * todoKeys.details()
   * // Output
   * ['todos', 'detail']
   * ```
   * @returns Array of query keys
   */
  details: () => readonly [K, 'detail'];
  /**
   * Item detail query
   *
   * @example
   * ```ts
   * // Usage
   * todoKeys.detail(123)
   * // Output
   * ['todos', 'detail', 123]
   * ```
   * @returns Array of query keys
   */
  detail: (id: string) => readonly [K, 'detail', typeof id];
}

function generateKeyFactory<T>(key: T): QueryKeyFactory<T> {
  const keys = {
    all: [key] as const,
    lists: () => [...keys.all, 'list'] as const,
    list: (filters: string) => [...keys.lists(), { filters }] as const,
    details: () => [...keys.all, 'detail'] as const,
    detail: (id: string) => [...keys.details(), id] as const,
  };

  return keys;
}

export const userKeys: Pick<QueryKeyFactory<'users'>, 'detail'> = {
  detail: (id: string) => ['users', 'detail', id] as const,
};
export const boardKeys: QueryKeyFactory<'boards'> = generateKeyFactory('boards');
export const listKeys: QueryKeyFactory<'lists'> = generateKeyFactory('lists');
export const cardKeys: QueryKeyFactory<'cards'> = generateKeyFactory('cards');

export default {
  boardKeys,
  listKeys,
  cardKeys,
};

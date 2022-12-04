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

export const userKeys: Pick<QueryKeyFactory<'users'>, 'detail'> = {
  detail: (id: string) => ['users', 'detail', id] as const,
};
export const boardKeys: QueryKeyFactory<'boards'> = {
  all: ['boards'] as const,
  lists: () => [...boardKeys.all, 'list'] as const,
  list: (filters: string) => [...boardKeys.lists(), { filters }] as const,
  details: () => [...boardKeys.all, 'detail'] as const,
  detail: (id: string) => [...boardKeys.details(), id] as const,
};
export const listKeys: QueryKeyFactory<'lists'> = {
  all: ['lists'] as const,
  lists: () => [...listKeys.all, 'list'] as const,
  list: (filters: string) => [...listKeys.lists(), { filters }] as const,
  details: () => [...listKeys.all, 'detail'] as const,
  detail: (id: string) => [...listKeys.details(), id] as const,
};
export const cardKeys: QueryKeyFactory<'cards'> = {
  all: ['cards'] as const,
  lists: () => [...cardKeys.all, 'list'] as const,
  list: (filters: string) => [...cardKeys.lists(), { filters }] as const,
  details: () => [...cardKeys.all, 'detail'] as const,
  detail: (id: string) => [...cardKeys.details(), id] as const,
};

export default {
  boardKeys,
  listKeys,
  cardKeys,
};

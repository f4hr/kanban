const HOST = '';
const API_URL = (import.meta.env.VITE_API_URL as string) || 'http://localhost:5000';
const PREFIX = 'v1';

const buildUrl = (...params: string[]) => (params.length === 0 ? '/' : [HOST, ...params].join('/'));

const buildApiUrl = (...params: string[]) =>
  params.length === 0 ? [API_URL, PREFIX].join('/') : [API_URL, PREFIX, ...params].join('/');

/**
 * Get home URL
 *
 * @example
 * ```ts
 * // Usage
 * routes.homePath()
 * // Output
 * "http://localhost/"
 * ```
 * @returns Home URL
 */
const homePath = (): string => buildUrl();

/**
 * Get login URL
 *
 * @example
 * ```ts
 * // Usage
 * routes.loginPath()
 * // Output
 * "http://localhost/login"
 * ```
 * @returns Login URL
 */
const loginPath = (): string => buildUrl('login');

/**
 * Get signup URL
 *
 * @example
 * ```ts
 * // Usage
 * routes.signupPath()
 * // Output
 * "http://localhost/signup"
 * ```
 * @returns Signup URL
 */
const signupPath = (): string => buildUrl('signup');

/**
 * Get dashboard URL
 *
 * @example
 * ```ts
 * // Usage
 * routes.dashboardPath()
 * // Output
 * "http://localhost/dashboard"
 * ```
 * @returns Dashboard URL
 */
const dashboardPath = (): string => buildUrl('dashboard');

/**
 * Get boards URL
 *
 * @example
 * ```ts
 * // Usage
 * routes.boardsPath()
 * // Output
 * "http://localhost/boards"
 * ```
 * @returns Boards URL
 */
const boardsPath = (): string => buildUrl('boards');

/**
 * Get board URL
 *
 * @param id - Board ID.
 * @example
 * ```ts
 * // Usage
 * routes.boardPath(':id')
 * // Output
 * "http://localhost/boards/:id"
 * ```
 * @returns Board URL
 */
const boardPath = (id: string): string => buildUrl('boards', id);

/**
 * Get app settings URL
 *
 * @example
 * ```ts
 * // Usage
 * routes.settingsPath()
 * // Output
 * "http://localhost/settings"
 * ```
 * @returns Settings URL
 */
const settingsPath = (): string => buildUrl('settings');

/**
 * Get login API URL
 *
 * @example
 * ```ts
 * // Usage
 * routes.apiLoginPath()
 * // Output
 * "http://localhost/v1/auth/login"
 * ```
 * @returns Login API URL
 */
const apiLoginPath = (): string => buildApiUrl('auth', 'login');

/**
 * Get users API URL
 *
 * @param params - optional path parameters
 * @example
 * ```ts
 * // Usage
 * routes.apiUsersPath(':id')
 * // Output
 * "http://localhost/v1/users/:id"
 * ```
 * @returns Users API URL
 */
const apiUsersPath = (...params: string[]): string => buildApiUrl(...['users', ...params]);

/**
 * Get boards API URL
 *
 * @param params - optional path parameters
 * @example
 * ```ts
 * // Usage
 * routes.apiBoardsPath(':id')
 * // Output
 * "http://localhost/v1/boards/:id"
 * ```
 * @returns Boards API URL
 */
const apiBoardsPath = (...params: string[]): string => buildApiUrl(...['boards', ...params]);

/**
 * Get lists API URL
 *
 * @param params - optional path parameters
 * @example
 * ```ts
 * // Usage
 * routes.apiListsPath(':id')
 * // Output
 * "http://localhost/v1/lists/:id"
 * ```
 * @returns Lists API URL
 */
const apiListsPath = (...params: string[]): string => buildApiUrl(...['lists', ...params]);

/**
 * Get cards API URL
 *
 * @param params - optional path parameters
 * @example
 * ```ts
 * // Usage
 * routes.apiCardsPath(':id')
 * // Output
 * "http://localhost/v1/cards/:id"
 * ```
 * @returns Cards API URL
 */
const apiCardsPath = (...params: string[]): string => buildApiUrl(...['cards', ...params]);

export default {
  homePath,
  loginPath,
  signupPath,
  dashboardPath,
  boardsPath,
  boardPath,
  settingsPath,
  apiLoginPath,
  apiUsersPath,
  apiBoardsPath,
  apiListsPath,
  apiCardsPath,
};

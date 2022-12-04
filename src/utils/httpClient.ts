import { storage } from './storage';

interface AuthorizedRequestInit extends RequestInit {
  authorized?: boolean;
}

type ClientMethods = 'get' | 'post' | 'patch' | 'put' | 'delete';

export type Client = {
  [key in ClientMethods]: <T>(
    resource: string,
    options?: AuthorizedRequestInit,
  ) => Promise<void | T>;
};

const getAuthHeader = () => {
  const user = storage.getUser();

  if (user != null && user.token) {
    return { Authorization: `Bearer ${user.token}` };
  }

  return undefined;
};

const requestHandler = async <TData>(
  resource: string,
  method: Uppercase<ClientMethods>,
  options?: AuthorizedRequestInit,
): Promise<void | TData> => {
  const { authorized = true, headers, ...opts } = options ?? {};
  const authHeader = authorized ? getAuthHeader() : undefined;
  return fetch(resource, {
    ...opts,
    method,
    headers: {
      ...headers,
      ...authHeader,
      'Content-Type': 'application/json;charset=utf-8',
    },
  }).then(async (response: Response) =>
    response
      .json()
      .then((data: TData) => {
        if (response.ok) return data;

        return Promise.reject(data);
      })
      .catch((err) => {
        const isParseError = err instanceof SyntaxError;
        if (!isParseError) throw err;
      }),
  );
};

export const httpClient: Client = {
  get(resource, options) {
    return requestHandler(resource, 'GET', options);
  },
  post(resource, options) {
    return requestHandler(resource, 'POST', options);
  },
  put(resource, options) {
    return requestHandler(resource, 'PUT', options);
  },
  patch(resource, options) {
    return requestHandler(resource, 'PATCH', options);
  },
  delete(resource, options) {
    return requestHandler(resource, 'DELETE', options);
  },
};

export default httpClient;

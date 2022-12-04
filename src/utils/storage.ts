const USER_KEY = 'user';

type User = {
  userId: string;
  token: string;
};

const setItem = <T>(key: string, value: T) => {
  localStorage.setItem(key, JSON.stringify(value));
};

const getItem = <T>(key: string): T | null => {
  const item = localStorage.getItem(key);

  if (item == null) return null;

  return JSON.parse(item) as T;
};

const getUser = (): User | null => {
  const user = localStorage.getItem(USER_KEY);
  return user ? (JSON.parse(user) as User) : null;
};

const setUser = (user: User) => setItem(USER_KEY, user);

const removeItem = (key: string) => localStorage.removeItem(key);
const removeUser = () => localStorage.removeItem(USER_KEY);

export const storage = {
  getItem,
  setItem,
  getUser,
  setUser,
  removeItem,
  removeUser,
};

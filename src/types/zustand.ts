export type StateStorage = {
  setItem: (key: string, data: string) => unknown | Promise<unknown>;
  getItem: (key: string) => string | null | Promise<string | null>;
  removeItem: (key: string) => unknown | Promise<unknown>;
};

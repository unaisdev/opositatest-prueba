import {MMKV} from 'react-native-mmkv';
import {StateStorage} from 'zustand/middleware';

const storage = new MMKV({
  id: 'sorting-storage',
});

export const mmvkStorage: StateStorage = {
  setItem: (key, data) => {
    return storage.set(key, data);
  },
  getItem: key => {
    const value = storage.getString(key);
    return value ?? null;
  },
  removeItem: key => {
    return storage.delete(key);
  },
};

import {StateStorage} from '@type/zustand';
import {MMKV} from 'react-native-mmkv';
import {SORTING_STORAGE_NAME} from 'src/constants/storage';

const storage = new MMKV({
  id: SORTING_STORAGE_NAME,
});

export const appStorage: StateStorage = {
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

import {create} from 'zustand';
import {persist, createJSONStorage} from 'zustand/middleware';

import AsyncStorage from '@react-native-async-storage/async-storage';

import {SortingEnum} from '@type/index';

interface SortingTypeState {
  sortingType: SortingEnum;
  setSortingType: (sort: SortingEnum) => void;
}

export const useSortingTypeStore = create<SortingTypeState>()(
  persist(
    set => ({
      sortingType: SortingEnum.DEFAULT,
      setSortingType: sort => {
        set({sortingType: sort});
      },
    }),
    {
      name: 'food-storage', // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => AsyncStorage), // (optional) by default, 'localStorage' is used
    },
  ),
);

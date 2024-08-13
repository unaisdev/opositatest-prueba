import {create} from 'zustand';
import {persist, createJSONStorage} from 'zustand/middleware';

import {SortingEnum} from '@type/sorting';
import {appStorage} from '.';
import {SORTING_STORAGE_NAME} from 'src/constants/storage';

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
      name: SORTING_STORAGE_NAME,
      storage: createJSONStorage(() => appStorage),
    },
  ),
);

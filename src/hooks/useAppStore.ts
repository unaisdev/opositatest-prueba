import {useFavBooksStore} from '@storage/favorites';
import {useRecentBooksStore} from '@storage/recents';
import {useSortingTypeStore} from '@storage/sorting/sorting';

export function useAppStore() {
  const sortingType = useSortingTypeStore(state => state.sortingType);
  const favorites = useFavBooksStore(state => state.favs);
  const recents = useRecentBooksStore(state => state.recents);

  return {sortingType, favorites, recents};
}

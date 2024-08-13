import {useSearchBarStore} from '@storage/searchBar';
import {useDebounce} from '@utils/useDebounce';

export function useSearchText() {
  const {text, setText} = useSearchBarStore();

  const searchQuery = text;
  // Apply debounce to searchQuery
  const debouncedSearchQuery = useDebounce(searchQuery, 200);

  return {debouncedSearchQuery, searchQuery, setSearchQuery: setText};
}

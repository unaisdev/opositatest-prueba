import {useQuery} from '@tanstack/react-query';
import {fetchBooks} from '../../../services/fetchBooks';

export function useBooksFetch() {
  const {data, error, isLoading, isRefetching, refetch} = useQuery({
    queryKey: ['booksList'],
    queryFn: async () => {
      const fetchedBooks = await fetchBooks();

      return fetchedBooks;
    },
  });

  return {data, error, isLoading, isRefetching, refetch};
}

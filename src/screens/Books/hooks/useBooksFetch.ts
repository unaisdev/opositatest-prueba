import {useQuery} from '@tanstack/react-query';

import {fetchBooks} from '@services/fetchBooks';

export function useBooksFetch() {
  const {data, error, isLoading, isRefetching, refetch} = useQuery({
    queryKey: ['booksList'],
    queryFn: fetchBooks,

    // Data can not be 'undefined'
    initialData: [],
  });

  return {data, error, isLoading, isRefetching, refetch};
}

import {useCallback} from 'react';
import {Book} from '@type/index';
import {useAppNavigation} from '@navigation/hooks/useAppNavigation';

export function useBookAction() {
  const {appNav} = useAppNavigation();

  const handleTapBook = useCallback(
    (book: Book) => {
      appNav.navigate('BookDetail', {book});
    },
    [appNav],
  );

  return {handleTapBook};
}

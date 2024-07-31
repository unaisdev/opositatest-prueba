import {Books, SortingEnum} from '../../types';
import {orderAlphabetical} from '../sorting';

export const filterAndSortBooks = ({
  books,
  filter,
  sort,
}: {
  books?: Books;
  filter: string;
  sort: SortingEnum;
}) => {
  if (!books) {
    return [];
  }

  const filtered = books.filter(book => {
    const bookName = book.name.toLowerCase().trim();
    const query = filter.toLowerCase().trim();

    return bookName.includes(query);
  });

  if (sort === SortingEnum.ALPHABETICAL) {
    return orderAlphabetical(filtered, sort);
  }

  return filtered;
};

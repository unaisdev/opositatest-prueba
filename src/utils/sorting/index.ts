import {Books} from '@type/books';
import {SortingEnum} from '@type/sorting';

export const orderAlphabetical = (
  books: Books,
  orderType: SortingEnum,
): Books => {
  if (orderType === SortingEnum.ALPHABETICAL) {
    return books.sort((bookA, bookB) => {
      const bookAName = bookA.name.toLowerCase();
      const bookBName = bookB.name.toLowerCase();

      return bookAName.localeCompare(bookBName);
    });
  }

  if (orderType === SortingEnum.DEFAULT) {
    return books;
  }

  return books;
};

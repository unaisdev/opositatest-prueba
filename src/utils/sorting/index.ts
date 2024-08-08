import {Books, SortingEnum} from '@type/index';

export const orderAlphabetical = (
  books: Books,
  orderType: SortingEnum,
): Books => {
  if (orderType === SortingEnum.ALPHABETICAL) {
    return books.sort((bookA, bookB) => {
      return bookA.name.localeCompare(bookB.name);
    });
  }

  if (orderType === SortingEnum.DEFAULT) {
    return books;
  }

  return books;
};

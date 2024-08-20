import {filterAndSortBooks} from '.';

import {SortingEnum} from '@type/sorting';
import {booksMock} from '__mocks__/mocks';

describe('filterAndSortBooks', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('return an empty array if no books are provided', () => {
    const result = filterAndSortBooks({
      books: [],
      filter: '',
      sort: SortingEnum.DEFAULT,
    });

    expect(result).toEqual([]);
  });

  it('filter books by the given filter', () => {
    const result = filterAndSortBooks({
      books: booksMock,
      filter: 'Zorro',
      sort: SortingEnum.DEFAULT,
    });

    expect(result).toEqual([booksMock[0]]); // Solo "El Secreto de la Manzana Dorada" debe coincidir
    expect(result).toHaveLength(1);
  });

  it('filters books by the given filter, if they are 2 equal books', () => {
    const result = filterAndSortBooks({
      books: booksMock,
      filter: 'Secreto',
      sort: SortingEnum.DEFAULT,
    });

    expect(result).toEqual([booksMock[1], booksMock[2]]); // Solo "El Secreto de la Manzana Dorada" debe coincidir
    expect(result).toHaveLength(2);
  });

  it('return books in default order', () => {
    const result = filterAndSortBooks({
      books: booksMock,
      filter: '',
      sort: SortingEnum.DEFAULT,
    });

    expect(result).toEqual(booksMock);
  });

  it('return books in default order and filtered', () => {
    const filteredBooks = [booksMock[1], booksMock[2]];

    const result = filterAndSortBooks({
      books: booksMock,
      filter: 'Secreto',
      sort: SortingEnum.DEFAULT,
    });

    expect(result).toEqual(filteredBooks);
  });

  it('return books in alphabetical order', () => {
    const result = filterAndSortBooks({
      books: booksMock,
      filter: '',
      sort: SortingEnum.ALPHABETICAL,
    });

    const expectedResult = [
      booksMock[3], // Cuentos de la Naranja Espléndida
      booksMock[2], // El Secreto de la Manzana Dorada
      booksMock[1], // El Secreto de la Manzana Dorada
      booksMock[0], // El Zorro: El Regreso del Justiciero
    ];

    expect(result).toEqual(expectedResult);
    expect(result).toHaveLength(expectedResult.length);
  });

  it('return books filtered and sorted alphabetically', () => {
    const filteredBooks = [booksMock[1], booksMock[2]]; // Solo "El Secreto de la Manzana Dorada" debería estar en la lista filtrada

    const result = filterAndSortBooks({
      books: booksMock,
      filter: 'Manzana',
      sort: SortingEnum.ALPHABETICAL,
    });

    expect(result).toEqual(filteredBooks);
  });
});

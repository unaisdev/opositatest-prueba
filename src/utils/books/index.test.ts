import {filterAndSortBooks} from '.';
import {Book} from '@type/books';
import {SortingEnum} from '@type/sorting';
import {booksMock} from '__mocks__/mocks';
import {orderAlphabetical} from '@utils/sorting';

// Mock de la función orderAlphabetical
jest.mock('@utils/sorting', () => ({
  orderAlphabetical: jest.fn(),
}));

describe('filterAndSortBooks', () => {
  const mockOrderAlphabetical = orderAlphabetical as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return an empty array if no books are provided', () => {
    const result = filterAndSortBooks({
      books: undefined,
      filter: 'some filter',
      sort: SortingEnum.DEFAULT,
    });
    expect(result).toEqual([]);
  });

  it('should filter books by the given filter', () => {
    const result = filterAndSortBooks({
      books: booksMock,
      filter: 'Secreto',
      sort: SortingEnum.DEFAULT,
    });
    expect(result).toEqual([booksMock[1]]); // Solo "El Secreto de la Manzana Dorada" debe coincidir
  });

  it('should return books in alphabetical order if sorting by ALPHABETICAL', () => {
    const filteredBooks = booksMock;

    mockOrderAlphabetical.mockImplementation(filtered =>
      filtered.sort((a: Book, b: Book) => a.name.localeCompare(b.name)),
    );

    const result = filterAndSortBooks({
      books: filteredBooks,
      filter: '',
      sort: SortingEnum.ALPHABETICAL,
    });

    // expect(orderAlphabetical).toHaveBeenCalledWith(
    //   filteredBooks,
    //   SortingEnum.ALPHABETICAL,
    // );

    expect(result).toEqual([
      booksMock[2], // Cuentos de la Naranja Espléndida
      booksMock[1], // El Secreto de la Manzana Dorada
      booksMock[0], // El Zorro: El Regreso del Justiciero
    ]);
  });

  it('should return books filtered by the filter and sorted alphabetically if sorting by ALPHABETICAL', () => {
    const filteredBooks = [booksMock[1]]; // Solo "El Secreto de la Manzana Dorada" debería estar en la lista filtrada

    mockOrderAlphabetical.mockImplementation(filtered =>
      filtered.sort((a: Book, b: Book) => a.name.localeCompare(b.name)),
    );

    const result = filterAndSortBooks({
      books: booksMock,
      filter: 'Manzana',
      sort: SortingEnum.ALPHABETICAL,
    });
    expect(mockOrderAlphabetical).toHaveBeenCalledWith(
      filteredBooks,
      SortingEnum.ALPHABETICAL,
    );
    expect(result).toEqual(filteredBooks);
  });
});

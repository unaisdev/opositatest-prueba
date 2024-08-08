// src/utils/orderAlphabetical.test.ts
import {SortingEnum} from '@type/index';
import {orderAlphabetical} from '.';
import {booksMock} from '__mocks__/mocks';

describe('orderAlphabetical', () => {
  it('should order books alphabetically when orderType is ALPHABETICAL', () => {
    const sortedBooks = orderAlphabetical(
      [...booksMock],
      SortingEnum.ALPHABETICAL,
    );
    const sortedBookNames = sortedBooks.map(book => book.name);

    expect(sortedBookNames).toEqual([
      'Cuentos de la Naranja Espléndida',
      'El Secreto de la Manzana Dorada',
      'El Zorro: El Regreso del Justiciero',
    ]);
  });

  it('should return books in the same order when orderType is DEFAULT', () => {
    const sameOrderBooks = orderAlphabetical(
      [...booksMock],
      SortingEnum.DEFAULT,
    );

    expect(sameOrderBooks).toEqual(booksMock);
  });

  it('should return books in the same order when orderType is not handled', () => {
    const sameOrderBooks = orderAlphabetical(
      [...booksMock],
      'UNKNOWN' as SortingEnum,
    );

    expect(sameOrderBooks).toEqual(booksMock);
  });
});

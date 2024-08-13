import axios from 'axios';

import {MapBooksDTO} from './books/mappers';
import {BooksModel} from './books/model';
import {BooksDTO} from './books/dto';

const API_URL = 'https://anapioficeandfire.com/api/books';

// Obtenemos los libros
export const fetchBooks = async (): Promise<BooksDTO> => {
  try {
    const {data} = await axios.get<BooksModel>(API_URL);

    return MapBooksDTO(data);
  } catch (error) {
    console.error(error);
  }

  return [];
};

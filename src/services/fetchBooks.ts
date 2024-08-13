import axios from 'axios';

import {MapBooksDTO} from './books/mappers';
import {BooksModel} from './books/model';
import {BooksDTO} from './books/dto';
import {API_URL} from 'src/constants/api';

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

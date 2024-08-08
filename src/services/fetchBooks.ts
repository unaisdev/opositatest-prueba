import {Books} from '@type/index';

// Obtenemos los libros
export const fetchBooks = async (): Promise<Books | undefined> => {
  try {
    console.log('Fetching books');

    const response = await fetch('https://anapioficeandfire.com/api/books');
    const data = await response.json();

    return data as Books;
  } catch (error) {}
};

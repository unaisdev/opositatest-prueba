import {useFavBooksStore} from '../../../storage/favorites';
import {Book} from '../../../types';

export function useBookDetail(book: Book) {
  const {favs, toggleFav} = useFavBooksStore();

  const isFavorite = Boolean(favs.find(fav => fav.isbn === book.isbn));

  return {isFavorite, toggleFav};
}

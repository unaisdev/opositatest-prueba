import {create} from 'zustand';
import {Book, Books} from '../types';

interface FavBooksState {
  favs: Books;
  toggleFav: (book: Book) => void;
}

export const useFavBooksStore = create<FavBooksState>((set, get) => ({
  favs: [],
  toggleFav: book => {
    const favedBooks = get().favs;

    const isFavorite = favedBooks.some(fav => fav.isbn === book.isbn);

    if (!isFavorite) {
      set({favs: [...favedBooks, book]});
      return;
    }

    set({favs: favedBooks.filter(fav => fav.isbn !== book.isbn)});
  },
}));

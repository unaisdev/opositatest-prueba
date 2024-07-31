import {create} from 'zustand';
import {Book, Books} from '../types';

interface RecentBooksState {
  recents: Books;
  addRecent: (book: Book) => void;
}

export const useRecentBooksStore = create<RecentBooksState>((set, get) => ({
  recents: [],
  addRecent: book => {
    const recentBooks = get().recents;

    const updatedRecents = recentBooks.filter(item => item.isbn !== book.isbn);

    set({recents: [book, ...updatedRecents]});
  },
}));

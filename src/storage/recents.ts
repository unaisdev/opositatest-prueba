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

    // Check if the book to be added is the same as the last book in the list
    if (recentBooks.length > 0 && recentBooks[0].isbn === book.isbn) {
      return; // Don't add the book if it's the same as the last one
    }

    // Filter out the book if it already exists in the list
    // const updatedRecents = recentBooks.filter(item => item.isbn !== book.isbn);

    // We must limit the recents list for proper list display to the user
    const limitedRecents = recentBooks.slice(0, 2);

    set({recents: [book, ...limitedRecents]});
  },
}));

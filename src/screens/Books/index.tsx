import React, {useCallback, useEffect, useState} from 'react';

import {
  FlatList,
  ListRenderItem,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
} from 'react-native';
import {fetchBooks} from '../../services/fetchBooks';
import {Book} from '../../types';
import {useAppNavigation} from '../../navigation/hooks/useAppNavigation';
import {BookItem} from './components/BookItem';
import {useFavBooksStore} from '../../storage/favorites';

const Books = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [recentBooks, setRecentBooks] = useState<Book[]>([]);
  const favorites = useFavBooksStore(state => state.favs);

  const {appNav} = useAppNavigation();

  useEffect(() => {
    const init = async () => {
      const booksFetched = await fetchBooks();

      if (!booksFetched) {
        return;
      }

      setBooks(booksFetched);
    };

    init();
  }, []);

  const handleTapBook = useCallback(
    (book: Book) => {
      setRecentBooks(prev => {
        const updatedRecents = prev.filter(item => item.isbn !== book.isbn);

        return [book, ...updatedRecents];
      });

      appNav.navigate('BookDetail', {book});
    },
    [appNav],
  );

  const renderItem: ListRenderItem<Book> = useCallback(
    ({item}) => {
      const isFaved = favorites.some(fav => fav.isbn === item.isbn);

      return (
        <BookItem book={item} favorite={isFaved} onPress={handleTapBook} />
      );
    },
    [favorites, handleTapBook],
  );

  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        placeholder="Buscar"
        value={searchQuery}
        onChangeText={setSearchQuery}
        style={styles.searchInput}
      />

      {recentBooks.length > 0 && (
        <FlatList
          ListHeaderComponent={() => <Text>Recientes</Text>}
          data={recentBooks}
          renderItem={renderItem}
        />
      )}

      <FlatList
        ListHeaderComponent={() => <Text>Libros</Text>}
        data={books}
        renderItem={renderItem}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchInput: {
    borderColor: '#ddd',
    borderWidth: 1,
    padding: 8,
    marginBottom: 8,
  },
});

export default Books;

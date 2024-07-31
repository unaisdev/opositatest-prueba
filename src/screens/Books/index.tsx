import React, {useCallback, useEffect, useState} from 'react';

import {
  FlatList,
  ListRenderItem,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
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

  console.log('render');

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
      <ScrollView>
        <TextInput
          placeholder="Buscar"
          value={searchQuery}
          onChangeText={setSearchQuery}
          style={styles.searchInput}
        />
        <TouchableOpacity onPress={fetchBooks} style={styles.searchButton}>
          <Text>Actualizar libros</Text>
        </TouchableOpacity>

        <Text>Total Libros: {books.length}</Text>
        {recentBooks.length > 0 && !searchQuery && (
          <>
            <Text style={styles.sectionHeader}>Recientes</Text>
            <FlatList
              // There is a warning from React Native that says:
              // VirtualizedLists should never be nested inside plain ScrollViews with the same orientation
              // because it can break windowing and other functionality - use another
              // VirtualizedList-backed container instead.

              // That's why we disable the scroll on the FlatList
              scrollEnabled={false}
              data={recentBooks}
              renderItem={renderItem}
            />
          </>
        )}

        <Text style={styles.sectionHeader}>Libros</Text>
        <FlatList scrollEnabled={false} data={books} renderItem={renderItem} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  searchInput: {
    borderColor: '#ddd',
    borderWidth: 1,
    padding: 8,
    marginBottom: 8,
  },
  searchButton: {
    backgroundColor: 'transparent',
    padding: 10,
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
  },
});

export default Books;

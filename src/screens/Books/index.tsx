import React, {useCallback, useState} from 'react';

import {
  ActivityIndicator,
  FlatList,
  ListRenderItem,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';

import {Book} from '../../types';
import {BookItem} from './components/BookItem';

import {useAppNavigation} from '../../navigation/hooks/useAppNavigation';
import {useFavBooksStore} from '../../storage/favorites';
import {useBooksFetch} from './hooks/useBooksFetch';
import {useRecentBooksStore} from '../../storage/recents';

const Books = () => {
  const {
    data: books,
    error,
    isLoading,
    isRefetching,
    refetch,
  } = useBooksFetch();

  const [searchQuery, setSearchQuery] = useState<string>('');
  const favorites = useFavBooksStore(state => state.favs);
  const {recents, addRecent} = useRecentBooksStore();

  const {appNav} = useAppNavigation();

  console.log('render');

  const handleTapBook = useCallback(
    (book: Book) => {
      addRecent(book);
      appNav.navigate('BookDetail', {book});
    },
    [addRecent, appNav],
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
        <TouchableOpacity onPress={() => refetch()} style={styles.searchButton}>
          <Text>Actualizar libros</Text>
        </TouchableOpacity>

        <Text>Total Libros: {books?.length}</Text>
        {recents.length > 0 && !searchQuery && (
          <>
            <Text style={styles.sectionHeader}>Recientes</Text>
            <FlatList
              // There is a warning from React Native that says:
              // VirtualizedLists should never be nested inside plain ScrollViews with the same orientation
              // because it can break windowing and other functionality - use another
              // VirtualizedList-backed container instead.

              // That's why we disable the scroll on the FlatList
              scrollEnabled={false}
              data={recents}
              renderItem={renderItem}
            />
          </>
        )}

        <Text style={styles.sectionHeader}>Libros</Text>
        {error && <Text>Algo ha ocurrido al cargar los libros</Text>}
        {isLoading || (isRefetching && <ActivityIndicator />)}
        {books && (
          <FlatList
            scrollEnabled={false}
            data={books}
            renderItem={renderItem}
          />
        )}
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

import React, {useCallback, useMemo, useState} from 'react';

import {
  ActivityIndicator,
  FlatList,
  ListRenderItem,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import {Book, SortingEnum} from '../../types';
import {BookItem} from './components/BookItem';

import {useAppNavigation} from '../../navigation/hooks/useAppNavigation';
import {useFavBooksStore} from '../../storage/favorites';
import {useBooksFetch} from './hooks/useBooksFetch';
import {useRecentBooksStore} from '../../storage/recents';
import {useDebounce} from '../../utils/useDebounce';

import {useSortingTypeStore} from '../../storage/sorting';
import {filterAndSortBooks} from '../../utils/books';
import {styles} from './styles';

const Books = () => {
  const {
    data: books,
    error,
    isLoading,
    isRefetching,
    refetch,
  } = useBooksFetch();

  const [searchQuery, setSearchQuery] = useState<string>('');

  // Apply debounce to searchQuery
  const debouncedSearchQuery = useDebounce(searchQuery, 200);

  const {sortingType, setSortingType} = useSortingTypeStore();
  const favorites = useFavBooksStore(state => state.favs);
  const recents = useRecentBooksStore(state => state.recents);

  const {appNav} = useAppNavigation();

  console.log('render');

  const handleTapBook = useCallback(
    (book: Book) => {
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

  const filteredAndSortedBooks = useMemo(
    () =>
      filterAndSortBooks({
        books,
        filter: debouncedSearchQuery,
        sort: sortingType,
      }),
    [books, debouncedSearchQuery, sortingType],
  );

  const toggleSorting = useCallback(() => {
    if (sortingType === SortingEnum.DEFAULT) {
      setSortingType(SortingEnum.ALPHABETICAL);

      return;
    }

    setSortingType(SortingEnum.DEFAULT);
  }, [setSortingType, sortingType]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
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
        {recents.length > 0 && !debouncedSearchQuery && (
          <>
            <Text style={styles.sectionHeader}>Recientes (max. 3)</Text>
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

        <View style={styles.row}>
          <Text style={styles.sectionHeader}>Libros</Text>
          <TouchableOpacity onPress={toggleSorting}>
            <Text style={styles.sectionHeaderOrder}>
              Ordenar Alfabeticamente
            </Text>
          </TouchableOpacity>
        </View>
        {error && <Text>Algo ha ocurrido al cargar los libros</Text>}
        {isLoading || (isRefetching && <ActivityIndicator />)}
        {filteredAndSortedBooks.length > 0 ? (
          <FlatList
            scrollEnabled={false}
            data={filteredAndSortedBooks}
            renderItem={renderItem}
          />
        ) : (
          <Text>No hay libros que coincidan con la búsqueda</Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Books;

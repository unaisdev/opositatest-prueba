import {Sorting} from '@components/Sorting';
import {styles} from '@screens/Books/styles';
import {
  View,
  Text,
  ActivityIndicator,
  FlatList,
  ListRenderItem,
} from 'react-native';
import {EmptyComponent} from '../EmptyListComponent';
import {useBooksFetch} from '@screens/Books/hooks/useBooksFetch';
import {useMemo} from 'react';
import {filterAndSortBooks} from '@utils/books';

import {Book} from '@type/books';
import {useSearchText} from '@screens/Books/hooks/useSearchText';
import {useAppStore} from '@hooks/useAppStore';

type Props = {
  renderItem: ListRenderItem<Book>;
};

const BooksList = ({renderItem}: Props) => {
  const {data: books, error, isLoading, isRefetching} = useBooksFetch();

  const {debouncedSearchQuery} = useSearchText();
  const {sortingType} = useAppStore();

  const filteredAndSortedBooks = useMemo(
    () =>
      filterAndSortBooks({
        books,
        filter: debouncedSearchQuery,
        sort: sortingType,
      }),
    [books, debouncedSearchQuery, sortingType],
  );

  if (error) {
    return <Text>Algo ha ocurrido al cargar los libros</Text>;
  }

  if (isLoading || isRefetching) {
    return <ActivityIndicator />;
  }

  return (
    <>
      <View style={styles.row}>
        <Text style={styles.sectionHeader}>Libros</Text>
        <Sorting />
      </View>
      <FlatList
        scrollEnabled={false}
        data={filteredAndSortedBooks}
        renderItem={renderItem}
        ListEmptyComponent={EmptyComponent}
      />
    </>
  );
};

export default BooksList;

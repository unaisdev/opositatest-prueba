import {useRecentBooksStore} from '@storage/recents';
import {useCallback} from 'react';
import {FlatList, ListRenderItem, StyleSheet, Text} from 'react-native';

import {Book} from '@type/books';

import {useSearchText} from '@screens/Books/hooks/useSearchText';
import {useAppStore} from '@hooks/useAppStore';

type Props = {
  renderItem: ListRenderItem<Book>;
};

const RecentsList = ({renderItem}: Props) => {
  const {recents} = useAppStore();
  const {debouncedSearchQuery} = useSearchText();

  const shouldRenderRecentsList = recents.length > 0 && !debouncedSearchQuery;

  if (!shouldRenderRecentsList) {
    return;
  }

  return (
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
  );
};

const styles = StyleSheet.create({
  sectionHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
  },
});

export default RecentsList;

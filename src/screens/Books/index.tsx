import React, {useCallback} from 'react';

import {ListRenderItem, ScrollView} from 'react-native';

import {AppLayout} from '@components/AppLayout';

import {styles} from './styles';
import SearchBar from './components/SearchBar';
import RecentsList from './components/RecentsList';
import BooksList from './components/BookList';
import {Book} from 'src/types';

import {useAppStore} from './hooks/useAppStore';
import {useBookAction} from './hooks/useBookAction';
import TotalBooks from './components/TotalBooks';
import BookItem from './components/BookItem';

const Books = () => {
  const {favorites} = useAppStore();
  const {handleTapBook} = useBookAction();

  console.log('render');

  const renderItem: ListRenderItem<Book> = useCallback(
    ({item}): JSX.Element => {
      const isFaved = favorites.some(fav => fav.isbn === item.isbn);

      return (
        <BookItem book={item} favorite={isFaved} onPress={handleTapBook} />
      );
    },
    [favorites, handleTapBook],
  );

  return (
    <AppLayout>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <SearchBar />
        <TotalBooks />
        <RecentsList renderItem={renderItem} />
        <BooksList renderItem={renderItem} />
      </ScrollView>
    </AppLayout>
  );
};

export default Books;

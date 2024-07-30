import React, {useEffect, useState} from 'react';

import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {fetchBooks} from '../../services/fetchBooks';
import {Book} from '../../types';
import {useAppNavigation} from '../../navigation/hooks/useAppNavigation';

const Books = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');

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

  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        placeholder="Buscar"
        value={searchQuery}
        onChangeText={setSearchQuery}
        style={styles.searchInput}
      />

      <FlatList
        data={books}
        renderItem={({item}) => (
          <TouchableOpacity
            onPress={() => appNav.navigate('BookDetail', {book: item})}
            key={item.isbn}
            style={styles.row}>
            <Text>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchInput: {
    borderColor: '#ddd',
    borderWidth: 1,
    padding: 8,
    marginBottom: 8,
  },
});

export default Books;

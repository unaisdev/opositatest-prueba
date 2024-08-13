import React from 'react';

import {Image, StyleSheet, Text, TouchableOpacity} from 'react-native';

import {Book} from '@type/index';

const BookItem = ({
  book,
  favorite,
  onPress,
}: {
  book: Book;
  favorite: boolean;
  onPress: (book: Book) => void;
}) => {
  const styles = createStyles(favorite);

  return (
    <TouchableOpacity
      onPress={() => onPress(book)}
      key={book.isbn}
      style={styles.bookItem}>
      <Image
        source={{
          uri: `https://covers.openlibrary.org/b/isbn/${book.isbn}-M.jpg`,
        }}
        style={styles.bookImage}
        resizeMode={'contain'}
      />
      <Text style={styles.bookTitle}>{book.name}</Text>
      {favorite && <Text style={[styles.favoriteIcon]}>★</Text>}
    </TouchableOpacity>
  );
};

const createStyles = (fav: boolean) =>
  StyleSheet.create({
    bookItem: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 10,
      borderBottomWidth: 1,
      borderBottomColor: '#ddd',
    },
    bookImage: {
      width: 50,
      height: 50,
      marginRight: 10,
    },
    bookTitle: {
      fontSize: 16,
    },
    favoriteIcon: {
      marginLeft: 'auto',
      color: fav ? 'gold' : 'gray',
    },
  });

export default BookItem;

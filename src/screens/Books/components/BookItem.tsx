import React from 'react';

import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {Book} from '../../../types';

export const BookItem = ({
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
      style={styles.row}>
      <Text>{book.name}</Text>
      {favorite && <Text style={[styles.favoriteIcon]}>★</Text>}
    </TouchableOpacity>
  );
};

const createStyles = (fav: boolean) =>
  StyleSheet.create({
    row: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    favoriteIcon: {
      color: fav ? 'gold' : 'gray',
    },
  });

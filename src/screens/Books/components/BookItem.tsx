import React from 'react';

import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {Book} from '../../../types';

export const BookItem = ({
  book,
  favorite,
  onPress,
  onToggleFav,
}: {
  book: Book;
  favorite: boolean;
  onPress: (book: Book) => void;
  onToggleFav: (book: Book) => void;
}) => {
  const styles = createStyles(favorite);

  return (
    <TouchableOpacity
      onPress={() => onPress(book)}
      key={book.isbn}
      style={styles.row}>
      <Text>{book.name}</Text>
      <TouchableOpacity onPress={() => onToggleFav(book)}>
        <Text style={[styles.favoriteIcon]}>★</Text>
      </TouchableOpacity>
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
      marginLeft: 'auto',
      color: fav ? 'gold' : 'gray',
    },
  });

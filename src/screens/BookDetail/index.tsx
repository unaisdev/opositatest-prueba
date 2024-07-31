import {RouteProp} from '@react-navigation/native';
import React from 'react';

import {SafeAreaView, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {RootStackParams} from '../../navigation/types';

import {useBookDetail} from './hooks/useBookDetail';

const BookDetail = ({
  route,
}: {
  route: RouteProp<RootStackParams, 'BookDetail'>;
}) => {
  const {book} = route.params;
  const {isFavorite, toggleFav} = useBookDetail(book);

  const styles = createStyles(isFavorite);

  return (
    <SafeAreaView style={styles.container}>
      <Text>{book.name}</Text>

      <TouchableOpacity onPress={() => toggleFav(book)}>
        {isFavorite ? (
          <Text style={[styles.favoriteIcon]}>REMOVE FAVORITE</Text>
        ) : (
          <Text style={[styles.favoriteIcon]}>ADD FAVORITE</Text>
        )}
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const createStyles = (fav: boolean) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    favoriteIcon: {
      marginLeft: 'auto',
      color: fav ? 'gold' : 'gray',
    },
  });

export default BookDetail;

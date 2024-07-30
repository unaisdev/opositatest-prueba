import {RouteProp} from '@react-navigation/native';
import React from 'react';

import {SafeAreaView, StyleSheet, Text} from 'react-native';
import {RootStackParams} from '../../navigation/types';

const BookDetail = ({
  route,
}: {
  route: RouteProp<RootStackParams, 'BookDetail'>;
}) => {
  const {book} = route.params;

  return (
    <SafeAreaView style={styles.container}>
      <Text>{book.name}</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default BookDetail;

import React from 'react';

import {SafeAreaView, StyleSheet, Text} from 'react-native';

const BookDetail = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text> BookDetail</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default BookDetail;

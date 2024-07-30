import React from 'react';

import {FlatList, SafeAreaView, StyleSheet, Text, View} from 'react-native';

const Books = () => {
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={[]}
        renderItem={({index, item}) => (
          <View style={styles.row}>
            <Text>BookName</Text>
          </View>
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
});

export default Books;

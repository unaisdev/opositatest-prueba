import React, {useCallback} from 'react';

import {TouchableOpacity, Text, StyleSheet} from 'react-native';

import {useSortingTypeStore} from '@storage/sorting';

import {SortingEnum} from '@type/index';

export const Sorting = () => {
  const {sortingType, setSortingType} = useSortingTypeStore();

  const toggleSorting = useCallback(() => {
    if (sortingType === SortingEnum.DEFAULT) {
      setSortingType(SortingEnum.ALPHABETICAL);

      return;
    }

    setSortingType(SortingEnum.DEFAULT);
  }, [setSortingType, sortingType]);

  return (
    <TouchableOpacity onPress={toggleSorting}>
      <Text style={styles.sectionHeaderOrder}>Ordenar Alfabeticamente</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  sectionHeaderOrder: {
    marginLeft: 'auto',
    fontSize: 10,
  },
});

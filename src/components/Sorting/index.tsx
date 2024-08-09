import React, {useCallback} from 'react';

import {TouchableOpacity, Text, StyleSheet} from 'react-native';

import {useSortingTypeStore} from '@storage/sorting/sorting';

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

  const buttonText =
    sortingType === SortingEnum.ALPHABETICAL
      ? 'Ordenar Alfabeticamente'
      : 'Ordenar Predeterminado';

  return (
    <TouchableOpacity onPress={toggleSorting}>
      <Text style={styles.sectionHeaderOrder}>{buttonText}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  sectionHeaderOrder: {
    marginLeft: 'auto',
    fontSize: 10,
  },
});

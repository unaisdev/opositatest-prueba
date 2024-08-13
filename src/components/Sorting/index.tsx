import React, {useCallback} from 'react';

import {TouchableOpacity, Text, StyleSheet} from 'react-native';

import {useSortingTypeStore} from '@storage/sorting/sorting';

import {SortingEnum} from '@type/sorting';
import Animated, {useSharedValue, withSpring} from 'react-native-reanimated';

const FONT_SIZE = 12;

export const Sorting = () => {
  const fontSize = useSharedValue(FONT_SIZE);
  const {sortingType, setSortingType} = useSortingTypeStore();

  const toggleSorting = useCallback(() => {
    if (sortingType === SortingEnum.DEFAULT) {
      setSortingType(SortingEnum.ALPHABETICAL);
      fontSize.value = withSpring(fontSize.value + 2);

      return;
    }

    setSortingType(SortingEnum.DEFAULT);
    fontSize.value = withSpring(FONT_SIZE);
  }, [setSortingType, sortingType]);

  const buttonText =
    sortingType === SortingEnum.ALPHABETICAL
      ? 'Ordenar Alfabeticamente'
      : 'Ordenar Predeterminado';

  return (
    <TouchableOpacity onPress={toggleSorting}>
      <Animated.Text style={[styles.sectionHeaderOrder, {fontSize}]}>
        {buttonText}
      </Animated.Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  sectionHeaderOrder: {
    marginLeft: 'auto',
    fontSize: 10,
  },
});

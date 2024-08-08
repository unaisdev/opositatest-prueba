import React, {useEffect} from 'react';

import {RootStackParams} from '@navigation/types';
import {RouteProp} from '@react-navigation/native';

import {Linking, Text, TouchableOpacity, View} from 'react-native';
import {AppLayout} from '@components/AppLayout';

import {useAppNavigation} from '@navigation/hooks/useAppNavigation';
import {useRecentBooksStore} from '@storage/recents';

import {useBookDetail} from './hooks/useBookDetail';

import {createStyles} from './styles';

const BookDetail = ({
  route,
}: {
  route: RouteProp<RootStackParams, 'BookDetail'>;
}) => {
  const {appNav} = useAppNavigation();
  const {book} = route.params;

  const {isFavorite, toggleFav} = useBookDetail(book);
  const addRecent = useRecentBooksStore(state => state.addRecent);

  const styles = createStyles(isFavorite);

  console.log('render detail');

  useEffect(() => {
    addRecent(book);
  }, [addRecent, book]);

  return (
    <AppLayout>
      <View style={styles.bookDetail}>
        <Text style={styles.bookDetailTitle}>{book.name}</Text>

        <Text>Autor: {book.authors.join(', ')}</Text>
        <Text>Editorial: {book.publisher}</Text>
        <Text>Número de páginas: {book.numberOfPages}</Text>
        <Text>Año de publicación: {book.released}</Text>

        <TouchableOpacity
          onPress={() => toggleFav(book)}
          style={styles.favoriteButton}>
          <Text>
            {isFavorite ? 'Quitar de favoritos' : 'Agregar a favoritos'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => appNav.goBack()}
          style={styles.closeButton}>
          <Text>Cerrar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            Linking.canOpenURL(book.url).then(() => {
              Linking.openURL(book.url);
            });
          }}
          style={styles.urlButton}>
          <Text>Abrir API en el navegador</Text>
        </TouchableOpacity>
      </View>
    </AppLayout>
  );
};

export default BookDetail;

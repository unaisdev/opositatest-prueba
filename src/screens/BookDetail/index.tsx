import {RouteProp} from '@react-navigation/native';
import React, {useEffect} from 'react';

import {
  Linking,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {RootStackParams} from '../../navigation/types';

import {useBookDetail} from './hooks/useBookDetail';
import {useAppNavigation} from '../../navigation/hooks/useAppNavigation';
import {useRecentBooksStore} from '../../storage/recents';

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
    <SafeAreaView style={styles.container}>
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
    bookDetail: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: '#fff',
      padding: 16,
    },
    bookDetailTitle: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 10,
    },
    favoriteButton: {
      backgroundColor: '#007bff',
      padding: 10,
      alignItems: 'center',
      marginVertical: 10,
    },
    closeButton: {
      backgroundColor: '#ccc',
      padding: 10,
      alignItems: 'center',
    },
    urlButton: {
      backgroundColor: '#02874a',
      padding: 10,
      alignItems: 'center',
      marginTop: 10,
    },
  });

export default BookDetail;

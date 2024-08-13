import React, {useEffect} from 'react';

import {RootStackParams} from '@navigation/types';
import {RouteProp} from '@react-navigation/native';

import {
  Image,
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {AppLayout} from '@components/AppLayout';

import {useAppNavigation} from '@navigation/hooks/useAppNavigation';
import {useRecentBooksStore} from '@storage/recents';

import {useBookDetail} from './hooks/useBookDetail';

import {createStyles} from './styles';
import Animated from 'react-native-reanimated';

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

  const authors = book.authors.join(', ');
  const favText = isFavorite ? 'Quitar de favoritos' : 'Agregar a favoritos';

  console.log('render detail');

  useEffect(() => {
    addRecent(book);
  }, [addRecent, book]);

  const pressFav = () => {
    toggleFav(book);
  };

  const goBack = () => {
    if (appNav.canGoBack()) {
      appNav.goBack();
    }
  };

  const openURL = async () => {
    const canOpen = await Linking.canOpenURL(book.url);

    if (canOpen) {
      Linking.openURL(book.url);
    }
  };

  return (
    <AppLayout>
      <View style={styles.bookDetail}>
        <Text style={styles.bookDetailTitle}>{book.name}</Text>

        <Image
          source={{
            uri: `https://covers.openlibrary.org/b/isbn/${book.isbn}-M.jpg`,
          }}
          style={styles.bookImage}
          resizeMode={'contain'}
        />

        <Text>Autor: {authors}</Text>
        <Text>Editorial: {book.publisher}</Text>
        <Text>Número de páginas: {book.numberOfPages}</Text>
        <Text>Año de publicación: {book.released}</Text>

        <TouchableOpacity onPress={pressFav} style={styles.favoriteButton}>
          <Text>{favText}</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={goBack} style={styles.closeButton}>
          <Text>Cerrar</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={openURL} style={styles.urlButton}>
          <Text>Abrir API en el navegador</Text>
        </TouchableOpacity>
      </View>
    </AppLayout>
  );
};

export default BookDetail;

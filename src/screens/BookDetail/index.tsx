import React, {useEffect} from 'react';

import {RouteProp} from '@react-navigation/native';

import {Image, Linking, Text, View} from 'react-native';
import {AppLayout} from '@components/AppLayout';

import {useAppNavigation} from '@navigation/hooks/useAppNavigation';
import {useRecentBooksStore} from '@storage/recents';

import {useBookDetail} from './hooks/useBookDetail';

import {createStyles} from './styles';

import {Button} from '@components/Button';
import {RootStackParams} from '@type/navigation';

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

        <Button onPress={pressFav} title={favText} variant="fav" />
        <Button onPress={goBack} title={'Cerrar'} variant="close" />
        <Button
          onPress={openURL}
          title={'Abrir API en el navegador'}
          variant="url"
        />
      </View>
    </AppLayout>
  );
};

export default BookDetail;

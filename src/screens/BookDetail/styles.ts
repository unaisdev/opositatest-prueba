import {StyleSheet} from 'react-native';

export const createStyles = (fav: boolean) =>
  StyleSheet.create({
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
    bookImage: {
      width: '100%',
      height: 200,
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

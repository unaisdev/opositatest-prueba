import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {Book} from '@type/books';

export type RootStackParams = {
  Books: undefined;
  BookDetail: {
    book: Book;
  };
};

export type NavigationProps = NativeStackNavigationProp<RootStackParams>;

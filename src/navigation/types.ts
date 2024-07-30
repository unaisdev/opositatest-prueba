import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {Book} from '../types';

export type RootStackParams = {
  Books: undefined;
  BookDetail: {
    book: Book;
  };
};

export type NavigationProps = NativeStackNavigationProp<RootStackParams>;

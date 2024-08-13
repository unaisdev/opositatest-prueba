import SearchBar from '@components/SearchBar';
import {useBooksFetch} from '@screens/Books/hooks/useBooksFetch';
import {useSearchText} from '@screens/Books/hooks/useSearchText';
import {styles} from '@screens/Books/styles';
import {TouchableOpacity, Text} from 'react-native';

export const TopSearchBar = () => {
  const {searchQuery, setSearchQuery} = useSearchText();
  const {refetch} = useBooksFetch();

  const updateBooksList = () => {
    refetch();
  };
  return (
    <SearchBar
      text={searchQuery}
      setInputText={setSearchQuery}
      buttonBelow={
        <TouchableOpacity onPress={updateBooksList} style={styles.searchButton}>
          <Text>Actualizar libros</Text>
        </TouchableOpacity>
      }
    />
  );
};

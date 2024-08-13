import {useBooksFetch} from '@screens/Books/hooks/useBooksFetch';
import {useSearchText} from '@screens/Books/hooks/useSearchText';
import {styles} from '@screens/Books/styles';
import {TextInput, TouchableOpacity, Text} from 'react-native';

const SearchBar = () => {
  const {searchQuery, setSearchQuery} = useSearchText();
  const {refetch} = useBooksFetch();

  const updateBooksList = () => {
    refetch();
  };

  return (
    <>
      <TextInput
        placeholder="Buscar"
        value={searchQuery}
        onChangeText={setSearchQuery}
        style={styles.searchInput}
      />
      <TouchableOpacity onPress={updateBooksList} style={styles.searchButton}>
        <Text>Actualizar libros</Text>
      </TouchableOpacity>
    </>
  );
};

export default SearchBar;

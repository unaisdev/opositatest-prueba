import {styles} from '@screens/Books/styles';
import {TextInput, TouchableOpacity, Text} from 'react-native';

type Props = {
  text: string;
  setInputText: (str: string) => void;
  buttonBelow: JSX.Element;
};

const SearchBar = ({text, setInputText, buttonBelow}: Props) => {
  return (
    <>
      <TextInput
        placeholder="Buscar"
        value={text}
        onChangeText={setInputText}
        style={styles.searchInput}
      />
      {buttonBelow}
    </>
  );
};

export default SearchBar;

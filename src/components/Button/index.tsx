import {TouchableOpacity, Text, StyleSheet} from 'react-native';

type ButtonVariants = 'fav' | 'close' | 'url';

type Props = {
  title: string;
  onPress: () => void;
  variant: ButtonVariants;
};

export const Button = ({title, variant, onPress}: Props) => {
  const styles = createStyles(variant);

  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Text>{title}</Text>
    </TouchableOpacity>
  );
};

const createStyles = (variant: ButtonVariants) => {
  return StyleSheet.create({
    container: {
      backgroundColor:
        variant === 'fav'
          ? '#007bff'
          : variant === 'close'
          ? '#ff0000'
          : variant === 'url'
          ? '#02874a'
          : '#ccc',
      padding: 10,
      alignItems: 'center',
      marginTop: 10,
    },
  });
};

import {useNavigation} from '@react-navigation/native';
import {NavigationProps} from '../types';

export function useAppNavigation() {
  const appNav = useNavigation<NavigationProps>();

  if (appNav === undefined) {
    throw new Error(
      "Couldn't find a navigation object. Is your component inside a screen in AppNavigator?",
    );
  }

  return {appNav};
}

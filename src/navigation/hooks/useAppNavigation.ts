import {useNavigation} from '@react-navigation/native';
import {NavigationProps} from '../types';

export function useAppNavigation() {
  const appNav = useNavigation<NavigationProps>();

  return {navigation: appNav.navigation, route: appNav.route};
}

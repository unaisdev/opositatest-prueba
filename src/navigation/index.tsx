import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Books from '../screens/Books';
import BookDetail from '../screens/BookDetail';

import {RootStackParams} from './types';

const Stack = createNativeStackNavigator<RootStackParams>();

export const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Books" component={Books} />
        <Stack.Screen name="BookDetail" component={BookDetail} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

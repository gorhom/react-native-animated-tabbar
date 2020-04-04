import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import RootScreen from './screens/Root';
import BubbleScreen from './screens/Bubble';
import BubbleStyledScreen from './screens/BubbleStyled';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Root" headerMode="none">
        <Stack.Screen name="Root" component={RootScreen} />
        <Stack.Screen name="Bubble" component={BubbleScreen} />
        <Stack.Screen name="BubbleStyled" component={BubbleStyledScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

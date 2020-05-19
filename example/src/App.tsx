import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import RootScreen from './screens/Root';
import BubbleScreen from './screens/Bubble';
import BubbleStyledScreen from './screens/BubbleStyled';
import BubbleRTLScreen from './screens/BubbleRTL';
import BubbleStandaloneScreen from './screens/BubbleStandalone';
import FlashyScreen from './screens/Flashy';
import FlashyStyledScreen from './screens/FlashyStyled';
import FlashyRTLScreen from './screens/FlashyRTL';
import FlashyStandaloneScreen from './screens/FlashyStandalone';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Root" headerMode="none">
        <Stack.Screen name="Root" component={RootScreen} />
        <Stack.Screen name="Bubble" component={BubbleScreen} />
        <Stack.Screen name="BubbleStyled" component={BubbleStyledScreen} />
        <Stack.Screen name="BubbleRTL" component={BubbleRTLScreen} />
        <Stack.Screen
          name="BubbleStandalone"
          component={BubbleStandaloneScreen}
        />
        <Stack.Screen name="Flashy" component={FlashyScreen} />
        <Stack.Screen name="FlashyStyled" component={FlashyStyledScreen} />
        <Stack.Screen name="FlashyRTL" component={FlashyRTLScreen} />
        <Stack.Screen
          name="FlashyStandalone"
          component={FlashyStandaloneScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

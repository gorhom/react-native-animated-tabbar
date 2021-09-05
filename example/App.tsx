import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import App from './src/Dev';

const Tabs = createBottomTabNavigator();

export default () => (
  <NavigationContainer>
    <Tabs.Navigator>
      <Tabs.Screen name="Home" component={App} />
    </Tabs.Navigator>
  </NavigationContainer>
);

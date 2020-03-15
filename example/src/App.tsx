import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import DummyScreen from './screens/DummyScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={DummyScreen} />
        <Tab.Screen name="Likes" component={DummyScreen} />
        <Tab.Screen name="Search" component={DummyScreen} />
        <Tab.Screen name="Profile" component={DummyScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

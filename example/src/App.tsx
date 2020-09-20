import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import RootScreen from './screens/Root';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Root" headerMode="none">
        <Stack.Screen name="Root" component={RootScreen} />

        {/* Bubble Preset */}
        <Stack.Screen
          name="Bubble"
          getComponent={() => require('./screens/bubble/Bubble').default}
        />
        <Stack.Screen
          name="BubbleStyled"
          getComponent={() => require('./screens/bubble/BubbleStyled').default}
        />
        <Stack.Screen
          name="BubbleRTL"
          getComponent={() => require('./screens/bubble/BubbleRTL').default}
        />
        <Stack.Screen
          name="BubbleStandalone"
          getComponent={() =>
            require('./screens/bubble/BubbleStandalone').default
          }
        />

        {/* Flashy Preset */}
        <Stack.Screen
          name="Flashy"
          getComponent={() => require('./screens/flashy/Flashy').default}
        />
        <Stack.Screen
          name="FlashyStyled"
          getComponent={() => require('./screens/flashy/FlashyStyled').default}
        />
        <Stack.Screen
          name="FlashyRTL"
          getComponent={() => require('./screens/flashy/FlashyRTL').default}
        />
        <Stack.Screen
          name="FlashyStandalone"
          getComponent={() =>
            require('./screens/flashy/FlashyStandalone').default
          }
        />

        {/* Material Preset */}
        <Stack.Screen
          name="MaterialIconWithLabel"
          getComponent={() =>
            require('./screens/material/Material').MaterialIconWithLabelScreen
          }
        />
        <Stack.Screen
          name="MaterialIconOnly"
          getComponent={() =>
            require('./screens/material/Material').MaterialIconOnlyScreen
          }
        />
        <Stack.Screen
          name="MaterialIconWithLabelOnFocus"
          getComponent={() =>
            require('./screens/material/Material')
              .MaterialIconWithLabelOnFocusScreen
          }
        />
        <Stack.Screen
          name="MaterialStyled"
          getComponent={() =>
            require('./screens/material/MaterialStyled').default
          }
        />
        <Stack.Screen
          name="MaterialRTL"
          getComponent={() => require('./screens/material/MaterialRTL').default}
        />
        <Stack.Screen
          name="MaterialStandalone"
          getComponent={() =>
            require('./screens/material/MaterialStandalone').default
          }
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

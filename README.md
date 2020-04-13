# Animated TabBar [![npm](https://badgen.net/npm/v/@gorhom/animated-tabbar)](https://www.npmjs.com/package/@gorhom/animated-tabbar)

a 60fps animated tab bar to be used with `React Navigation v4 & v5` created with `Reanimated` 😎, inspired by [Aurélien Salomon](https://dribbble.com/aureliensalomon) works on [Dribbble](https://dribbble.com/shots/5925052-Google-Bottom-Bar-Navigation-Pattern-Mobile-UX-Design).

<p align="center">
<img src="./preview.gif">
</p>

## Installation

```sh
yarn add @gorhom/animated-tabbar
# or
npm install @gorhom/animated-tabbar
```

> Also, you need to install [react-native-reanimated](https://github.com/software-mansion/react-native-reanimated), [react-native-gesture-handler](https://github.com/software-mansion/react-native-gesture-handler) & [react-native-svg](https://github.com/react-native-community/react-native-svg), and follow theirs installation instructions.

## Usage

<details>
  <summary>React Navigation v5</summary>

```tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AnimatedTabBar, {TabsConfigsType} from '@gorhom/animated-tabbar';

const tabs: TabsConfigsType = {
  Home: {
    labelStyle: {
      color: '#5B37B7',
    },
    icon: {
      component: /* ICON COMPONENT */,
      activeColor: 'rgba(91,55,183,1)',
      inactiveColor: 'rgba(0,0,0,1)',
    },
    background: {
      activeColor: 'rgba(223,215,243,1)',
      inactiveColor: 'rgba(223,215,243,0)',
    },
  },
  Profile: {
    labelStyle: {
      color: '#1194AA',
    },
    icon: {
      component: /* ICON COMPONENT */,
      activeColor: 'rgba(17,148,170,1)',
      inactiveColor: 'rgba(0,0,0,1)',
    },
    background: {
      activeColor: 'rgba(207,235,239,1)',
      inactiveColor: 'rgba(207,235,239,0)',
    },
  },
};

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        tabBar={props => (
          <AnimatedTabBar tabs={tabs} {...props} />
        )}
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
        />
      </Tab.Navigator>
    </NavigationContainer>
  )
}
```

</details>

<details>
  <summary>React Navigation v4</summary>

```tsx
import React from 'react';
import {createAppContainer} from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {createStackNavigator} from 'react-navigation-stack';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import AnimatedTabBar, {TabsConfigsType} from '@gorhom/animated-tabbar';

const tabs: TabsConfigsType = {
  Home: {
    labelStyle: {
      color: '#5B37B7',
    },
    icon: {
      component: /* ICON COMPONENT */,
      activeColor: 'rgba(91,55,183,1)',
      inactiveColor: 'rgba(0,0,0,1)',
    },
    background: {
      activeColor: 'rgba(223,215,243,1)',
      inactiveColor: 'rgba(223,215,243,0)',
    },
  },
  Profile: {
    labelStyle: {
      color: '#1194AA',
    },
    icon: {
      component: /* ICON COMPONENT */,
      activeColor: 'rgba(17,148,170,1)',
      inactiveColor: 'rgba(0,0,0,1)',
    },
    background: {
      activeColor: 'rgba(207,235,239,1)',
      inactiveColor: 'rgba(207,235,239,0)',
    },
  },
};

const TabNavigator = createBottomTabNavigator(
  {
    Home: HomeScreen,
    Profile: ProfileScreen,
  },
  {
    tabBarComponent: props => <AnimatedTabBar tabs={tabs} {...props} />,
  },
);

const AppContainer = createAppContainer(TabNavigator);

export default () => (
  <SafeAreaProvider>
    <AppContainer />
  </SafeAreaProvider>
);
```

</details>

### Animated Icon

In order to animate the tab icon color, you will need to use the provded prop `color` that will be provided to the icon.

This example below should explain it better:

```tsx
import React from 'react';
import Animated from 'react-native-reanimated';
import Svg, { Path } from 'react-native-svg';

const AnimatedPath = Animated.createAnimatedComponent(Path);

interface AnimatedSVGProps {
  color: Animated.Node<string>;
}

const AnimatedSVG = ({ color }: AnimatedSVGProps) => {
  return (
    <Svg width={20} height={22} viewBox="0 0 20 22">
      <AnimatedPath
        d="M1 8l9-7 9 7v11a2 2 0 01-2 2H3a2 2 0 01-2-2V8z"
        stroke={color}
        strokeWidth={2}
        fill="none"
        fillRule="evenodd"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export default AnimatedSVG;
```

## Props

| name           | required | default                          | description                                                                 |
| -------------- | -------- | -------------------------------- | --------------------------------------------------------------------------- |
| duration       | NO       | 500                              | Duration for the tabs animation.                                             |
| easing         | NO       | Easing.out(Easing.exp)           | `Reanimated Easing` function to be use for the tabs animation.        |
| tabs           | YES      |                                  | A dictionary for all tabs configurations, check `TabConfigsType` interface. |
| style          | NO       | { backgroundColor: 'white' }     | ViewStyle to be applied to the bottom bar container.                        |
| itemInnerSpace | NO       | { vertical: 12, horizontal: 12 } | Inner space to be added to the item.                                        |
| itemOuterSpace | NO       | { vertical: 12, horizontal: 12 } | Outer space to be added to the item.                                        |

### TabConfigsType

| name            | required | default | description                                                                        |
| --------------- | -------- | ------- | ---------------------------------------------------------------------------------- |
| icon            | YES      |         |                                                                                    |
| ├ component     | YES      |         | Component to be render as tab icon, it will recevie an animated node prop `color`. |
| ├ activeColor   | YES      |         | Color to be animated to when tab is active.                                        |
| └ inactiveColor | YES      |         | Color to be animated to when tab is inactive.                                      |
| labelStyle      | NO       |         | TextStyle to override tab label style.                                             |
| background      | YES      |         |                                                                                    |
| ├ activeColor   | YES      |         | Color to be animated to when tab is active.                                        |
| └ inactiveColor | YES      |         | Color to be animated to when tab is inactive.                                      |

## To Do

- [ ] Add accessibility support.
- [ ] Add more examples.

## Built With ❤️

- [react-native-reanimated](https://github.com/software-mansion/react-native-reanimated)
- [react-native-gesture-handler](https://github.com/software-mansion/react-native-gesture-handler)
- [react-native-redash](https://github.com/wcandillon/react-native-redash)
- [react-native-svg](https://github.com/react-native-community/react-native-svg)
- [react-navigation](https://github.com/react-navigation/react-navigation)
- [@react-native-community/bob](https://github.com/react-native-community/bob)

## Author

- [Mo Gorhom](https://twitter.com/gorhom)

## License

MIT

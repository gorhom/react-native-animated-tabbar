<div align="center">
<h1>Animated TabBar</h1>

[![npm](https://badgen.net/npm/v/@gorhom/animated-tabbar)](https://www.npmjs.com/package/@gorhom/animated-tabbar) [![npm](https://badgen.net/npm/license/@gorhom/animated-tabbar)](https://www.npmjs.com/package/@gorhom/animated-tabbar) [![npm](https://badgen.net/npm/types/@gorhom/animated-tabbar)](https://www.npmjs.com/package/@gorhom/animated-tabbar)

<img src="./preview.gif">

A **60fps** animated tab bar to be used with `React Navigation v4 & v5` with a variety of cool animation presets 😎.

</div>

---

## Table of Contents

1. [Installation](#installation)
2. [Usage](#usage)
    1. [Animated Icons](./docs/animated-icons.md)
3. [Props](#props)
4. [Presets](#presets)
5. [To Do](#to-do)
6. [Credits](#built-with)
7. [License](#license)

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
import AnimatedTabBar, {TabsConfig, BubbleTabConfig} from '@gorhom/animated-tabbar';

const tabs: TabsConfig<BubbleTabConfig> = {
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
import AnimatedTabBar, {TabsConfig, BubbleTabConfig} from '@gorhom/animated-tabbar';

const tabs: TabsConfig<BubbleTabConfig> = {
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

> To configure animated icons, please have a look at [Animated Icons](./docs/animated-icons.md).

## Props

### `preset`

Animation preset. `NEW ANIMATIONS COMING SOON 🎉`.

```ts
/**
 * @optional
 * @type {PresetEnum}
 * @default 'bubble'
 */
```

### `tabs`

Tabs configurations

```ts
/**
 * @required
 * @type {TabsConfig<T>} T extends preset tab config.
 */
```

### `style`

View style to be applied to tab bar container.

```ts
/**
 * @optional
 * @type {ViewStyle}
 */
```

### `duration`

Animation duration.

```ts
/**
 * @optional
 * @type {number}
 * @default 500
 */
```

### `easing`

Animation easing function.

```ts
/**
 * @optional
 * @type {Animated.EasingFunction}
 * @default Easing.out(Easing.exp)
 */
```

### `itemInnerSpace`

Inner space to be added to the tab item.

```ts
/**
 * @optional
 * @type {Space | number}
 * @default
 * {
 *   vertical: 12,
 *   horizontal: 12
 * }
 */
```

### `itemOuterSpace`

Outer space to be added to the tab item.

```ts
/**
 * @optional
 * @type {Space | number}
 * @default
 * {
 *   vertical: 12,
 *   horizontal: 12
 * }
 */
```

### `icon`

Tab item icon size.

```ts
/**
 * @optional
 * @type {number}
 * @default 24
 */
```

### `isRTL`

Tab bar layout and animation direction.

```ts
/**
 * @optional
 * @type {boolean}
 * @default false
 */
```

## Presets

Originally `Animated TabBar` started with `Bubble` as the only animation preset embedded. However, I felt the library structure could include many other variety of animation presets.

<table>
      <tr><td><a href="./docs/bubble-preset.md">Bubble Preset</a></td></tr>
      <tr><td><a href="./docs/bubble-preset.md"><img src="./docs/previews/bubble.gif" /></a></td></tr>
</table>

## To Do

- [ ] Add accessibility support.

<h2 id="built-with">Built With ❤️</h2>

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

---

<p align="center">
<a href="https://twitter.com/gorhom"><img src="./logo.png"></a>
</p>

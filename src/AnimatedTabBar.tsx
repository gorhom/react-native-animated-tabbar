import React, { useCallback, useMemo } from 'react';
import Animated from 'react-native-reanimated';
import { useSafeArea } from 'react-native-safe-area-context';
import { CommonActions } from '@react-navigation/native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { AnimatedTabBarItem } from './item';
import { styles } from './styles';
import { View } from 'react-native';

Animated.addWhitelistedNativeProps({
  width: true,
  stroke: true,
  backgroundColor: true,
});

interface AnimatedTabBarProps extends BottomTabBarProps {
  configs: any;
}

export const AnimatedTabBar = (props: AnimatedTabBarProps) => {
  // props
  const { state, navigation, descriptors, configs } = props;
  const { routes } = state;

  // variables
  const safeArea = useSafeArea();

  // styles
  const containerStyle = useMemo(
    () => [
      styles.container,
      {
        paddingBottom: safeArea.bottom,
      },
    ],
    [safeArea]
  );

  // callbacks
  const handleItemPress = useCallback(
    (name, key, focused) => () => {
      const event = navigation.emit({
        type: 'tabPress',
        target: key,
        canPreventDefault: true,
      });

      if (!focused && !event.defaultPrevented) {
        navigation.dispatch({
          ...CommonActions.navigate(name),
          target: state.key,
        });
      }
    },
    [navigation, state]
  );

  const handleItemLongPress = useCallback(
    key => () => {
      navigation.emit({
        type: 'tabLongPress',
        target: key,
      });
    },
    [navigation]
  );

  // render
  return (
    <View style={containerStyle}>
      {routes.map((route, index) => {
        const focused = index === state.index;
        const { options } = descriptors[route.key];
        const tabConfigs = configs[route.name];
        const label = options.title !== undefined ? options.title : route.name;
        const accessibilityLabel =
          options.tabBarAccessibilityLabel !== undefined
            ? options.tabBarAccessibilityLabel
            : typeof label === 'string'
            ? `${label}, tab, ${index + 1} of ${routes.length}`
            : undefined;

        return (
          <AnimatedTabBarItem
            key={route.key}
            configs={tabConfigs}
            focused={focused}
            label={label}
            accessibilityLabel={accessibilityLabel}
            testID={options.tabBarTestID}
            onPress={handleItemPress(route.name, route.key, focused)}
            onLongPress={handleItemLongPress(route.key)}
          />
        );
      })}
    </View>
  );
};

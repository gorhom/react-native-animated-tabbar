import React, { useCallback, useMemo } from 'react';
import { View } from 'react-native';
import Animated, { useCode, onChange, call } from 'react-native-reanimated';
import { useValues } from 'react-native-redash';
import { useSafeArea } from 'react-native-safe-area-context';
import { CommonActions } from '@react-navigation/native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { AnimatedTabBarItem } from './item';
import { styles } from './styles';

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
  const [selectedIndex] = useValues([0], []);

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
  const handleSelectedIndexChange = useCallback(
    index => {
      const { key, name } = state.routes[index];
      const event = navigation.emit({
        type: 'tabPress',
        target: key,
        canPreventDefault: true,
      });

      if (!event.defaultPrevented) {
        navigation.dispatch({
          ...CommonActions.navigate(name),
          target: state.key,
        });
      }
    },
    [state, navigation]
  );

  // effects
  useCode(
    () =>
      onChange(
        selectedIndex,
        call([selectedIndex], args => {
          handleSelectedIndexChange(args[0]);
        })
      ),
    [selectedIndex]
  );

  // render
  return (
    <View style={containerStyle}>
      {routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const tabConfigs = configs[route.name];
        const label = options.title !== undefined ? options.title : route.name;
        return (
          <AnimatedTabBarItem
            key={route.key}
            index={index}
            selectedIndex={selectedIndex}
            configs={tabConfigs}
            label={label}
          />
        );
      })}
    </View>
  );
};

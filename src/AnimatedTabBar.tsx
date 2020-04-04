import React, { useMemo, useEffect } from 'react';
import { View, ViewStyle, StyleProp } from 'react-native';
import Animated, { useCode, onChange, call } from 'react-native-reanimated';
import { useValues } from 'react-native-redash';
import { useSafeArea } from 'react-native-safe-area-context';
import { CommonActions, Route } from '@react-navigation/native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { AnimatedTabBarItem } from './item';
import { TabsConfigsType, AnimationConfigProps } from './types';
import { styles } from './styles';

Animated.addWhitelistedNativeProps({
  width: true,
  stroke: true,
  backgroundColor: true,
});

interface AnimatedTabBarProps extends BottomTabBarProps, AnimationConfigProps {
  /**
   * Tabs configurations.
   */
  tabs: TabsConfigsType;

  /**
   * Root container style.
   */
  style?: StyleProp<ViewStyle>;
}

export const AnimatedTabBar = (props: AnimatedTabBarProps) => {
  // props
  const {
    navigation,
    tabs,
    duration,
    easing,
    style: containerStyleOverride,
  } = props;

  console.log(containerStyleOverride);

  // variables
  const isReactNavigation5 = props.state ? true : false;
  // @ts-ignore
  const {
    routes,
    index: navigationIndex,
    key: navigationKey,
  }: { routes: Route<string>[]; index: number; key: string } = useMemo(() => {
    if (isReactNavigation5) {
      return props.state;
    } else {
      return {
        // @ts-ignore
        index: props.navigation.state.index,
        // @ts-ignore
        routes: props.navigation.state.routes,
        ket: '',
      };
    }
  }, [props, isReactNavigation5]);
  const safeArea = useSafeArea();
  const [selectedIndex] = useValues([0], []);

  // styles
  const containerStyle = useMemo(
    () => [
      styles.container,
      containerStyleOverride,
      {
        paddingBottom: safeArea.bottom,
      },
    ],
    [safeArea, containerStyleOverride]
  );

  // callbacks
  const getRouteLabel = (route: Route<string>) => {
    if (isReactNavigation5) {
      const { descriptors } = props;
      const { options } = descriptors[route.key];
      return options.title !== undefined ? options.title : route.name;
    } else {
      return route.key;
    }
  };

  const getRouteTabConfigs = (route: Route<string>) => {
    if (isReactNavigation5) {
      return tabs[route.name];
    } else {
      return tabs[route.key];
    }
  };

  const handleSelectedIndexChange = (index: number) => {
    if (isReactNavigation5) {
      const { key, name } = routes[index];
      const event = navigation.emit({
        type: 'tabPress',
        target: key,
        canPreventDefault: true,
      });

      if (!event.defaultPrevented) {
        navigation.dispatch({
          ...CommonActions.navigate(name),
          target: navigationKey,
        });
      }
    } else {
      // @ts-ignore
      const { onTabPress } = props;
      onTabPress({ route: routes[index] });
    }
  };

  // effects
  useEffect(() => {
    // @ts-ignore
    selectedIndex.setValue(navigationIndex);
  }, [navigationIndex, selectedIndex]);

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
        const configs = getRouteTabConfigs(route);
        const label = getRouteLabel(route);
        return (
          <AnimatedTabBarItem
            key={route.key}
            index={index}
            selectedIndex={selectedIndex}
            label={label}
            duration={duration}
            easing={easing}
            {...configs}
          />
        );
      })}
    </View>
  );
};

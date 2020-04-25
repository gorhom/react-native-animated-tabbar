import React, { useMemo, useEffect, useCallback } from 'react';
import Animated, { useCode, onChange, call } from 'react-native-reanimated';
import { useValues } from 'react-native-redash';
import { CommonActions, Route } from '@react-navigation/native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import Presets from './presets';
import {
  TabsConfigsType,
  TabBarViewProps,
  TabBarItemConfigurableProps,
  TabBarAnimationConfigurableProps,
} from './types';

Animated.addWhitelistedNativeProps({
  width: true,
  stroke: true,
  backgroundColor: true,
});

interface AnimatedTabBarProps
  extends Pick<BottomTabBarProps, 'state' | 'navigation' | 'descriptors'>,
    Pick<TabBarViewProps, 'style'>,
    TabBarItemConfigurableProps,
    TabBarAnimationConfigurableProps {
  /**
   * Tabs configurations.
   */
  tabs: TabsConfigsType;

  /**
   * Animation preset.
   */
  preset?: keyof typeof Presets;
}

export const AnimatedTabBar = (props: AnimatedTabBarProps) => {
  // props
  const {
    navigation,
    tabs,
    descriptors,
    preset = 'bubble',
    style,
    itemInnerSpace,
    itemOuterSpace,
    iconSize,
    duration,
    easing,
    isRTL,
  } = props;

  // verify props
  if (!Object.keys(Presets).includes(preset)) {
    throw new Error(
      `Wrong preset been provided. expected one of these: [${Object.keys(
        Presets
      ).join(', ')}], but found "${preset}".`
    );
  }

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
        key: '',
      };
    }
  }, [props, isReactNavigation5]);
  const [selectedIndex] = useValues([0], []);

  //#region callbacks
  const getRouteTitle = useCallback(
    (route: Route<string>) => {
      if (isReactNavigation5) {
        const { options } = descriptors[route.key];
        return options.tabBarLabel !== undefined &&
          typeof options.tabBarLabel === 'string'
          ? options.tabBarLabel
          : options.title !== undefined
          ? options.title
          : route.name;
      } else {
        return route.key;
      }
    },
    [isReactNavigation5, descriptors]
  );

  const getRouteTabConfigs = useCallback(
    (route: Route<string>) => {
      if (isReactNavigation5) {
        return tabs[route.name];
      } else {
        return tabs[route.key];
      }
    },
    [isReactNavigation5, tabs]
  );

  const getRoutes = useCallback(() => {
    return routes.map(route => ({
      title: getRouteTitle(route),
      key: route.key,
      ...getRouteTabConfigs(route),
    }));
  }, [routes, getRouteTitle, getRouteTabConfigs]);

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
  //#endregion

  //#region Effects
  /**
   * @DEV
   * here we listen to React Navigation index and update
   * selectedIndex value.
   */
  useEffect(() => {
    // @ts-ignore
    selectedIndex.setValue(navigationIndex);
  }, [navigationIndex, selectedIndex]);

  /**
   * @DEV
   * here we listen to selectedIndex and call `handleSelectedIndexChange`
   */
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
  //#endregion

  const PresetComponent = Presets[preset];

  // render
  return (
    <PresetComponent
      style={style}
      selectedIndex={selectedIndex}
      routes={getRoutes()}
      itemInnerSpace={itemInnerSpace}
      itemOuterSpace={itemOuterSpace}
      iconSize={iconSize}
      duration={duration}
      easing={easing}
      isRTL={isRTL}
    />
  );
};

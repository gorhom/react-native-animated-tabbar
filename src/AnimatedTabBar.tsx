import React, { useMemo, useCallback, useEffect, useRef } from 'react';
import type { LayoutChangeEvent } from 'react-native';
import { useSafeArea } from 'react-native-safe-area-context';
import { AnimatedTabBarView } from './AnimatedTabBarView';
import { useStableCallback } from './utilities';
import { useTabBarVisibility } from './hooks';
import type { PresetEnum } from './presets';
import type { AnimatedTabBarProps } from './types';
import Animated, {
  interpolate,
  Extrapolate,
  useCode,
  cond,
  eq,
  call,
  onChange,
} from 'react-native-reanimated';
import { useValue } from 'react-native-redash';

interface Route {
  name: string;
  key: string;
}

export function AnimatedTabBar<T extends PresetEnum>(
  props: AnimatedTabBarProps<T>
) {
  // props
  const {
    tabs,
    state,
    navigation,
    descriptors,
    onTabPress,
    onTabLongPress,
    style: overrideStyle,
    safeAreaInsets: overrideSafeAreaInsets,
    ...rest
  } = props;

  //#region variables
  const tabBarContainerRef = useRef<Animated.View>(null);
  const isReactNavigation5 = useMemo(() => Boolean(state), [state]);
  const tabBarHeight = useValue<number>(0);

  const CommonActions = useMemo(() => {
    if (isReactNavigation5) {
      const {
        CommonActions: _CommonActions,
      } = require('@react-navigation/native');
      return _CommonActions;
    } else {
      return undefined;
    }
  }, [isReactNavigation5]);
  const {
    index: navigationIndex,
    key: navigationKey,
    routes,
  }: {
    index: number;
    routes: Route[];
    key: string;
  } = useMemo(() => {
    if (isReactNavigation5) {
      return state;
    } else {
      return {
        index: navigation!.state.index,
        routes: navigation!.state.routes,
        key: '',
      };
    }
  }, [state, navigation, isReactNavigation5]);

  const shouldShowTabBar = useMemo(() => {
    /**
     * In React Navigation 4 the router view takes care of
     * hiding the tab bar.
     */
    if (!isReactNavigation5) {
      return true;
    }
    const route = routes[navigationIndex];
    const { options } = descriptors[route.key];
    return options.tabBarVisible ?? true;
  }, [isReactNavigation5, routes, descriptors, navigationIndex]);

  const shouldShowTabBarAnimated = useTabBarVisibility(shouldShowTabBar);

  const getRouteTitle = useCallback(
    (route: Route) => {
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
    (route: Route) => {
      if (isReactNavigation5) {
        return tabs[route.name];
      } else {
        return tabs[route.key];
      }
    },
    [isReactNavigation5, tabs]
  );

  const routesWithTabConfig = useMemo(() => {
    return routes.reduce((result: { [key: string]: {} }, route) => {
      result[route.key] = {
        title: getRouteTitle(route),
        ...getRouteTabConfigs(route),
      };
      return result;
    }, {});
  }, [routes, getRouteTitle, getRouteTabConfigs]) as any;
  //#endregion

  //#region styles
  const { bottom: _safeBottomArea } = useSafeArea();
  const safeBottomArea = useMemo(
    () => overrideSafeAreaInsets?.bottom ?? _safeBottomArea,
    [overrideSafeAreaInsets, _safeBottomArea]
  );
  const style = useMemo(
    () => ({
      // @ts-ignore
      ...overrideStyle,
      paddingBottom: safeBottomArea,
    }),
    [overrideStyle, safeBottomArea]
  );
  const containerStyle = useMemo(
    () => ({
      bottom: 0,
      left: 0,
      right: 0,
      transform: [
        {
          translateY: interpolate(shouldShowTabBarAnimated, {
            inputRange: [0, 1],
            outputRange: [tabBarHeight, 0],
            extrapolate: Extrapolate.CLAMP,
          }),
        },
      ],
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );
  //#endregion

  //#region callbacks
  const handleIndexChange = useStableCallback((index: number) => {
    if (isReactNavigation5) {
      const focused = index === navigationIndex;
      const { key, name } = routes[index];

      const event = navigation.emit({
        type: 'tabPress',
        target: key,
        canPreventDefault: true,
      });

      if (!focused && !event.defaultPrevented) {
        navigation.dispatch({
          ...CommonActions.navigate(name),
          target: navigationKey,
        });
      }
    } else {
      onTabPress({ route: routes[index] });
    }
  });
  const handleLongPress = useStableCallback((index: number) => {
    if (isReactNavigation5) {
      const { key } = routes[index];
      navigation.emit({
        type: 'tabLongPress',
        target: key,
      });
    } else {
      onTabLongPress({ route: routes[index] });
    }
  });
  const handleLayout = useCallback(
    ({
      nativeEvent: {
        layout: { height },
      },
    }: LayoutChangeEvent) => {
      tabBarHeight.setValue(height);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );
  //#endregion

  //#region effects
  useCode(
    () =>
      onChange(
        shouldShowTabBarAnimated,
        cond(
          eq(shouldShowTabBarAnimated, 1),
          call([], () => {
            if (tabBarContainerRef.current) {
              // @ts-ignore
              tabBarContainerRef.current.setNativeProps({
                style: {
                  position: 'relative',
                },
              });
            }
          })
        )
      ),
    []
  );
  useEffect(() => {
    if (!shouldShowTabBar) {
      if (tabBarContainerRef.current) {
        // @ts-ignore
        tabBarContainerRef.current.setNativeProps({
          style: {
            position: 'absolute',
          },
        });
      }
    }
  }, [shouldShowTabBar]);
  //#endregion

  // render
  return (
    <Animated.View
      ref={tabBarContainerRef}
      style={containerStyle}
      onLayout={handleLayout}
    >
      <AnimatedTabBarView
        index={navigationIndex}
        onIndexChange={handleIndexChange}
        onLongPress={handleLongPress}
        tabs={routesWithTabConfig}
        style={style}
        {...rest}
      />
    </Animated.View>
  );
}

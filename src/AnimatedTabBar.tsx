import React, { useMemo, useCallback } from 'react';
import { Insets } from 'react-native';
import { useSafeArea } from 'react-native-safe-area-context';
import { AnimatedTabBarView } from './AnimatedTabBarView';
import { useStableCallback } from './utilities';
import Presets, { PresetEnum } from './presets';
import { TabsConfig, AnimatedTabBarViewProps } from './types';

interface AnimatedTabBarProps<T extends PresetEnum>
  extends Omit<
    AnimatedTabBarViewProps<T>,
    'index' | 'onIndexChange' | 'tabs' | 'onLongPress'
  > {
  /**
   * Tabs configurations.
   */
  tabs: TabsConfig<typeof Presets[T]['$t']>;

  /**
   * React Navigation Props
   */
  state?: any;
  navigation?: any;
  descriptors?: any;
  onTabPress?: any;
  onTabLongPress?: any;
  safeAreaInsets?: Insets;
}

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
      ...{ paddingBottom: safeBottomArea },
    }),
    [overrideStyle, safeBottomArea]
  );
  //#endregion

  //#region variables
  const isReactNavigation5 = useMemo(() => Boolean(state), [state]);
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
      return {
        index: state.index,
        routes: state.routes,
        key: state.key,
      };
    } else {
      return {
        index: navigation!.state.index,
        routes: navigation!.state.routes,
        key: '',
      };
    }
  }, [state.index, state.routes, state.key, navigation, isReactNavigation5]);

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
    return routes.map(route => ({
      title: getRouteTitle(route),
      key: route.key,
      ...getRouteTabConfigs(route),
    }));
  }, [routes, getRouteTitle, getRouteTabConfigs]);
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
  //#endregion

  // render
  return (
    <AnimatedTabBarView
      index={navigationIndex}
      onIndexChange={handleIndexChange}
      onLongPress={handleLongPress}
      // @ts-ignore
      tabs={routesWithTabConfig}
      style={style}
      {...rest}
    />
  );
}

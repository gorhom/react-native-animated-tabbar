import React, { useMemo, useCallback } from 'react';
import { useSafeArea } from 'react-native-safe-area-context';
import {
  AnimatedTabBarView,
  AnimatedTabBarViewProps,
} from './AnimatedTabBarView';
import Presets, { PresetEnum } from './presets';
import { TabsConfig } from './types';

interface AnimatedTabBarProps<T extends PresetEnum>
  extends Omit<AnimatedTabBarViewProps<T>, 'index' | 'onIndexChange' | 'tabs'> {
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
    style: overrideStyle,
    ...rest
  } = props;

  //#region styles
  const { bottom: safeBottomArea } = useSafeArea();
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
      return state!;
    } else {
      return {
        index: navigation!.state.index,
        routes: navigation!.state.routes,
        key: '',
      };
    }
  }, [state, navigation, isReactNavigation5]);

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
  const handleIndexChange = (index: number) => {
    if (isReactNavigation5) {
      const { key, name } = routes[index];
      const event = navigation!.emit({
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
      onTabPress({ route: routes[index] });
    }
  };
  //#endregion

  // render
  return (
    <AnimatedTabBarView
      index={navigationIndex}
      onIndexChange={handleIndexChange}
      // @ts-ignore
      tabs={routesWithTabConfig}
      style={style}
      {...rest}
    />
  );
}

import { TextStyle, StyleProp, ViewStyle } from 'react-native';
import Animated from 'react-native-reanimated';

export interface TabConfigsType {
  labelStyle: TextStyle;
  icon: {
    component:
      | ((props: {
          color: Animated.Node<string | number>;
          size: number;
        }) => React.ReactNode)
      | React.ReactNode;
    activeColor: string;
    inactiveColor: string;
  };
  background: {
    activeColor: string;
    inactiveColor: string;
  };
}

export type TabsConfigsType<
  T = { [key: string]: TabConfigsType },
  K extends keyof T = keyof T
> = {
  [key in K]: TabConfigsType
}
  
export interface TabBarAnimationConfigurableProps {
  /**
   * Animation duration.
   * @default 500
   */
  duration?: number;
  /**
   * Animation easing function.
   * @default Easing.out(Easing.exp)
   */
  easing?: Animated.EasingFunction;
}

interface Space {
  vertical: number;
  horizontal: number;
}

export interface TabBarItemConfigurableProps {
  /**
   * Item padding space.
   * @default 12
   */
  itemInnerSpace?: number | Space;
  /**
   * Item margin space.
   * @default 12
   */
  itemOuterSpace?: number | Space;
  /**
   * Icon size.
   * @default 24
   */
  iconSize?: number;
  /**
   * Item layout direction.
   * @default false
   */
  isRTL?: boolean;
}

interface TabRoute extends TabConfigsType {
  title: string;
  key: string;
}

export interface TabBarViewProps
  extends TabBarAnimationConfigurableProps,
    TabBarItemConfigurableProps {
  /**
   * Selected animated index.
   */
  selectedIndex: Animated.Value<number>;
  /**
   * Mapped routes with tab configs to be presented.
   */
  routes: TabRoute[];
  /**
   * Root container style.
   */
  style?: StyleProp<ViewStyle>;
}

export interface TabBarItemProps
  extends Required<TabBarAnimationConfigurableProps>,
    Required<TabBarItemConfigurableProps>,
    TabConfigsType {
  /**
   * Selected animated index.
   */
  selectedIndex: Animated.Value<number>;
  index: number;
  label: string;
}

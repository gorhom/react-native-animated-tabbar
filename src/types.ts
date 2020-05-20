import { StyleProp, ViewStyle } from 'react-native';
import Animated from 'react-native-reanimated';

export type TabsConfig<T, P = { [key: string]: T }> = {
  [key in keyof P]: T;
};

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
  vertical?: number;
  horizontal?: number;
}

export interface TabBarItemConfigurableProps {
  /**
   * Item padding space.
   * @default PresetConstants
   */
  itemInnerSpace?: number | Space;
  /**
   * Item margin space.
   * @default PresetConstants
   */
  itemOuterSpace?: number | Space;
  /**
   * Item container width.
   * @default PresetConstants
   */
  itemContainerWidth?: 'auto' | 'fill';
  /**
   * Icon size.
   * @default PresetConstants
   */
  iconSize?: number;
  /**
   * Item layout direction.
   * @default false
   */
  isRTL?: boolean;
}

export interface TabInfo {
  title: string;
  key: string;
}

export interface TabBarViewProps<T>
  extends TabBarAnimationConfigurableProps,
    TabBarItemConfigurableProps {
  /**
   * Selected animated index.
   */
  selectedIndex: Animated.Value<number>;
  /**
   * Tabs configs.
   */
  tabs: Array<TabInfo & T>;
  /**
   * Root container style.
   */
  style?: StyleProp<ViewStyle>;
}

export interface TabBarItemProps
  extends Required<TabBarAnimationConfigurableProps>,
    Required<TabBarItemConfigurableProps> {
  /**
   * Selected animated index.
   */
  selectedIndex: Animated.Value<number>;
  index: number;
  label: string;
}

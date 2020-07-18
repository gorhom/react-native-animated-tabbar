import type { StyleProp, ViewStyle, Insets } from 'react-native';
import type Animated from 'react-native-reanimated';
import type Presets from './presets';
import type { PresetEnum } from './presets';

export type TabsConfig<T, P = { [key: string]: T }> = {
  [key in keyof P]: T;
};

interface Space {
  vertical?: number;
  horizontal?: number;
}

export interface TabBarConfigurableProps {
  /**
   * Animation duration.
   * @default PresetConstants
   */
  duration?: number;
  /**
   * Animation easing function.
   * @default Easing.out(Easing.exp)
   */
  easing?: Animated.EasingFunction;
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
  /**
   * Callback when item been long pressed.
   */
  onLongPress?: (index: number) => void;
}

export interface TabInfo {
  title: string;
  key: string;
}

export type TabBarViewProps<C, T> = {
  /**
   * Selected animated index.
   */
  selectedIndex: Animated.Value<number>;
  /**
   * Callback when animated index change.
   */
  animatedOnChange: (index: number) => Animated.Node<number>;
  /**
   * Tabs configs.
   */
  tabs: Array<TabInfo & T>;
  /**
   * Root container style.
   */
  style?: StyleProp<ViewStyle>;
} & TabBarConfigurableProps &
  C;

export interface TabBarItemProps
  extends Required<
    Omit<TabBarConfigurableProps, 'onLongPress' | 'duration' | 'easing'>
  > {
  /**
   * Animated focus value.
   */
  animatedFocus: Animated.Node<number>;
  /**
   * Tab index.
   */
  index: number;
  /**
   * Tab label.
   */
  label: string;
}

export type AnimatedTabBarProps<T extends PresetEnum = 'bubble'> = {
  /**
   * Animation preset.
   */
  preset?: T;

  /**
   * Tabs configurations.
   */
  tabs: TabsConfig<typeof Presets[T]['$t']>;

  /**
   * Root container style.
   */
  style?: StyleProp<ViewStyle>;

  /**
   * React Navigation Props
   */
  state?: any;
  navigation?: any;
  descriptors?: any;
  onTabPress?: any;
  onTabLongPress?: any;
  safeAreaInsets?: Insets;
} & Omit<TabBarConfigurableProps, 'onLongPress'> &
  ExtractPresetConfig<T>;

export type AnimatedTabBarViewProps<T extends PresetEnum> = {
  /**
   * Initial index.
   */
  index: number;

  /**
   * Tabs configurations.
   */
  tabs: TabsConfig<typeof Presets[T]['$t'] & Partial<TabInfo>>;

  /**
   * Animation preset.
   */
  preset?: T;

  /**
   * Root container style.
   */
  style?: StyleProp<ViewStyle>;

  /**
   * Callback when animated index changes.
   */
  onIndexChange: (index: number) => void;
} & TabBarConfigurableProps &
  ExtractPresetConfig<T>;

export type ExtractPresetConfig<T extends PresetEnum> = {
  [k in keyof typeof Presets[T]['$c']]: typeof Presets[T]['$c'][k];
};

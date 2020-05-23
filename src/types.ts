import { StyleProp, ViewStyle } from 'react-native';
import Animated from 'react-native-reanimated';
import Presets, { PresetEnum } from './presets';

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

export interface TabBarViewProps<T> extends TabBarConfigurableProps {
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

export interface TabBarItemProps extends Required<TabBarConfigurableProps> {
  /**
   * Selected animated index.
   */
  selectedIndex: Animated.Value<number>;
  /**
   * Tab index.
   */
  index: number;
  /**
   * Tab label.
   */
  label: string;
}

export interface AnimatedTabBarViewProps<T extends PresetEnum>
  extends Omit<TabBarViewProps<{}>, 'selectedIndex' | 'tabs'> {
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
   * Callback when animated index changes.
   */
  onIndexChange: (index: number) => void;
}

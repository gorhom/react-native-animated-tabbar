import type { TextStyle } from 'react-native';
import type Animated from 'react-native-reanimated';
import type { TabBarItemProps } from '../../types';

export interface FlashyTabBarConfig {}

export interface FlashyTabBarItemConfig {
  /**
   * Tab bar item label style.
   * @type {TextStyle}
   * @default
   * {
   *   color: '#000',
   *   fontSize: 14,
   *   fontWeight: '600'
   * }
   */
  labelStyle: TextStyle;
  /**
   * Tab bar item icon config.
   */
  icon: {
    /**
     * Tab bar item icon component, this could be a function or class component.
     * @type {React.FC<FlashyTabBarIconProps> | React.ComponentClass<FlashyTabBarIconProps>}
     */
    component:
      | React.FC<FlashyTabBarIconProps>
      | React.ComponentClass<FlashyTabBarIconProps>
      | React.ReactNode;
    /**
     * Icon color.
     * @type {string}
     */
    color: string;
  };
  /**
   * Tab bar item indicator config.
   */
  indicator?: {
    /**
     * To show or hide tab bar item indicator.
     * @type {boolean}
     * @default true
     */
    visible?: boolean;

    /**
     * Indicator color
     * @type {boolean}
     * @default labelStyle.color|black
     */
    color?: string;

    /**
     * Indicator size
     * @type {number}
     * @default 6
     */
    size?: number;
  };
}

export type FlashyTabBarItemProps = TabBarItemProps & FlashyTabBarItemConfig;

export interface FlashyTabBarIconProps {
  /**
   * Tab bar item animated focus value.
   * @type {Animated.Node<number>}
   */
  animatedFocus: Animated.Node<number>;
  /**
   * Tab bar item icon color.
   * @type {string}
   */
  color: string;
  /**
   * Tab bar item icon size.
   * @type {number}
   */
  size: number;
}

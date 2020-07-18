import type { TextStyle, StyleProp } from 'react-native';
import type Animated from 'react-native-reanimated';
import type { TabBarItemProps } from '../../types';

export interface MaterialTabBarConfig {
  /**
   * Material animation preset.
   * @type {'iconWithLabel' | 'iconOnly' | 'iconWithLabelOnFocus'}
   * @default 'iconWithLabel'
   */
  animation?: 'iconWithLabel' | 'iconOnly' | 'iconWithLabelOnFocus';
  /**
   * Tab bar item inactive opacity.
   * @type {number}
   * @default 0.75
   */
  inactiveOpacity?: number;
  /**
   * Tab bar item inactive scale.
   * @type {number}
   * @default 0.85
   */
  inactiveScale?: number;
}

export interface MaterialTabBarItemConfig {
  /**
   * Tab bar item label style.
   */
  labelStyle?: StyleProp<TextStyle>;
  /**
   * Tab bar item icon config.
   */
  icon: {
    /**
     * Tab bar item icon component, this could be a function or
     * a react node.
     * @type {(props: MaterialTabBarIconProps) => React.ReactNode | React.ReactNode}
     */
    component:
      | React.FC<MaterialTabBarIconProps>
      | React.ComponentClass<MaterialTabBarIconProps>
      | React.ReactNode;
    /**
     * Icon color.
     * @type {string}
     */
    color: string;
  };
  /**
   * Tab bar item ripple config.
   */
  ripple: {
    /**
     * Tab bar item ripple color.
     * @type {string}
     */
    color: string;
  };
}

export type MaterialTabBarItemProps = TabBarItemProps &
  MaterialTabBarItemConfig &
  Required<
    Pick<
      MaterialTabBarConfig,
      'animation' | 'inactiveOpacity' | 'inactiveScale'
    >
  >;

export interface MaterialTabBarIconProps {
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

import type { TextProps, TextStyle } from 'react-native';
import type Animated from 'react-native-reanimated';
import type { TabBarItemProps } from '../../types';

export interface BubbleTabBarConfig {}

export interface BubbleTabBarItemConfig {
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
   * Specifies whether fonts should scale to respect Text Size accessibility settings. The default is true.
   */
  labelAllowFontScaling: TextProps['allowFontScaling'];
  /**
   * Tab bar item icon config.
   */
  icon: {
    /**
     * Tab bar item icon component, this could be a function or class component.
     * @type {React.FC<BubbleTabBarIconProps> | React.ComponentClass<BubbleTabBarIconProps>}
     */
    component:
      | React.FC<BubbleTabBarIconProps>
      | React.ComponentClass<BubbleTabBarIconProps>
      | React.ReactNode;

    /**
     * Icon active color.
     * @type {string}
     */
    activeColor: string;
    /**
     * Icon inactive color.
     * @type {string}
     */
    inactiveColor: string;

    /**
     * Icon second color.
     */
    secondColor?: {
      /**
       * Tab bar item second color active variant.
       * @type {string}
       */
      activeColor: string;
      /**
       * Tab bar item second color inactive variant.
       * @type {string}
       */
      inactiveColor: string;
    };
  };
  background: {
    /**
     * Tab bar item background active color.
     * @type {string}
     */
    activeColor: string;
    /**
     * Tab bar item background inactive color.
     * @type {string}
     */
    inactiveColor: string;
  };
}

export type BubbleTabBarItemProps = TabBarItemProps & BubbleTabBarItemConfig;

export interface BubbleTabBarIconProps {
  /**
   * Tab bar item animated focus value.
   * @type {Animated.Node<number>}
   */
  animatedFocus: Animated.Node<number>;

  /**
   * Tab bar item animated focus value reverse.
   * @type {Animated.Node<number> | undefined}
   */
  reverseAnimatedFocus?: Animated.Node<number>;
  /**
   * Tab bar item animated icon color.
   * @type {Animated.Node<string | number>}
   */
  color: Animated.Node<string | number>;

  /**
   * Tab bar item animated second icon color.
   * @type {Animated.Node<string | number> | undefined}
   */
  secondColor?: Animated.Node<string | number>;

  /**
   * Tab bar item icon size.
   * @type {number}
   */
  size: number;
}

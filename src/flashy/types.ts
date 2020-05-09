import { TextStyle } from 'react-native';
import Animated from 'react-native-reanimated';

export interface FlashyTabConfig {
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
     * Tab bar item icon component, this could be a function or
     * a react node.
     * @type {(props: FlashyTabIconProps) => React.ReactNode | React.ReactNode}
     */
    component:
      | ((props: FlashyTabIconProps) => React.ReactNode)
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

export interface FlashyTabIconProps {
  animatedFocus: Animated.Node<number>;
  color: string;
  size: number;
}

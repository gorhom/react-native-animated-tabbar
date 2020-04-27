import { TextStyle } from 'react-native';
import Animated from 'react-native-reanimated';

export interface BubbleTabConfig {
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
     * @type {(props: BubbleTabIconProps) => React.ReactNode | React.ReactNode}
     */
    component:
      | ((props: BubbleTabIconProps) => React.ReactNode)
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

export interface BubbleTabIconProps {
  animatedFocus: Animated.Node<number>;
  color: Animated.Node<string | number>;
  size: number;
}

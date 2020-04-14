import { TextStyle } from 'react-native';
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

export interface TabsConfigsType {
  [key: string]: TabConfigsType;
}

export interface AnimationConfigProps {
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

export interface AnimatedTabBarItemConfigurableProps {
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
   * icon size.
   * @default 24
   */
  iconSize?: number;
}

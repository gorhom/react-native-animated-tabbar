import { TextStyle } from 'react-native';
import Animated from 'react-native-reanimated';

export interface TabConfig {
  labelStyle: TextStyle;
  icon: {
    component:
      | ((props: { color: Animated.Node<string | number> }) => React.ReactNode)
      | React.ReactNode;
    activeColor: string;
    inactiveColor: string;
  };
  background: {
    activeColor: string;
    inactiveColor: string;
  };
}

export interface TabsConfigs {
  [key: string]: TabConfig;
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

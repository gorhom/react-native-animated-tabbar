import { TextStyle } from 'react-native';
import Animated from 'react-native-reanimated';

export interface BubbleTabConfig {
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

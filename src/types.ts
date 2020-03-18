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

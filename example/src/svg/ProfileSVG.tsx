import * as React from 'react';
import Animated from 'react-native-reanimated';
import Svg, { G, Path, Circle, PathProps, CircleProps } from 'react-native-svg';
import { SVGProps } from './types';

const AnimatedPath = (Animated.createAnimatedComponent(
  Path
) as any) as React.ComponentClass<
  Animated.AnimateProps<{}, PathProps & { style?: any }>
>;
const AnimatedCircle = (Animated.createAnimatedComponent(
  Circle
) as any) as React.ComponentClass<
  Animated.AnimateProps<{}, CircleProps & { style?: any }>
>;

Animated.addWhitelistedNativeProps({
  stroke: true,
});

const ProfileSVG = ({ color, size }: SVGProps) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <G
        transform="translate(4 3)"
        strokeWidth={2}
        fill="none"
        fillRule="evenodd"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <AnimatedPath
          d="M16 18v-2a4 4 0 00-4-4H4a4 4 0 00-4 4v2"
          stroke={color}
        />
        <AnimatedCircle cx={8} cy={4} r={4} stroke={color} />
      </G>
    </Svg>
  );
};

export default ProfileSVG;

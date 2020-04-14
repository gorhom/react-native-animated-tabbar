import * as React from 'react';
import Animated from 'react-native-reanimated';
import Svg, { G, Path, Circle } from 'react-native-svg';
import { SVGProps } from './types';

const AnimatedPath = Animated.createAnimatedComponent(Path);
const AnimatedCircle = Animated.createAnimatedComponent(Circle);
Animated.addWhitelistedNativeProps({
  stroke: true,
});

const ProfileSVG = ({ color, size }: SVGProps) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 18 20">
      <G
        transform="translate(1 1)"
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

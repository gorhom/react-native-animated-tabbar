import * as React from 'react';
import Animated from 'react-native-reanimated';
import Svg, { Path } from 'react-native-svg';
import { SVGProps } from './types';

const AnimatedPath = Animated.createAnimatedComponent(Path);
Animated.addWhitelistedNativeProps({
  stroke: true,
});

const HomeSVG = ({ color }: SVGProps) => {
  return (
    <Svg width={20} height={22} viewBox="0 0 20 22">
      <AnimatedPath
        d="M1 8l9-7 9 7v11a2 2 0 01-2 2H3a2 2 0 01-2-2V8z"
        stroke={color}
        strokeWidth={2}
        fill="none"
        fillRule="evenodd"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export default HomeSVG;

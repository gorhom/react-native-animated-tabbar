import * as React from 'react';
import Animated from 'react-native-reanimated';
import Svg, { Path, PathProps } from 'react-native-svg';
import { SVGProps } from './types';

const AnimatedPath = (Animated.createAnimatedComponent(
  Path
) as any) as React.ComponentClass<
  Animated.AnimateProps<{}, PathProps & { style?: any }>
>;

Animated.addWhitelistedNativeProps({
  stroke: true,
});

const HomeSVG = ({ color, size }: SVGProps) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <AnimatedPath
        d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
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

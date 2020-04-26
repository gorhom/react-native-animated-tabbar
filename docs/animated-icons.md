# Animated Icons

In order to animate the tab icon color, shape & size. You will need to use the provded props `color` & `animatedFocus` that will be provided to the icon.

This example for `bubble` icon below should explain it better:

```tsx
import React from 'react';
import Animated from 'react-native-reanimated';
import Svg, { Path } from 'react-native-svg';

const AnimatedPath = Animated.createAnimatedComponent(Path);

interface AnimatedSVGProps {
  /**
   * The tab animated focus:
   * 1 is active
   * 0 is inactive
   */
  animatedFocus: Animated.Node<number>;

  /**
   * Animated color.
   */
  color: Animated.Node<string>;

  /**
   * Icon size.
   */
  size: number;
}

const AnimatedSVG = ({ animatedFocus, color, size }: AnimatedSVGProps) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 20 22">
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

export default AnimatedSVG;
```
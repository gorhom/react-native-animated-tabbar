import Animated, { Easing } from 'react-native-reanimated';

const DEFAULT_ITEM_ANIMATION_EASING: Animated.EasingFunction = Easing.out(
  Easing.exp
);
const DEFAULT_ITEM_ANIMATION_DURATION = 750;
const DEFAULT_ITEM_INNER_SPACE = 12;
const DEFAULT_ITEM_OUTER_SPACE = 12;
const DEFAULT_ITEM_ICON_SIZE = 24;
const DEFAULT_ITEM_LAYOUT_DIRECTION = false;

export {
  DEFAULT_ITEM_ANIMATION_EASING,
  DEFAULT_ITEM_ANIMATION_DURATION,
  DEFAULT_ITEM_INNER_SPACE,
  DEFAULT_ITEM_OUTER_SPACE,
  DEFAULT_ITEM_ICON_SIZE,
  DEFAULT_ITEM_LAYOUT_DIRECTION,
};

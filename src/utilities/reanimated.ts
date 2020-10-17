const {
  Easing: EasingV1,
  EasingNode: EasingV2,
} = require('react-native-reanimated');

export const Easing = EasingV2 || EasingV1;

const {
  interpolate: interpolateV1,
  interpolateNode: interpolateV2,
} = require('react-native-reanimated');

export const interpolate = interpolateV2 || interpolateV1;

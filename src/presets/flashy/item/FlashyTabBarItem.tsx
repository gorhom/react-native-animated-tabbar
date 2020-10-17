import React, { useMemo, memo } from 'react';
import { View, Text, ViewStyle, LayoutChangeEvent } from 'react-native';
import Animated from 'react-native-reanimated';
// @ts-ignore 😞
import MaskedView from '@react-native-community/masked-view';
import { Svg, Circle, SvgProps, CircleProps } from 'react-native-svg';
import {
  useValues,
  transformOrigin,
  toRad,
} from 'react-native-redash/lib/module/v1';
// @ts-ignore 😞
import isEqual from 'lodash.isequal';
import {
  DEFAULT_INDICATOR_VISIBILITY,
  DEFAULT_INDICATOR_SIZE,
  DEFAULT_INDICATOR_COLOR,
} from '../constants';
import { interpolate } from '../../../utilities';
import type { FlashyTabBarItemProps } from '../types';
import { styles } from './styles';

const AnimatedSvg = Animated.createAnimatedComponent(
  Svg
) as React.ComponentClass<Animated.AnimateProps<ViewStyle, SvgProps>, any>;
const AnimatedCircle = Animated.createAnimatedComponent(
  Circle
) as React.ComponentClass<
  Animated.AnimateProps<ViewStyle, CircleProps & { style?: any }>,
  any
>;

const { add, sub, max, divide, multiply, Extrapolate } = Animated;

const FlashyTabBarItemComponent = ({
  animatedFocus,
  label,
  icon,
  labelStyle: labelStyleOverride,
  spacing,
  iconSize,
  indicator,
  isRTL,
}: FlashyTabBarItemProps) => {
  //#region extract props
  const {
    innerVerticalSpace,
    innerHorizontalSpace,
    outerVerticalSpace,
    outerHorizontalSpace,
  } = spacing;
  const {
    size: _indicatorSize,
    color: _indicatorColor,
    visible: _indicatorVisible,
  } = indicator || {
    size: undefined,
    color: undefined,
    visible: undefined,
  };
  const { indicatorVisibility, indicatorColor, indicatorSize } = useMemo(() => {
    return {
      indicatorVisibility: _indicatorVisible ?? DEFAULT_INDICATOR_VISIBILITY,
      indicatorColor:
        _indicatorColor ?? labelStyleOverride?.color ?? DEFAULT_INDICATOR_COLOR,
      indicatorSize: _indicatorSize ?? DEFAULT_INDICATOR_SIZE,
    };
  }, [_indicatorVisible, _indicatorColor, _indicatorSize, labelStyleOverride]);
  //#endregion

  //#region variables
  const [labelWidth, labelHeight] = useValues<number>(0, 0);
  const containerHeight = useMemo(() => iconSize + innerVerticalSpace * 2, [
    iconSize,
    innerVerticalSpace,
  ]);
  const containerWidth = max(
    add(labelWidth, innerHorizontalSpace * 2),
    iconSize + innerHorizontalSpace * 2
  );
  //#endregion

  //#region styles
  const outerContainerStyle = [
    styles.outerContainer,
    {
      paddingHorizontal: outerHorizontalSpace,
      paddingVertical: outerVerticalSpace,
    },
  ];
  const containerStyle = [
    styles.container,
    {
      width: containerWidth,
      height: containerHeight,
    },
  ];
  // label styles
  const labelContainerStyle = [
    styles.labelContainer,
    {
      transform: [
        {
          translateY: interpolate(animatedFocus, {
            inputRange: [0, 1],
            outputRange: [
              multiply(labelHeight, 0.5),
              multiply(divide(labelHeight, 2), -1),
            ],
            extrapolate: Extrapolate.CLAMP,
          }),
        },
      ] as Animated.AnimatedTransform,
    },
  ];
  const labelStyle = [styles.label, labelStyleOverride];
  const labelMaskStyle = [
    styles.mask,
    {
      width: containerWidth,
      height: multiply(labelHeight, 1.5),
      transform: transformOrigin(
        {
          x: 0,
          y: 0,
        },
        {
          translateY: interpolate(animatedFocus, {
            inputRange: [0.25, 1],
            outputRange: [
              0,
              divide(sub(containerHeight, multiply(labelHeight, 1.5)), 2),
            ],
            extrapolate: Extrapolate.CLAMP,
          }),
          rotate: interpolate(animatedFocus, {
            inputRange: [0, 0.5],
            outputRange: [toRad(0), toRad(isRTL ? -15 : 15)],
            extrapolate: Extrapolate.CLAMP,
          }),
        }
      ) as Animated.AnimatedTransform,
    },
  ];
  // icon
  const iconContainerStyle = [
    styles.iconContainer,
    {
      transform: [
        {
          translateY: interpolate(animatedFocus, {
            inputRange: [0, 1],
            outputRange: [iconSize * -0.5, iconSize * -1.5],
            extrapolate: Extrapolate.CLAMP,
          }),
        },
      ] as Animated.AnimatedTransform,
    },
  ];
  const iconStyle = [
    styles.icon,
    {
      minHeight: iconSize,
      minWidth: iconSize,
    },
  ];
  const iconMaskStyle = [
    styles.mask,
    {
      width: containerWidth,
      height: iconSize,
      transform: transformOrigin(
        {
          x: 0,
          y: 0,
        },
        {
          translateY: interpolate(animatedFocus, {
            inputRange: [0, 1],
            outputRange: [innerVerticalSpace, iconSize * -1.5],
            extrapolate: Extrapolate.CLAMP,
          }),
          rotate: interpolate(animatedFocus, {
            inputRange: [0, 0.5],
            outputRange: [0, toRad(isRTL ? -15 : 15)],
            extrapolate: Extrapolate.CLAMP,
          }),
        }
      ) as Animated.AnimatedTransform,
    },
  ];
  // indicator
  const animatedIndicatorSize = interpolate(animatedFocus, {
    inputRange: [0.5, 1],
    outputRange: [0, indicatorSize / 2],
    extrapolate: Extrapolate.CLAMP,
  });
  //#endregion

  // callbacks
  const handleLabelLayout = ({
    nativeEvent: {
      layout: { height, width },
    },
  }: LayoutChangeEvent) =>
    requestAnimationFrame(() => {
      labelWidth.setValue(width);
      labelHeight.setValue(height);
    });

  // render
  const renderIcon = () => {
    const IconComponent: any = icon.component;
    return typeof IconComponent === 'function' ? (
      IconComponent({
        animatedFocus,
        color: icon.color,
        size: iconSize,
      })
    ) : (
      <IconComponent
        animatedFocus={animatedFocus}
        color={icon.color}
        size={iconSize}
      />
    );
  };

  return (
    <Animated.View style={outerContainerStyle}>
      <Animated.View style={containerStyle}>
        <MaskedView
          style={styles.root}
          maskElement={<Animated.View style={iconMaskStyle} />}
        >
          <Animated.View pointerEvents="none" style={iconContainerStyle}>
            <View style={iconStyle}>{renderIcon()}</View>
          </Animated.View>
        </MaskedView>
        <MaskedView
          style={styles.root}
          maskElement={<Animated.View style={labelMaskStyle} />}
        >
          <Animated.View style={labelContainerStyle}>
            <Text
              numberOfLines={1}
              style={labelStyle}
              onLayout={handleLabelLayout}
            >
              {label}
            </Text>
          </Animated.View>
        </MaskedView>
        {indicatorVisibility && (
          <AnimatedSvg
            style={[
              styles.root,
              {
                left: sub(divide(containerWidth, 2), indicatorSize / 2),
                top: sub(containerHeight, indicatorSize),
              },
            ]}
            width={indicatorSize}
            height={indicatorSize}
          >
            <AnimatedCircle
              r={animatedIndicatorSize}
              translateY={indicatorSize / 2}
              translateX={indicatorSize / 2}
              fill={indicatorColor}
            />
          </AnimatedSvg>
        )}
      </Animated.View>
    </Animated.View>
  );
};

const FlashyTabBarItem = memo(FlashyTabBarItemComponent, isEqual);

export default FlashyTabBarItem;

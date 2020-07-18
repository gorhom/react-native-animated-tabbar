import React, { useMemo, memo } from 'react';
import { View, Text, ViewStyle, LayoutChangeEvent } from 'react-native';
import Animated from 'react-native-reanimated';
// @ts-ignore 😞
import MaskedView from '@react-native-community/masked-view';
import { Svg, Circle, SvgProps, CircleProps } from 'react-native-svg';
import { useValues, transformOrigin, toRad } from 'react-native-redash';
// @ts-ignore 😞
import isEqual from 'lodash.isequal';
import {
  DEFAULT_ITEM_INNER_SPACE,
  DEFAULT_ITEM_OUTER_SPACE,
  DEFAULT_INDICATOR_VISIBILITY,
  DEFAULT_INDICATOR_SIZE,
  DEFAULT_INDICATOR_COLOR,
} from '../constants';
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

const { add, interpolate, sub, max, divide, multiply, Extrapolate } = Animated;

const FlashyTabBarItemComponent = ({
  animatedFocus,
  label,
  icon,
  labelStyle: labelStyleOverride,
  itemInnerSpace,
  itemOuterSpace,
  iconSize,
  indicator,
  isRTL,
}: FlashyTabBarItemProps) => {
  //#region extract props
  const {
    itemInnerVerticalSpace,
    itemInnerHorizontalSpace,
    itemOuterVerticalSpace,
    itemOuterHorizontalSpace,
  } = useMemo(() => {
    let _itemInnerVerticalSpace,
      _itemInnerHorizontalSpace,
      _itemOuterVerticalSpace,
      _itemOuterHorizontalSpace = 0;

    if (typeof itemInnerSpace === 'number') {
      _itemInnerVerticalSpace = itemInnerSpace;
      _itemInnerHorizontalSpace = itemInnerSpace;
    } else {
      _itemInnerVerticalSpace =
        itemInnerSpace?.vertical ?? DEFAULT_ITEM_INNER_SPACE;
      _itemInnerHorizontalSpace =
        itemInnerSpace?.horizontal ?? DEFAULT_ITEM_INNER_SPACE;
    }
    if (typeof itemOuterSpace === 'number') {
      _itemOuterVerticalSpace = itemOuterSpace;
      _itemOuterHorizontalSpace = itemOuterSpace;
    } else {
      _itemOuterVerticalSpace =
        itemOuterSpace?.vertical ?? DEFAULT_ITEM_OUTER_SPACE;
      _itemOuterHorizontalSpace =
        itemOuterSpace?.horizontal ?? DEFAULT_ITEM_OUTER_SPACE;
    }
    return {
      itemInnerVerticalSpace: _itemInnerVerticalSpace,
      itemInnerHorizontalSpace: _itemInnerHorizontalSpace,
      itemOuterVerticalSpace: _itemOuterVerticalSpace,
      itemOuterHorizontalSpace: _itemOuterHorizontalSpace,
    };
  }, [itemInnerSpace, itemOuterSpace]);
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
  const containerHeight = useMemo(() => iconSize + itemInnerVerticalSpace * 2, [
    iconSize,
    itemInnerVerticalSpace,
  ]);
  const containerWidth = max(
    add(labelWidth, itemInnerHorizontalSpace * 2),
    iconSize + itemInnerHorizontalSpace * 2
  );
  //#endregion

  //#region styles
  const outerContainerStyle = [
    styles.outerContainer,
    {
      paddingHorizontal: itemOuterHorizontalSpace,
      paddingVertical: itemOuterVerticalSpace,
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
            outputRange: [itemInnerVerticalSpace, iconSize * -1.5],
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

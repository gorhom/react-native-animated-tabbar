import React, { useMemo, memo } from 'react';
import { View, Text, LayoutChangeEvent } from 'react-native';
import Animated from 'react-native-reanimated';
import { interpolateColor, useValue } from 'react-native-redash/lib/module/v1';
// @ts-ignore 😞
import isEqual from 'lodash.isequal';
import { interpolate } from '../../../utilities';
import type { BubbleTabBarItemProps } from '../types';
import { styles } from './styles';

const { add } = Animated;

const BubbleTabBarItemComponent = ({
  animatedFocus,
  label,
  icon,
  background,
  labelStyle: labelStyleOverride,
  spacing,
  iconSize,
  isRTL,
}: BubbleTabBarItemProps) => {
  //#region extract props
  const {
    innerVerticalSpace,
    innerHorizontalSpace,
    outerVerticalSpace,
    outerHorizontalSpace,
  } = spacing;
  //#endregion

  //#region variables
  const labelWidth = useValue<number>(0);
  /**
   * @DEV
   * min width is calculated by adding outer & inner spaces
   * with the icon size.
   */
  const minWidth = useMemo(() => {
    return innerHorizontalSpace * 2 + iconSize + outerHorizontalSpace * 2;
  }, [innerHorizontalSpace, outerHorizontalSpace, iconSize]);
  /**
   * @DEV
   * max width is calculated by adding inner space with label width
   */
  const maxWidth = add(labelWidth, innerHorizontalSpace, minWidth);
  //#endregion

  //#region styles
  const animatedIconColor = interpolateColor(animatedFocus, {
    inputRange: [0, 1],
    outputRange: [icon.inactiveColor, icon.activeColor],
  });
  const containerStyle = [
    styles.container,
    {
      paddingHorizontal: outerHorizontalSpace,
      paddingVertical: outerVerticalSpace,
      width: interpolate(animatedFocus, {
        inputRange: [0, 1],
        outputRange: [minWidth, maxWidth],
      }),
    },
  ];
  const contentContainerStyle = [
    styles.contentContainer,
    {
      flexDirection: isRTL ? 'row-reverse' : 'row',
      paddingHorizontal: innerHorizontalSpace,
      paddingVertical: innerVerticalSpace,
      borderRadius: innerVerticalSpace * 2 + iconSize,
      backgroundColor: interpolateColor(animatedFocus, {
        inputRange: [0, 1],
        outputRange: [background.inactiveColor, background.activeColor],
      }),
    },
  ];
  const labelContainerStyle = [
    styles.labelContainer,
    {
      opacity: interpolate(animatedFocus, {
        inputRange: [0.33, 1],
        outputRange: [0, 1],
      }),
      [isRTL ? 'left' : 'right']: interpolate(animatedFocus, {
        inputRange: [0, 1],
        outputRange: [0, innerHorizontalSpace + outerHorizontalSpace],
      }),
    },
  ];
  const iconContainerStyle = [
    styles.iconContainer,
    {
      minHeight: iconSize,
      minWidth: iconSize,
    },
  ];
  const labelStyle = [styles.label, labelStyleOverride];
  //#endregion

  // callbacks
  const handleTextLayout = ({
    nativeEvent: {
      layout: { width },
    },
  }: LayoutChangeEvent) =>
    requestAnimationFrame(() => labelWidth.setValue(width));

  // render
  const renderIcon = () => {
    const IconComponent: any = icon.component;
    return typeof IconComponent === 'function' ? (
      IconComponent({
        animatedFocus,
        color: animatedIconColor,
        size: iconSize,
      })
    ) : (
      <IconComponent
        animatedFocus={animatedFocus}
        color={animatedIconColor}
        size={iconSize}
      />
    );
  };

  return (
    <Animated.View style={containerStyle}>
      <Animated.View style={contentContainerStyle}>
        <View style={iconContainerStyle}>{renderIcon()}</View>
      </Animated.View>
      <Animated.View style={labelContainerStyle}>
        <Text onLayout={handleTextLayout} style={labelStyle} numberOfLines={1}>
          {label}
        </Text>
      </Animated.View>
    </Animated.View>
  );
};

const BubbleTabBarItem = memo(BubbleTabBarItemComponent, isEqual);

export default BubbleTabBarItem;

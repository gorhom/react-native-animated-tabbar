import React, { useMemo, memo } from 'react';
import { View, Text, LayoutChangeEvent } from 'react-native';
import Animated from 'react-native-reanimated';
import { interpolateColor, useValue } from 'react-native-redash';
// @ts-ignore 😞
import isEqual from 'lodash.isequal';
import {
  DEFAULT_ITEM_INNER_SPACE,
  DEFAULT_ITEM_OUTER_SPACE,
} from '../constants';
import type { BubbleTabBarItemProps } from '../types';
import { styles } from './styles';

const { add, interpolate } = Animated;

const BubbleTabBarItemComponent = ({
  animatedFocus,
  label,
  icon,
  background,
  labelStyle: labelStyleOverride,
  itemInnerSpace,
  itemOuterSpace,
  iconSize,
  isRTL,
}: BubbleTabBarItemProps) => {
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
  //#endregion

  //#region variables
  const labelWidth = useValue<number>(0);
  /**
   * @DEV
   * min width is calculated by adding outer & inner spaces
   * with the icon size.
   */
  const minWidth = useMemo(() => {
    return (
      itemInnerHorizontalSpace * 2 + iconSize + itemOuterHorizontalSpace * 2
    );
  }, [itemInnerHorizontalSpace, itemOuterHorizontalSpace, iconSize]);
  /**
   * @DEV
   * max width is calculated by adding inner space with label width
   */
  const maxWidth = add(labelWidth, itemInnerHorizontalSpace, minWidth);
  //#endregion

  //#region styles
  const animatedIconColor = interpolateColor(animatedFocus, {
    inputRange: [0, 1],
    outputRange: [icon.inactiveColor, icon.activeColor],
  });
  const containerStyle = [
    styles.container,
    {
      paddingHorizontal: itemOuterHorizontalSpace,
      paddingVertical: itemOuterVerticalSpace,
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
      paddingHorizontal: itemInnerHorizontalSpace,
      paddingVertical: itemInnerVerticalSpace,
      borderRadius: itemInnerVerticalSpace * 2 + iconSize,
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
        outputRange: [0, itemInnerHorizontalSpace + itemOuterHorizontalSpace],
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

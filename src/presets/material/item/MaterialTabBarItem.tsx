import React, { useMemo, memo, useCallback } from 'react';
import type { LayoutChangeEvent } from 'react-native';
import Animated from 'react-native-reanimated';
import { transformOrigin, useValue } from 'react-native-redash';
// @ts-ignore 😞
import isEqual from 'lodash.isequal';
import { useStableCallback } from '../../../hooks';
import { interpolate } from '../../../utilities';
import type { MaterialTabBarItemProps } from '../types';
import { styles } from './styles';

const { divide, Extrapolate } = Animated;

const MaterialTabBarItemComponent = (props: MaterialTabBarItemProps) => {
  // props
  const {
    animatedFocus,
    animation,
    inactiveOpacity,
    inactiveScale,
    label,
    labelStyle: labelStyleOverride,
    icon,
    iconSize,
    spacing,
  } = props;

  //#region extract props
  const {
    innerVerticalSpace,
    innerHorizontalSpace,
    outerVerticalSpace,
    outerHorizontalSpace,
  } = spacing;
  //#endregion

  //#region variables
  const labelHeight = useValue<number>(0);
  //#endregion

  //#region styles
  const outerContainerStyle = useMemo(
    () => [
      styles.outerContainer,
      {
        paddingHorizontal: outerHorizontalSpace,
        paddingVertical: outerVerticalSpace,
      },
    ],
    [outerHorizontalSpace, outerVerticalSpace]
  );
  const innerContainerStyle = useMemo(
    () => [
      styles.innerContainer,
      {
        paddingHorizontal: innerHorizontalSpace,
        paddingVertical: innerVerticalSpace,
        opacity: interpolate(animatedFocus, {
          inputRange: [0, 1],
          outputRange: [inactiveOpacity, 1],
          extrapolate: Extrapolate.CLAMP,
        }),
        transform: transformOrigin(
          {
            x: 0,
            y: 0,
          },
          {
            scale: interpolate(animatedFocus, {
              inputRange: [0, 1],
              outputRange: [inactiveScale, 1],
              extrapolate: Extrapolate.CLAMP,
            }),
          }
        ),
      },
    ],
    [
      innerHorizontalSpace,
      innerVerticalSpace,
      animatedFocus,
      inactiveOpacity,
      inactiveScale,
    ]
  );
  const iconContainerStyle = [
    styles.iconContainer,
    {
      minHeight: iconSize,
      minWidth: iconSize,
      ...(animation === 'iconWithLabelOnFocus'
        ? {
            transform: transformOrigin(
              {
                x: 0,
                y: 0,
              },
              {
                translateY: interpolate(animatedFocus, {
                  inputRange: [0, 1],
                  outputRange: [divide(labelHeight, 2), 0],
                  extrapolate: Extrapolate.CLAMP,
                }),
              }
            ),
          }
        : {}),
    },
  ];
  const labelStyle = useMemo(
    () => [
      styles.label,
      labelStyleOverride,
      {
        marginTop: innerVerticalSpace / 2,
        opacity: animation === 'iconWithLabelOnFocus' ? animatedFocus : 1,
      },
    ],
    [labelStyleOverride, innerVerticalSpace, animation, animatedFocus]
  );
  //#endregion

  //#region callbacks
  const handleLabelLayout = useStableCallback(
    ({
      nativeEvent: {
        layout: { height },
      },
    }: LayoutChangeEvent) =>
      requestAnimationFrame(() => {
        labelHeight.setValue(height);
      })
  );
  //#endregion

  // render
  const renderIcon = useCallback(() => {
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
  }, [icon, iconSize, animatedFocus]);
  const renderLabel = useCallback(() => {
    return animation !== 'iconOnly' ? (
      <Animated.Text onLayout={handleLabelLayout} style={labelStyle}>
        {label}
      </Animated.Text>
    ) : null;
  }, [label, animation, labelStyle, handleLabelLayout]);
  return (
    <Animated.View style={outerContainerStyle}>
      <Animated.View style={innerContainerStyle}>
        <Animated.View style={iconContainerStyle}>{renderIcon()}</Animated.View>
        {renderLabel()}
      </Animated.View>
    </Animated.View>
  );
};

const MaterialTabBarItem = memo(MaterialTabBarItemComponent, isEqual);

export default MaterialTabBarItem;

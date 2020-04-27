import React, { useMemo, memo } from 'react';
import { View, Text } from 'react-native';
import Animated from 'react-native-reanimated';
import {
  TouchableWithoutFeedback,
  State,
  createNativeWrapper,
} from 'react-native-gesture-handler';
import {
  interpolateColor,
  useValues,
  withTransition,
  onGestureEvent,
} from 'react-native-redash';
// @ts-ignore 😞
import isEqual from 'lodash.isequal';
import {
  DEFAULT_ITEM_INNER_SPACE,
  DEFAULT_ITEM_OUTER_SPACE,
} from '../constants';
import { TabBarItemProps } from '../../types';
import { BubbleTabConfig } from '../types';
import { styles } from './styles';

const AnimatedRawButton = createNativeWrapper(
  Animated.createAnimatedComponent(TouchableWithoutFeedback),
  {
    shouldCancelWhenOutside: false,
    shouldActivateOnStart: false,
  }
);

const { add, interpolate, useCode, set, cond, eq } = Animated;

const gestureHandler = (state: Animated.Value<State>) =>
  onGestureEvent({ state });

export type BubbleTabBarItemProps = TabBarItemProps & BubbleTabConfig;

const BubbleTabBarItemComponent = (props: BubbleTabBarItemProps) => {
  // props
  const {
    index,
    selectedIndex,
    label,
    icon,
    background,
    labelStyle: labelStyleOverride,
    duration,
    easing,
    itemInnerSpace,
    itemOuterSpace,
    iconSize,
    isRTL,
  } = props;

  // variables
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
        itemInnerSpace?.vertical || DEFAULT_ITEM_INNER_SPACE;
      _itemInnerHorizontalSpace =
        itemInnerSpace?.horizontal || DEFAULT_ITEM_INNER_SPACE;
    }
    if (typeof itemOuterSpace === 'number') {
      _itemOuterVerticalSpace = itemOuterSpace;
      _itemOuterHorizontalSpace = itemOuterSpace;
    } else {
      _itemOuterVerticalSpace =
        itemOuterSpace?.vertical || DEFAULT_ITEM_OUTER_SPACE;
      _itemOuterHorizontalSpace =
        itemOuterSpace?.horizontal || DEFAULT_ITEM_OUTER_SPACE;
    }
    return {
      itemInnerVerticalSpace: _itemInnerVerticalSpace,
      itemInnerHorizontalSpace: _itemInnerHorizontalSpace,
      itemOuterVerticalSpace: _itemOuterVerticalSpace,
      itemOuterHorizontalSpace: _itemOuterHorizontalSpace,
    };
  }, [itemInnerSpace, itemOuterSpace]);
  const [labelWidth] = useValues([0], []);

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

  // animations
  const [state] = useValues([State.UNDETERMINED], [index]);
  const animatedFocus = withTransition(cond(eq(selectedIndex, index), 1, 0), {
    duration,
    easing,
  });
  const animatedIconColor = interpolateColor(animatedFocus, {
    inputRange: [0, 1],
    outputRange: [icon.inactiveColor, icon.activeColor],
  });

  //#region styles
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
  const handleTextlayout = ({
    nativeEvent: {
      // @ts-ignore
      layout: { width },
    },
  }) => requestAnimationFrame(() => labelWidth.setValue(width));

  // effects
  useCode(
    () =>
      cond(eq(state, State.END), [
        set(selectedIndex, index),
        set(state, State.UNDETERMINED),
      ]),
    [selectedIndex, state, index]
  );

  // render
  const renderIcon = () => {
    return typeof icon.component === 'function'
      ? icon.component({
          animatedFocus,
          color: animatedIconColor,
          size: iconSize,
        })
      : icon.component;
  };

  return (
    <AnimatedRawButton {...gestureHandler(state)}>
      <Animated.View style={containerStyle}>
        <Animated.View style={contentContainerStyle}>
          <View style={iconContainerStyle}>{renderIcon()}</View>
        </Animated.View>
        <Animated.View style={labelContainerStyle}>
          <Text
            onLayout={handleTextlayout}
            style={labelStyle}
            numberOfLines={1}
          >
            {label}
          </Text>
        </Animated.View>
      </Animated.View>
    </AnimatedRawButton>
  );
};

const BubbleTabBarItem = memo(
  BubbleTabBarItemComponent,
  (prevProps, nextProps) => isEqual(prevProps, nextProps)
);

export default BubbleTabBarItem;

import React, { useMemo, memo } from 'react';
import { ViewProperties, View } from 'react-native';
import Animated, { Extrapolate, multiply } from 'react-native-reanimated';
import MaskedView from '@react-native-community/masked-view';
import {
  RawButtonProperties,
  State,
  TouchableWithoutFeedback,
  createNativeWrapper,
} from 'react-native-gesture-handler';
import {
  interpolateColor,
  useValues,
  withTransition,
  onGestureEvent,
  transformOrigin,
  toRad,
} from 'react-native-redash';
// @ts-ignore 😞
import isEqual from 'lodash.isequal';
import { TabBarItemProps } from '../../types';
import {
  DEFAULT_ITEM_INNER_SPACE,
  DEFAULT_ITEM_OUTER_SPACE,
} from '../constants';
import { styles } from './styles';

const AnimatedRawButton = createNativeWrapper<
  RawButtonProperties & ViewProperties
>(Animated.createAnimatedComponent(TouchableWithoutFeedback), {
  shouldCancelWhenOutside: false,
  shouldActivateOnStart: false,
});

const { add, interpolate, useCode, sub, set, cond, eq, divide } = Animated;

const gestureHandler = (state: Animated.Value<State>) =>
  onGestureEvent({ state });

// export const toDeg = (rad: Val): Val => multiply(rad, 180 / Math.PI);

const FlashyTabBarItemComponent = (props: TabBarItemProps) => {
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

  const containerHeight = useMemo(() => iconSize + itemInnerVerticalSpace * 2, [
    iconSize,
    itemInnerVerticalSpace,
  ]);
  const [containerWidth, labelWidth, labelHeight] = useValues([0, 0, 0, 0], []);

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
      height: containerHeight,
    },
  ];
  const labelContainerStyle = [
    styles.labelContainer,
    {
      width: containerWidth,
      height: containerHeight,
      transform: [
        {
          translateY: interpolate(animatedFocus, {
            inputRange: [0, 1],
            outputRange: [multiply(labelHeight, 1), 0],
            extrapolate: Extrapolate.CLAMP,
          }),
        },
      ],
    },
  ];
  const labelStyle = [styles.label, labelStyleOverride];
  const labelMaskStyle = [
    styles.mask,
    {
      width: containerWidth,
      height: multiply(labelHeight, 2),
      transform: transformOrigin(
        {
          x: 0,
          y: 0,
        },
        {
          translateY: interpolate(animatedFocus, {
            inputRange: [0.25, 1],
            outputRange: [0, labelHeight],
            extrapolate: Extrapolate.CLAMP,
          }),
          rotate: interpolate(animatedFocus, {
            inputRange: [0, 0.5],
            outputRange: [toRad(0), toRad(15)],
            extrapolate: Extrapolate.CLAMP,
          }),
        }
      ),
    },
  ];
  const iconContainerStyle = [
    styles.iconContainer,
    {
      width: containerWidth,
      height: containerHeight,
      transform: [
        {
          translateY: interpolate(animatedFocus, {
            inputRange: [0, 1],
            outputRange: [0, iconSize * -1],
            extrapolate: Extrapolate.CLAMP,
          }),
        },
      ],
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
            outputRange: [itemInnerVerticalSpace, -iconSize],
            extrapolate: Extrapolate.CLAMP,
          }),
          rotate: interpolate(animatedFocus, {
            inputRange: [0, 0.5],
            outputRange: [0, toRad(15)],
            extrapolate: Extrapolate.CLAMP,
          }),
        }
      ),
    },
  ];
  const indicatorStyle = [
    styles.indicator,
    {
      backgroundColor: labelStyleOverride.color,
      left: divide(containerWidth, 2),
      top: sub(containerHeight, itemInnerVerticalSpace / 2),
      transform: transformOrigin(
        {
          x: 0,
          y: 0,
        },
        {
          translateX: -4,
          translateY: -4,
          scale: interpolate(animatedFocus, {
            inputRange: [0.5, 1],
            outputRange: [0, 1],
            extrapolate: Extrapolate.CLAMP,
          }),
        }
      ),
    },
  ];
  //#endregion

  // effects
  useCode(
    () =>
      cond(eq(state, State.END), [
        set(selectedIndex, index),
        set(state, State.UNDETERMINED),
      ]),
    [selectedIndex, state, index]
  );

  // callbacks
  const handleCotnainerlayout = ({
    nativeEvent: {
      // @ts-ignore
      layout: { width },
    },
  }) =>
    requestAnimationFrame(() => {
      containerWidth.setValue(width);
    });

  const handleLabelLayout = ({
    nativeEvent: {
      // @ts-ignore
      layout: { width, height },
    },
  }) =>
    requestAnimationFrame(() => {
      labelHeight.setValue(height);
      labelWidth.setValue(width);
    });

  // render
  const renderIcon = () => {
    return typeof icon.component === 'function'
      ? icon.component({ color: animatedIconColor, size: iconSize })
      : icon.component;
  };

  return (
    <Animated.View onLayout={handleCotnainerlayout} style={containerStyle}>
      <MaskedView maskElement={<Animated.View style={iconMaskStyle} />}>
        <Animated.View style={iconContainerStyle}>
          <View style={iconStyle}>{renderIcon()}</View>
        </Animated.View>
      </MaskedView>

      <MaskedView maskElement={<Animated.View style={labelMaskStyle} />}>
        <Animated.View style={labelContainerStyle}>
          <Animated.Text
            numberOfLines={1}
            style={labelStyle}
            onLayout={handleLabelLayout}
          >
            {label}
          </Animated.Text>
        </Animated.View>
      </MaskedView>

      <Animated.View style={indicatorStyle} />

      <AnimatedRawButton
        style={{ width: containerWidth, height: containerHeight }}
        {...gestureHandler(state)}
      />
    </Animated.View>
  );
};

const FlashyTabBarItem = memo(
  FlashyTabBarItemComponent,
  (prevProps, nextProps) => isEqual(prevProps, nextProps)
);

export default FlashyTabBarItem;

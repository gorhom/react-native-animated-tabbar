import React, { useMemo, memo } from 'react';
import {
  View,
  Text,
  ViewStyle,
  TouchableWithoutFeedbackProperties,
} from 'react-native';
import Animated from 'react-native-reanimated';
// @ts-ignore 😞
import MaskedView from '@react-native-community/masked-view';
import {
  State,
  TouchableWithoutFeedback,
  createNativeWrapper,
} from 'react-native-gesture-handler';
import {
  useValues,
  withTransition,
  onGestureEvent,
  transformOrigin,
  toRad,
} from 'react-native-redash';
// @ts-ignore 😞
import isEqual from 'lodash.isequal';
import {
  DEFAULT_ITEM_INNER_SPACE,
  DEFAULT_INDICATOR_VISIBLITY,
  DEFAULT_INDICATOR_SIZE,
  DEFAULT_INDICATOR_COLOR,
} from '../constants';
import { TabBarItemProps } from '../../types';
import { FlashyTabConfig } from '../types';
import { styles } from './styles';

const AnimatedRawButton = (createNativeWrapper(
  Animated.createAnimatedComponent(TouchableWithoutFeedback),
  {
    shouldCancelWhenOutside: false,
    shouldActivateOnStart: false,
  }
) as any) as React.ComponentType<
  Animated.AnimateProps<ViewStyle, TouchableWithoutFeedbackProperties>
>;

const {
  interpolate,
  useCode,
  sub,
  set,
  cond,
  eq,
  divide,
  multiply,
  Extrapolate,
} = Animated;

const gestureHandler = (state: Animated.Value<State>) =>
  onGestureEvent({ state });

export type FlashyTabBarItemProps = Omit<TabBarItemProps, 'itemOuterSpace'> &
  FlashyTabConfig;

const FlashyTabBarItemComponent = (props: FlashyTabBarItemProps) => {
  // props
  const {
    index,
    selectedIndex,
    label,
    icon,
    labelStyle: labelStyleOverride,
    duration,
    easing,
    itemInnerSpace,
    iconSize,
    indicator,
    isRTL,
  } = props;

  // variables
  const { itemInnerVerticalSpace } = useMemo(() => {
    let _itemInnerVerticalSpace = 0;

    if (typeof itemInnerSpace === 'number') {
      _itemInnerVerticalSpace = itemInnerSpace;
    } else {
      _itemInnerVerticalSpace =
        itemInnerSpace?.vertical || DEFAULT_ITEM_INNER_SPACE;
    }
    return {
      itemInnerVerticalSpace: _itemInnerVerticalSpace,
    };
  }, [itemInnerSpace]);
  const containerHeight = useMemo(() => iconSize + itemInnerVerticalSpace * 2, [
    iconSize,
    itemInnerVerticalSpace,
  ]);
  const [containerWidth, labelHeight] = useValues([0, 0], []);

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
      indicatorVisibility: _indicatorVisible ?? DEFAULT_INDICATOR_VISIBLITY,
      indicatorColor:
        _indicatorColor ?? labelStyleOverride.color ?? DEFAULT_INDICATOR_COLOR,
      indicatorSize: _indicatorSize ?? DEFAULT_INDICATOR_SIZE,
    };
  }, [_indicatorVisible, _indicatorColor, _indicatorSize, labelStyleOverride]);

  // animations
  const [state] = useValues([State.UNDETERMINED], [index]);
  const animatedFocus = withTransition(cond(eq(selectedIndex, index), 1, 0), {
    duration,
    easing,
  });

  //#region styles
  const containerStyle = [
    styles.container,
    {
      height: containerHeight,
    },
  ];
  // label styles
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
      ] as Animated.AnimatedTransform,
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
            outputRange: [itemInnerVerticalSpace, -iconSize],
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
  const indicatorStyle = [
    styles.indicator,
    {
      width: indicatorSize,
      height: indicatorSize,
      borderRadius: indicatorSize,
      backgroundColor: indicatorColor,
      left: divide(containerWidth, 2),
      top: sub(containerHeight, itemInnerVerticalSpace / 2),
      transform: transformOrigin(
        {
          x: 0,
          y: 0,
        },
        {
          translateX: -(indicatorSize / 2),
          translateY: -(indicatorSize / 2),
          scale: interpolate(animatedFocus, {
            inputRange: [0.5, 1],
            outputRange: [0, 1],
            extrapolate: Extrapolate.CLAMP,
          }),
        }
      ) as Animated.AnimatedTransform,
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
      layout: { height },
    },
  }) => requestAnimationFrame(() => labelHeight.setValue(height));

  // render
  const renderIcon = () => {
    return typeof icon.component === 'function'
      ? icon.component({
          animatedFocus,
          color: icon.color,
          size: iconSize,
        })
      : icon.component;
  };

  return (
    <Animated.View onLayout={handleCotnainerlayout} style={containerStyle}>
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

      {indicatorVisibility && <Animated.View style={indicatorStyle} />}

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

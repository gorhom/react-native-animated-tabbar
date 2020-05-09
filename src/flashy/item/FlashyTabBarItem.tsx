import React, { useMemo, memo } from 'react';
import { View, Text, ViewStyle } from 'react-native';
import Animated from 'react-native-reanimated';
// @ts-ignore 😞
import MaskedView from '@react-native-community/masked-view';
import { Svg, Circle, SvgProps, CircleProps } from 'react-native-svg';
import { State, TapGestureHandler } from 'react-native-gesture-handler';
import {
  useValues,
  onGestureEvent,
  transformOrigin,
  toRad,
  useValue,
} from 'react-native-redash';
// @ts-ignore 😞
import isEqual from 'lodash.isequal';
import { withTransition } from '../../withTransition';
import {
  DEFAULT_ITEM_INNER_SPACE,
  DEFAULT_INDICATOR_VISIBILITY,
  DEFAULT_INDICATOR_SIZE,
  DEFAULT_INDICATOR_COLOR,
} from '../constants';
import { TabBarItemProps } from '../../types';
import { FlashyTabConfig } from '../types';
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

const {
  interpolate,
  useCode,
  sub,
  set,
  cond,
  eq,
  divide,
  onChange,
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
  const [containerWidth, labelHeight] = useValues([0, 0]);

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
        _indicatorColor ?? labelStyleOverride.color ?? DEFAULT_INDICATOR_COLOR,
      indicatorSize: _indicatorSize ?? DEFAULT_INDICATOR_SIZE,
    };
  }, [_indicatorVisible, _indicatorColor, _indicatorSize, labelStyleOverride]);

  // animations
  const gestureState = useValue(State.UNDETERMINED);
  const animatedFocus = withTransition({
    index,
    selectedIndex,
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
  const animatedIndicatorSize = interpolate(animatedFocus, {
    inputRange: [0.5, 1],
    outputRange: [0, indicatorSize / 2],
    extrapolate: Extrapolate.CLAMP,
  });
  //#endregion

  // effects
  useCode(
    () => [
      onChange(
        gestureState,
        cond(eq(gestureState, State.END), set(selectedIndex, index))
      ),
    ],
    [gestureState, index]
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
    <TapGestureHandler {...gestureHandler(gestureState)}>
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
        {indicatorVisibility && (
          <AnimatedSvg
            style={[
              styles.root,
              {
                left: sub(divide(containerWidth, 2), indicatorSize / 2),
                top: sub(containerHeight, itemInnerVerticalSpace / 2),
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
    </TapGestureHandler>
  );
};

const FlashyTabBarItem = memo(
  FlashyTabBarItemComponent,
  (prevProps, nextProps) => isEqual(prevProps, nextProps)
);

export default FlashyTabBarItem;

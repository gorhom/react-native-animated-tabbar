import React, { useMemo, memo } from 'react';
import { ViewProperties, View } from 'react-native';
import Animated from 'react-native-reanimated';
import MaskedView from '@react-native-community/masked-view';
import {
  RawButton,
  RawButtonProperties,
  State,
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
>(Animated.createAnimatedComponent(RawButton), {
  shouldCancelWhenOutside: false,
  shouldActivateOnStart: false,
});

const { add, interpolate, useCode, set, cond, eq, divide } = Animated;

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
      // opacity: interpolate(animatedFocus, {
      //   inputRange: [0, 1],
      //   outputRange: [0, 1],
      // }),
      transform: [
        {
          translateY: interpolate(animatedFocus, {
            inputRange: [0, 1],
            outputRange: [iconSize * 0.5, 0],
          }),
        },
      ],
      // [isRTL ? 'left' : 'right']: interpolate(animatedFocus, {
      //   inputRange: [0, 1],
      //   outputRange: [0, itemInnerHorizontalSpace + itemOuterHorizontalSpace],
      // }),
    },
  ];
  const labelStyle = [styles.label, labelStyleOverride];
  const iconContainerStyle = [
    styles.iconContainer,
    {
      width: containerWidth,
      height: containerHeight,
      // opacity: interpolate(animatedFocus, {
      //   inputRange: [0, 1],
      //   outputRange: [1, 0],
      // }),
      transform: [
        {
          translateY: interpolate(animatedFocus, {
            inputRange: [0, 1],
            outputRange: [0, iconSize * -0.5],
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
  //#endregion

  // callbacks

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
      // containerHeight.setValue(height);
      containerWidth.setValue(width);
    });

  // render
  const renderIcon = () => {
    return typeof icon.component === 'function'
      ? icon.component({ color: animatedIconColor, size: iconSize })
      : icon.component;
  };

  return (
    <Animated.View onLayout={handleCotnainerlayout} style={containerStyle}>
      <MaskedView
        maskElement={
          <Animated.View
            pointerEvents="none"
            style={{
              ...styles.mask,
              // backgroundColor: 'red',
              width: containerWidth,
              height: containerHeight,
              transform: transformOrigin(
                {
                  x: divide(containerWidth, 2),
                  y: containerHeight / 2,
                },
                {
                  rotate: interpolate(animatedFocus, {
                    inputRange: [0, 1],
                    outputRange: [0, toRad(90)],
                  }),
                }
              ),
            }}
          />
        }
      >
        <Animated.View style={iconContainerStyle}>
          <View style={iconStyle}>{renderIcon()}</View>
        </Animated.View>
      </MaskedView>

      <MaskedView
        maskElement={
          <Animated.View
            pointerEvents="none"
            style={{
              ...styles.mask,
              // backgroundColor: 'blue',
              width: containerWidth,
              height: containerHeight,
              transform: transformOrigin(
                {
                  x: divide(containerWidth, -2),
                  y: containerHeight / -2,
                },
                {
                  rotate: interpolate(animatedFocus, {
                    inputRange: [0, 1],
                    outputRange: [toRad(90), 0],
                  }),
                }
              ),
            }}
          />
        }
      >
        <Animated.View style={labelContainerStyle}>
          <Animated.Text numberOfLines={1} style={labelStyle}>
            {label}
          </Animated.Text>
        </Animated.View>
      </MaskedView>
      <AnimatedRawButton style={styles.root} {...gestureHandler(state)} />
    </Animated.View>
    // <Animated.View style={containerStyle}></Animated.View>
  );
};

const FlashyTabBarItem = memo(
  FlashyTabBarItemComponent,
  (prevProps, nextProps) => isEqual(prevProps, nextProps)
);

export default FlashyTabBarItem;

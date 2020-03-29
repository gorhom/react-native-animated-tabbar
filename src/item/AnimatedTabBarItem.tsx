import React, { useMemo, memo } from 'react';
import { View } from 'react-native';
import Animated, { Easing } from 'react-native-reanimated';
import {
  TouchableWithoutFeedback,
  State,
  createNativeWrapper,
} from 'react-native-gesture-handler';
import {
  interpolateColor,
  useValues,
  withTransition,
  panGestureHandler,
} from 'react-native-redash';
import { TabConfig, AnimationConfigProps } from '../types';
import { styles } from './styles';

const AnimatedRawButton = createNativeWrapper(
  Animated.createAnimatedComponent(TouchableWithoutFeedback),
  {
    shouldCancelWhenOutside: false,
    shouldActivateOnStart: false,
  }
);

const { add, interpolate, useCode, set, cond, eq } = Animated;

interface AnimatedTabBarItemProps extends AnimationConfigProps, TabConfig {
  index: number;
  selectedIndex: Animated.Value<number>;
  label: string;
  allowFontScaling?: boolean;
}

const AnimatedTabBarItemComponent = (props: AnimatedTabBarItemProps) => {
  // props
  const {
    index,
    selectedIndex,
    allowFontScaling,
    label,
    icon,
    background,
    labelStyle: labelStyleOverride,
    duration = 500,
    easing = Easing.out(Easing.exp),
  } = props;

  // variables
  const [labelWidth] = useValues([0], []);
  const minwidth = useMemo(() => 72, []);
  const maxWidth = add(labelWidth, 12, minwidth);

  // animations
  const animatedFocus = withTransition(cond(eq(selectedIndex, index), 1, 0), {
    duration,
    easing,
  });
  const { state, gestureHandler } = panGestureHandler();

  useCode(
    () =>
      cond(eq(state, State.END), [
        set(selectedIndex, index),
        set(state, State.UNDETERMINED),
      ]),
    [selectedIndex, state, index]
  );

  const animatedIconColor = interpolateColor(animatedFocus, {
    inputRange: [0, 1],
    outputRange: [icon.inactiveColor, icon.activeColor],
  });

  //#region styles
  const containerStyle = [
    styles.container,
    {
      width: interpolate(animatedFocus, {
        inputRange: [0, 1],
        outputRange: [minwidth, maxWidth],
      }),
    },
  ];
  const contentContainerStyle = [
    styles.contentContainer,
    {
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
      right: interpolate(animatedFocus, {
        inputRange: [0, 1],
        outputRange: [0, 24],
      }),
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

  // render
  const renderIcon = () => {
    return typeof icon.component === 'function'
      ? icon.component({ color: animatedIconColor })
      : icon.component;
  };
  return (
    <AnimatedRawButton {...gestureHandler}>
      <Animated.View style={containerStyle}>
        <Animated.View style={contentContainerStyle}>
          <View style={styles.iconContainer}>{renderIcon()}</View>
        </Animated.View>
        <Animated.View style={labelContainerStyle}>
          <Animated.Text
            onLayout={handleTextlayout}
            style={labelStyle}
            numberOfLines={1}
            allowFontScaling={allowFontScaling}
          >
            {label}
          </Animated.Text>
        </Animated.View>
      </Animated.View>
    </AnimatedRawButton>
  );
};

export const AnimatedTabBarItem = memo(AnimatedTabBarItemComponent);

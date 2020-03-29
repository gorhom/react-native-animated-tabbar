import React, { useMemo, memo } from 'react';
import { View } from 'react-native';
import Animated, { Easing } from 'react-native-reanimated';
import {
  // @ts-ignore
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
import { TabConfig } from '../types';
import { styles } from './styles';

const AnimatedRawButton = createNativeWrapper(
  Animated.createAnimatedComponent(TouchableWithoutFeedback),
  {
    shouldCancelWhenOutside: false,
    shouldActivateOnStart: false,
  }
);

const { add, interpolate, useCode, set, cond, eq } = Animated;

interface AnimatedTabBarItemProps {
  index: number;

  selectedIndex: Animated.Value<number>;
  /**
   * The animated tab configuration.
   */
  configs: TabConfig;
  /**
   * The label text of the tab.
   */
  label: string;
  /**
   * Whether to allow scaling the font for the label for accessibility purposes.
   */
  allowFontScaling?: boolean;
}

const AnimatedTabBarItemComponent = (props: AnimatedTabBarItemProps) => {
  // props
  const { index, selectedIndex, configs, label, allowFontScaling } = props;

  // variables
  const [labelWidth] = useValues([0], []);
  const minwidth = useMemo(() => 72, []);
  const maxWidth = add(labelWidth, 12, minwidth);

  // animations
  const animatedFocus = withTransition(cond(eq(selectedIndex, index), 1, 0), {
    duration: 500,
    easing: Easing.out(Easing.exp),
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
    outputRange: [configs.icon.inactiveColor, configs.icon.activeColor],
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
        outputRange: [
          configs.background.inactiveColor,
          configs.background.activeColor,
        ],
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
  const labelStyle = [styles.label, configs.labelStyle];
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
    return typeof configs.icon.component === 'function'
      ? configs.icon.component({ color: animatedIconColor })
      : configs.icon.component;
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

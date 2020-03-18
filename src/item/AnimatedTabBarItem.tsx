import React, { memo, useCallback, useState, useMemo } from 'react';
import { View, TouchableWithoutFeedback } from 'react-native';
import Animated from 'react-native-reanimated';
import { useMemoOne } from 'use-memo-one';
import { interpolateColor, useValues } from 'react-native-redash';
import { withTiming } from '../withTiming';
import { TabConfig } from '../types';
import { styles } from './styles';

const { interpolate, useCode, set, block, Clock } = Animated;

interface AnimatedTabBarItemProps {
  /**
   * The animated tab configuration.
   */
  configs: TabConfig;
  /**
   * The label text of the tab.
   */
  label: string;
  /**
   * The accessibility label for the tab.
   */
  accessibilityLabel?: string;
  /**
   * An unique ID for testing for the tab.
   */
  testID?: string;
  /**
   * Whether the tab is focused.
   */
  focused: boolean;
  /**
   * Whether to allow scaling the font for the label for accessibility purposes.
   */
  allowFontScaling?: boolean;
  /**
   * Function to execute on press.
   */
  onPress: () => void;
  /**
   * Function to execute on long press.
   */
  onLongPress: () => void;
}

const AnimatedTabBarItemComponent = (props: AnimatedTabBarItemProps) => {
  // props
  const {
    configs,
    label,
    testID,
    accessibilityLabel,
    focused,
    allowFontScaling,
    onPress,
    onLongPress,
  } = props;

  // state
  const [labelWidth, setLableWidth] = useState(0);

  // variables
  const minwidth = useMemo(() => 72, []);
  const maxWidth = useMemo(() => labelWidth + 12 + minwidth, [
    minwidth,
    labelWidth,
  ]);

  // animations
  const { animatedClock } = useMemoOne(
    () => ({ animatedClock: new Clock() }),
    []
  );
  const [animatedFocus] = useValues([0], []);
  const animatedIconColor = interpolateColor(animatedFocus, {
    inputRange: [0, 1],
    outputRange: [configs.icon.inactiveColor, configs.icon.activeColor],
  });

  useCode(
    () =>
      block([
        set(
          animatedFocus,
          withTiming({
            clock: animatedClock,
            fromValue: animatedFocus,
            toValue: focused ? 1 : 0,
          })
        ),
      ]),
    [focused]
  );

  // styles
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

  // callbacks
  const handleTextlayout = useCallback(
    ({ nativeEvent }) => {
      if (labelWidth === 0) {
        setLableWidth(nativeEvent.layout.width);
      }
    },
    [labelWidth, setLableWidth]
  );

  // render
  const renderIcon = () => {
    return typeof configs.icon.component === 'function'
      ? configs.icon.component({ color: animatedIconColor })
      : configs.icon.component;
  };
  return (
    <TouchableWithoutFeedback
      accessibilityLabel={accessibilityLabel}
      accessibilityRole={'button'}
      accessibilityStates={focused ? ['selected'] : []}
      testID={testID}
      onPress={onPress}
      onLongPress={onLongPress}
    >
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
    </TouchableWithoutFeedback>
  );
};

export const AnimatedTabBarItem = memo(AnimatedTabBarItemComponent);

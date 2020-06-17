import React, { useRef } from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import Animated, { call } from 'react-native-reanimated';
import {
  State,
  TapGestureHandler,
  LongPressGestureHandler,
} from 'react-native-gesture-handler';
import { useValue, useGestureHandler } from 'react-native-redash';

const { useCode, cond, onChange, eq } = Animated;

interface RawButtonProps {
  index: number;
  selectedIndex: Animated.Value<number>;
  accessibilityLabel: string;
  children: React.ReactNode[] | React.ReactNode;
  style?: StyleProp<Animated.AnimateStyle<ViewStyle>>;
  animatedOnChange: (index: number) => Animated.Node<number>;
  onLongPress: (index: number) => void;
}

const RawButton = ({
  index,
  selectedIndex,
  accessibilityLabel,
  children,
  style,
  animatedOnChange,
  onLongPress,
}: RawButtonProps) => {
  // refs
  const rootViewRef = useRef<Animated.View>(null);
  const longPressGestureHandlerRef = useRef<LongPressGestureHandler>(null);

  // tap gesture
  const tapGestureState = useValue(State.UNDETERMINED);
  const tapGestureHandler = useGestureHandler({ state: tapGestureState });

  // long press gesture
  const longPressGestureState = useValue(State.UNDETERMINED);
  const longPressGestureHandler = useGestureHandler({
    state: longPressGestureState,
  });

  // effects
  useCode(
    () => [
      onChange(
        tapGestureState,
        cond(eq(tapGestureState, State.END), animatedOnChange(index))
      ),
      onChange(
        longPressGestureState,
        cond(
          eq(longPressGestureState, State.ACTIVE),
          call([], () => {
            onLongPress(index);
          })
        )
      ),
      onChange(
        selectedIndex,
        call([selectedIndex], args => {
          // @ts-ignore
          rootViewRef.current.setNativeProps({
            accessibilityState: {
              selected: args[0] === index,
            },
          });
        })
      ),
    ],
    [index]
  );
  return (
    <TapGestureHandler
      waitFor={longPressGestureHandlerRef}
      {...tapGestureHandler}
    >
      <Animated.View
        ref={rootViewRef}
        accessible={true}
        accessibilityLabel={accessibilityLabel}
        accessibilityRole="button"
        accessibilityComponentType="button"
        style={style}
      >
        <LongPressGestureHandler
          ref={longPressGestureHandlerRef}
          {...longPressGestureHandler}
        >
          <Animated.View>{children}</Animated.View>
        </LongPressGestureHandler>
      </Animated.View>
    </TapGestureHandler>
  );
};

export default RawButton;

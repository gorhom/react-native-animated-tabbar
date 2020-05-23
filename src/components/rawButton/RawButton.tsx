import React, { useRef } from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import Animated, { call } from 'react-native-reanimated';
import {
  State,
  TapGestureHandler,
  LongPressGestureHandler,
} from 'react-native-gesture-handler';
import { useValue, useGestureHandler } from 'react-native-redash';

const { useCode, set, cond, onChange, eq } = Animated;

interface RawButtonProps {
  index: number;
  selectedIndex: Animated.Value<number>;
  children: React.ReactNode[] | React.ReactNode;
  style?: StyleProp<Animated.AnimateStyle<ViewStyle>>;
  onLongPress: (index: number) => void;
}

const RawButton = ({
  index,
  selectedIndex,
  children,
  style,
  onLongPress,
}: RawButtonProps) => {
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
        cond(eq(tapGestureState, State.END), set(selectedIndex, index))
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
    ],
    [index]
  );

  return (
    <TapGestureHandler
      waitFor={longPressGestureHandlerRef}
      {...tapGestureHandler}
    >
      <Animated.View style={style}>
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

import Animated from 'react-native-reanimated';
import type { TabBarConfigurableProps } from '../types';

const {
  block,
  cond,
  onChange,
  Value,
  Clock,
  set,
  eq,
  neq,
  not,
  or,
  timing,
  and,
  startClock,
  clockRunning,
  stopClock,
} = Animated;

interface useReverseTabBarItemFocusTransitionProps
  extends Required<Pick<TabBarConfigurableProps, 'duration' | 'easing'>> {
  index: number;
  selectedIndex: Animated.Value<number>;
}

export const useReverseTabBarItemFocusTransition = ({
  index,
  selectedIndex,
  duration,
  easing,
}: useReverseTabBarItemFocusTransitionProps) => {
  //#region variables
  const clock = new Clock();
  const state = {
    finished: new Value(1),
    frameTime: new Value(1),
    position: new Value(1),
    time: new Value(1),
  };
  const config = {
    toValue: new Value(1),
    easing,
    duration,
  };
  //#endregion

  //#region conditions
  const shouldAnimateIn = and(eq(selectedIndex, index), neq(state.position, 0));
  const shouldAnimateOut = and(
    neq(selectedIndex, index),
    neq(state.position, 1)
  );
  const shouldAnimate = or(shouldAnimateIn, shouldAnimateOut);
  //#endregion
  const finishTiming = [
    stopClock(clock),
    set(state.finished, 1),
    set(state.frameTime, 1),
    set(state.time, 1),
  ];
  return block([
    onChange(selectedIndex, finishTiming),
    cond(shouldAnimate, [
      cond(and(not(clockRunning(clock)), not(state.finished)), [
        set(state.frameTime, 1),
        set(state.time, 1),
        set(state.finished, 1),
        set(config.toValue, shouldAnimateIn),
        startClock(clock),
      ]),
      timing(clock, state, config),
      cond(state.finished, finishTiming),
    ]),
    state.position,
  ]);
};

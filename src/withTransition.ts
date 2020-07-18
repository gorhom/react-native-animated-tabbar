import Animated from 'react-native-reanimated';
import type { TabBarConfigurableProps } from './types';

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

interface withTransitionProps
  extends Required<Pick<TabBarConfigurableProps, 'duration' | 'easing'>> {
  index: number;
  selectedIndex: Animated.Value<number>;
}

export const withTransition = ({
  index,
  selectedIndex,
  duration,
  easing,
}: withTransitionProps) => {
  //#region variables
  const clock = new Clock();
  const state = {
    finished: new Value(0),
    frameTime: new Value(0),
    position: new Value(0),
    time: new Value(0),
  };
  const config = {
    toValue: new Value(0),
    easing,
    duration,
  };
  //#endregion

  //#region conditions
  const shouldAnimateIn = and(eq(selectedIndex, index), neq(state.position, 1));
  const shouldAnimateOut = and(
    neq(selectedIndex, index),
    neq(state.position, 0)
  );
  const shouldAnimate = or(shouldAnimateIn, shouldAnimateOut);
  //#endregion
  const finishTiming = [
    stopClock(clock),
    set(state.finished, 0),
    set(state.frameTime, 0),
    set(state.time, 0),
  ];
  return block([
    onChange(selectedIndex, finishTiming),
    cond(shouldAnimate, [
      cond(and(not(clockRunning(clock)), not(state.finished)), [
        set(state.frameTime, 0),
        set(state.time, 0),
        set(state.finished, 0),
        set(config.toValue, shouldAnimateIn),
        startClock(clock),
      ]),
      timing(clock, state, config),
      cond(state.finished, finishTiming),
    ]),
    state.position,
  ]);
};

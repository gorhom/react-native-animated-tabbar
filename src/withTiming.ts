import Animated, { Easing } from 'react-native-reanimated';

const {
  Value,
  block,
  cond,
  set,
  stopClock,
  and,
  not,
  clockRunning,
  startClock,
  neq,
  timing,
} = Animated;

interface WithTimingProps {
  toValue: number;
  fromValue: Animated.Value<number>;
  clock: Animated.Clock;
}

export const withTiming = (props: WithTimingProps) => {
  const { toValue, fromValue, clock } = props;

  const config: Animated.TimingConfig = {
    toValue: new Value(0),
    duration: 500,
    easing: Easing.out(Easing.exp),
  };

  const animationState: Animated.TimingState = {
    finished: new Value(0),
    position: fromValue,
    frameTime: new Value(0),
    time: new Value(0),
  };

  const finishTiming = [
    stopClock(clock),
    set(animationState.finished, 0),
    set(animationState.frameTime, 0),
    set(animationState.time, 0),
  ];

  return block([
    cond(neq(animationState.position, toValue), [
      cond(and(not(clockRunning(clock)), not(animationState.finished)), [
        set(animationState.finished, 0),
        set(animationState.frameTime, 0),
        set(animationState.time, 0),
        // @ts-ignore
        set(config.toValue, toValue),
        startClock(clock),
      ]),
      timing(clock, animationState, config),
      cond(animationState.finished, finishTiming),
    ]),
    animationState.position,
  ]);
};

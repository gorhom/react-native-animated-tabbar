import { useMemo, useEffect } from 'react';
import Animated, {
  block,
  onChange,
  stopClock,
  set,
  cond,
  and,
  not,
  clockRunning,
  startClock,
  timing,
  Easing,
} from 'react-native-reanimated';
import { useClock, useValue } from 'react-native-redash';

export const useTabBarVisibility = (shouldShowTabBar: boolean) => {
  const _shouldShowTabBar = useValue(shouldShowTabBar ? 1 : 0);
  const clock = useClock();
  const shouldAnimate = useValue(0);
  const state = useMemo(
    () => ({
      finished: new Animated.Value(0),
      frameTime: new Animated.Value(0),
      position: new Animated.Value(shouldShowTabBar ? 1 : 0),
      time: new Animated.Value(0),
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );
  const config = useMemo(
    () => ({
      toValue: new Animated.Value(0),
      easing: Easing.linear,
      duration: 250,
    }),
    []
  );

  const finishTiming = useMemo(
    () => [
      stopClock(clock),
      set(state.finished, 0),
      set(state.frameTime, 0),
      set(state.time, 0),
    ],
    [clock, state]
  );

  // effects
  useEffect(() => {
    _shouldShowTabBar.setValue(shouldShowTabBar ? 1 : 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shouldShowTabBar]);

  return block([
    onChange(_shouldShowTabBar, [finishTiming, set(shouldAnimate, 1)]),

    cond(shouldAnimate, [
      cond(and(not(clockRunning(clock)), not(state.finished)), [
        set(state.frameTime, 0),
        set(state.time, 0),
        set(state.finished, 0),
        set(config.toValue, _shouldShowTabBar),
        startClock(clock),
      ]),
      timing(clock, state, config),
      cond(state.finished, [finishTiming, set(shouldAnimate, 0)]),
    ]),

    state.position,
  ]);
};

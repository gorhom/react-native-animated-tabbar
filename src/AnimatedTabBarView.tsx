import React, { useMemo, useEffect, useRef } from 'react';
import Animated from 'react-native-reanimated';
import { useValue } from 'react-native-redash';
import Presets, { PresetEnum } from './presets';
import type { AnimatedTabBarViewProps } from './types';

const { proc, call } = Animated;
/**
 * @DEV
 * this is needed for react-native-svg to animate on the native thread.
 * @external (https://github.com/software-mansion/react-native-reanimated/issues/537)
 */
Animated.addWhitelistedNativeProps({
  width: true,
  stroke: true,
  backgroundColor: true,
});

export function AnimatedTabBarView<T extends PresetEnum>(
  props: AnimatedTabBarViewProps<T>
) {
  // props
  const {
    index: controlledIndex,
    onIndexChange,
    onLongPress,
    tabs: _tabs,
    preset = 'bubble',
    style,
    itemInnerSpace,
    itemOuterSpace,
    itemContainerWidth,
    iconSize,
    duration,
    easing,
    isRTL,
    ...rest
  } = props;

  // verify props
  if (!Object.keys(Presets).includes(preset)) {
    throw new Error(
      `Wrong preset been provided. expected one of these: [${Object.keys(
        Presets
      ).join(', ')}], but found "${preset}".`
    );
  }

  // variables
  const selectedIndex = useValue(controlledIndex);
  const tabs = useMemo(() => {
    return Object.keys(_tabs).map(key => {
      return _tabs[key].title && _tabs[key].key
        ? _tabs[key]
        : {
            title: key,
            key: `tab-${key}`,
            ..._tabs[key],
          };
    });
  }, [_tabs]);

  //#region Effects
  const indexRef = useRef(controlledIndex);
  /**
   * @DEV
   * here we listen to the controlled index and update
   * selectedIndex value.
   */
  useEffect(() => {
    selectedIndex.setValue(controlledIndex);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [controlledIndex]);

  /**
   * @DEV
   * here we listen to selectedIndex and call `onIndexChange`
   */
  const animatedOnChange = useMemo(
    () =>
      proc((index: number) =>
        call([index], args => {
          if (onIndexChange) {
            indexRef.current = args[0];
            onIndexChange(args[0]);
          }
        })
      ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );
  //#endregion

  const PresetComponent = Presets[preset].component;

  // render
  return (
    <PresetComponent
      style={style}
      selectedIndex={selectedIndex}
      animatedOnChange={animatedOnChange}
      // @ts-ignore
      tabs={tabs}
      itemInnerSpace={itemInnerSpace}
      itemOuterSpace={itemOuterSpace}
      itemContainerWidth={itemContainerWidth}
      iconSize={iconSize}
      duration={duration}
      easing={easing}
      isRTL={isRTL}
      onLongPress={onLongPress}
      {...rest}
    />
  );
}

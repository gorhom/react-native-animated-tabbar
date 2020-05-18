import React, { useMemo, useEffect } from 'react';
import Animated from 'react-native-reanimated';
import { useValue } from 'react-native-redash';
import Presets, { PresetEnum } from './presets';
import {
  TabsConfig,
  TabInfo,
  TabBarViewProps,
  TabBarItemConfigurableProps,
  TabBarAnimationConfigurableProps,
} from './types';

const { onChange, useCode, call } = Animated;
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

export interface AnimatedTabBarViewProps<T extends PresetEnum>
  extends Pick<TabBarViewProps<{}>, 'style'>,
    TabBarItemConfigurableProps,
    TabBarAnimationConfigurableProps {
  /**
   * Initial index.
   */
  index: number;

  /**
   * Tabs configurations.
   */
  tabs: TabsConfig<typeof Presets[T]['$t'] & Partial<TabInfo>>;

  /**
   * Animation preset.
   */
  preset?: T;

  /**
   * Callback when animated index changes.
   */
  onIndexChange: (index: number) => void;
}

export function AnimatedTabBarView<T extends PresetEnum>(
  props: AnimatedTabBarViewProps<T>
) {
  // props
  const {
    index: controlledIndex,
    onIndexChange,
    tabs: _tabs,
    preset = 'bubble',
    style,
    itemInnerSpace,
    itemOuterSpace,
    iconSize,
    duration,
    easing,
    isRTL,
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
  /**
   * @DEV
   * here we listen to the controlled index and update
   * selectedIndex value.
   */
  useEffect(() => {
    // @ts-ignore
    selectedIndex.setValue(controlledIndex);
  }, [selectedIndex, controlledIndex]);

  /**
   * @DEV
   * here we listen to selectedIndex and call `onIndexChange`
   */
  useCode(
    () =>
      onChange(
        selectedIndex,
        call([selectedIndex], args => {
          if (onIndexChange) {
            onIndexChange(args[0]);
          }
        })
      ),
    []
  );
  //#endregion

  const PresetComponent = Presets[preset].component;

  // render
  return (
    <PresetComponent
      style={style}
      selectedIndex={selectedIndex}
      // @ts-ignore
      tabs={tabs}
      itemInnerSpace={itemInnerSpace}
      itemOuterSpace={itemOuterSpace}
      iconSize={iconSize}
      duration={duration}
      easing={easing}
      isRTL={isRTL}
    />
  );
}

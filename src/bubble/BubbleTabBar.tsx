import React, { useMemo, memo } from 'react';
import { View } from 'react-native';
import { useSafeArea } from 'react-native-safe-area-context';
import Animated from 'react-native-reanimated';
// @ts-ignore 😞
import isEqual from 'lodash.isequal';
import BubbleTabBarItem from './item';
import { TabBarViewProps } from '../types';
import {
  DEFAULT_ITEM_ANIMATION_DURATION,
  DEFAULT_ITEM_ANIMATION_EASING,
  DEFAULT_ITEM_INNER_SPACE,
  DEFAULT_ITEM_OUTER_SPACE,
  DEFAULT_ITEM_ICON_SIZE,
  DEFAULT_ITEM_LAYOUT_DIRECTION,
} from './constants';
import { styles } from './styles';

interface BubbleTabBarProps extends TabBarViewProps {
  selectedIndex: Animated.Value<number>;
}

const BubbleTabBarComponent = ({
  selectedIndex,
  routes,
  duration = DEFAULT_ITEM_ANIMATION_DURATION,
  easing = DEFAULT_ITEM_ANIMATION_EASING,
  itemInnerSpace = DEFAULT_ITEM_INNER_SPACE,
  itemOuterSpace = DEFAULT_ITEM_OUTER_SPACE,
  iconSize = DEFAULT_ITEM_ICON_SIZE,
  isRTL = DEFAULT_ITEM_LAYOUT_DIRECTION,
  style: containerStyleOverride,
}: BubbleTabBarProps) => {
  //#region Hooks
  const safeArea = useSafeArea();
  //#endregion

  //#region Styles
  const containerStyle = useMemo(
    () => [
      styles.container,
      containerStyleOverride,
      {
        paddingBottom: safeArea.bottom,
      },
    ],
    [safeArea, containerStyleOverride]
  );
  //#endregion
  return (
    <View style={containerStyle}>
      {routes.map(({ key, title, ...configs }, index) => {
        return (
          <BubbleTabBarItem
            key={key}
            index={index}
            selectedIndex={selectedIndex}
            label={title}
            duration={duration}
            easing={easing}
            itemInnerSpace={itemInnerSpace}
            itemOuterSpace={itemOuterSpace}
            iconSize={iconSize}
            isRTL={isRTL}
            {...configs}
          />
        );
      })}
    </View>
  );
};

const BubbleTabBar = memo(BubbleTabBarComponent, (prevProps, nextProps) =>
  isEqual(prevProps, nextProps)
);

export default BubbleTabBar;

import React, { useMemo, memo } from 'react';
import { View, StyleProp, ViewStyle } from 'react-native';
// @ts-ignore 😞
import isEqual from 'lodash.isequal';
import FlashyTabBarItem from './item';
import {
  DEFAULT_ITEM_ANIMATION_DURATION,
  DEFAULT_ITEM_ANIMATION_EASING,
  DEFAULT_ITEM_INNER_SPACE,
  DEFAULT_ITEM_OUTER_SPACE,
  DEFAULT_ITEM_ICON_SIZE,
  DEFAULT_ITEM_LAYOUT_DIRECTION,
  DEFAULT_ITEM_CONTAINER_WIDTH,
} from './constants';
import { noop } from '../utilities';
import { TabBarViewProps } from '../types';
import { FlashyTabConfig } from './types';
import { styles } from './styles';

const FlashyTabBarComponent = ({
  selectedIndex,
  tabs,
  duration = DEFAULT_ITEM_ANIMATION_DURATION,
  easing = DEFAULT_ITEM_ANIMATION_EASING,
  itemInnerSpace = DEFAULT_ITEM_INNER_SPACE,
  itemOuterSpace = DEFAULT_ITEM_OUTER_SPACE,
  itemContainerWidth = DEFAULT_ITEM_CONTAINER_WIDTH,
  iconSize = DEFAULT_ITEM_ICON_SIZE,
  isRTL = DEFAULT_ITEM_LAYOUT_DIRECTION,
  style: containerStyleOverride,
  onLongPress = noop,
}: TabBarViewProps<FlashyTabConfig>) => {
  //#region Styles
  const containerStyle = useMemo<StyleProp<ViewStyle>>(
    () => [
      styles.container,
      containerStyleOverride,
      {
        flexDirection: isRTL ? 'row-reverse' : 'row',
      },
    ],
    [containerStyleOverride, isRTL]
  );
  //#endregion
  // render
  return (
    <View style={containerStyle}>
      {tabs.map(({ key, title, ...configs }, index) => {
        return (
          <FlashyTabBarItem
            key={key}
            index={index}
            selectedIndex={selectedIndex}
            label={title}
            duration={duration}
            easing={easing}
            itemInnerSpace={itemInnerSpace}
            itemOuterSpace={itemOuterSpace}
            itemContainerWidth={itemContainerWidth}
            iconSize={iconSize}
            isRTL={isRTL}
            onLongPress={onLongPress}
            {...configs}
          />
        );
      })}
    </View>
  );
};

const FlashyTabBar = memo(FlashyTabBarComponent, (prevProps, nextProps) =>
  isEqual(prevProps, nextProps)
);

export default FlashyTabBar;

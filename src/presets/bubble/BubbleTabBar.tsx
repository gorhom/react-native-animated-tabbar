import React, { useMemo, memo } from 'react';
import { View, ViewStyle, StyleProp } from 'react-native';
// @ts-ignore 😞
import isEqual from 'lodash.isequal';
import BubbleTabBarItem from './item';
import RawButton from '../../components/rawButton';
import {
  DEFAULT_ITEM_ANIMATION_DURATION,
  DEFAULT_ITEM_ANIMATION_EASING,
  DEFAULT_ITEM_INNER_SPACE,
  DEFAULT_ITEM_OUTER_SPACE,
  DEFAULT_ITEM_ICON_SIZE,
  DEFAULT_ITEM_LAYOUT_DIRECTION,
  DEFAULT_ITEM_CONTAINER_WIDTH,
} from './constants';
import { noop } from '../../utilities';
import { TabBarViewProps } from '../../types';
import { BubbleTabConfig } from './types';
import { styles } from './styles';

const BubbleTabBarComponent = ({
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
}: TabBarViewProps<BubbleTabConfig>) => {
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
  return (
    <View style={containerStyle}>
      {tabs.map(({ key, title, ...configs }, index) => {
        return (
          <RawButton
            key={key}
            index={index}
            selectedIndex={selectedIndex}
            accessibilityLabel={title}
            onLongPress={onLongPress}
          >
            <BubbleTabBarItem
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
              {...configs}
            />
          </RawButton>
        );
      })}
    </View>
  );
};

const BubbleTabBar = memo(BubbleTabBarComponent, isEqual);

export default BubbleTabBar;

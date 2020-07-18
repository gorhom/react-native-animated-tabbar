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
import { withTransition } from '../../withTransition';
import { noop } from '../../utilities';
import type { TabBarViewProps } from '../../types';
import type { BubbleTabBarConfig, BubbleTabBarItemConfig } from './types';
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
  animatedOnChange,
  onLongPress = noop,
}: TabBarViewProps<BubbleTabBarConfig, BubbleTabBarItemConfig>) => {
  //#region variables
  const animatedFocusValues = useMemo(
    () =>
      tabs.map((_, index) =>
        withTransition({
          index,
          selectedIndex,
          duration,
          easing,
        })
      ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [tabs, duration, easing]
  );
  //#endregion

  //#region styles
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
          <RawButton
            key={key}
            index={index}
            selectedIndex={selectedIndex}
            accessibilityLabel={title}
            animatedOnChange={animatedOnChange}
            onLongPress={onLongPress}
          >
            <BubbleTabBarItem
              index={index}
              animatedFocus={animatedFocusValues[index]}
              label={title}
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

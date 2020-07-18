export { AnimatedTabBar as default } from './AnimatedTabBar';
export { AnimatedTabBarView } from './AnimatedTabBarView';
import {
  BubbleConfig,
  BubbleTabConfig,
  BubbleTabIconProps,
  BubbleTabBarItem,
  BubbleTabBarItemProps,
} from './presets/bubble';
import { TabsConfig } from './types';

/**
 * @todo
 * remove this on the next major release
 */
export type TabsConfigsType = TabsConfig<BubbleTabConfig>;

/**
 * @dev
 * exports presets for customisations
 */
export {
  BubbleConfig,
  BubbleTabConfig,
  BubbleTabIconProps,
  BubbleTabBarItem,
  BubbleTabBarItemProps,
  TabsConfig,
};

export {
  FlashyConfig,
  FlashyTabConfig,
  FlashyTabIconProps,
  FlashyTabBarItem,
  FlashyTabBarItemProps,
} from './presets/flashy';

export {
  MaterialTabBarConfig,
  MaterialTabBarItemConfig,
  MaterialTabBarItem,
  MaterialTabBarItemProps,
  MaterialTabBarIconProps,
} from './presets/material';

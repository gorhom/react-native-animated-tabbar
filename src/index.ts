export { AnimatedTabBar as default } from './AnimatedTabBar';
export { AnimatedTabBarView } from './AnimatedTabBarView';
import {
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
  BubbleTabConfig,
  BubbleTabIconProps,
  BubbleTabBarItem,
  BubbleTabBarItemProps,
  TabsConfig,
};

export {
  FlashyTabConfig,
  FlashyTabIconProps,
  FlashyTabBarItem,
  FlashyTabBarItemProps,
} from './presets/flashy';

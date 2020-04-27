export { AnimatedTabBar as default } from './AnimatedTabBar';
import {
  BubbleTabConfig,
  BubbleTabIconProps,
  BubbleTabBarItem,
  BubbleTabBarItemProps,
} from './bubble';
export {
  FlashyTabConfig,
  FlashyTabIconProps,
  FlashyTabBarItem,
  FlashyTabBarItemProps,
} from './flashy';
import { TabsConfig } from './types';

/**
 * @todo
 * remove this on the next major release
 */
export type TabsConfigsType = TabsConfig<BubbleTabConfig>;

export {
  BubbleTabConfig,
  BubbleTabIconProps,
  BubbleTabBarItem,
  BubbleTabBarItemProps,
  TabsConfig,
};

export { AnimatedTabBar as default } from './AnimatedTabBar';
import { BubbleTabConfig, BubbleTabIconProps } from './bubble';
import { TabsConfig } from './types';

/**
 * @todo
 * remove this on the next major release
 */
export type TabsConfigsType = TabsConfig<BubbleTabConfig>;

export { BubbleTabConfig, BubbleTabIconProps, TabsConfig };

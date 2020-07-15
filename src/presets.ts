import BubbleTabBar, { BubbleConfig, BubbleTabConfig } from './presets/bubble';
import FlashyTabBar, { FlashyConfig, FlashyTabConfig } from './presets/flashy';

const Presets = {
  bubble: {
    component: BubbleTabBar,
    $c: (undefined as any) as BubbleConfig,
    $t: (undefined as any) as BubbleTabConfig,
  },
  flashy: {
    component: FlashyTabBar,
    $c: (undefined as any) as FlashyConfig,
    $t: (undefined as any) as FlashyTabConfig,
  },
};

export type PresetEnum = keyof typeof Presets;

export default Presets;

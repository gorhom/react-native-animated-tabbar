import BubbleTabBar, { BubbleTabConfig } from './presets/bubble';
import FlashyTabBar, { FlashyTabConfig } from './presets/flashy';

const Presets = {
  bubble: {
    component: BubbleTabBar,
    $t: (undefined as any) as BubbleTabConfig,
  },
  flashy: {
    component: FlashyTabBar,
    $t: (undefined as any) as FlashyTabConfig,
  },
};

export type PresetEnum = keyof typeof Presets;

export default Presets;

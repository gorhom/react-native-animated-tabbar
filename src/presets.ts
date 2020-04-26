import BubbleTabBar, { BubbleTabConfig } from './bubble';
import FlashyTabBar, { FlashyTabConfig } from './flashy';

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

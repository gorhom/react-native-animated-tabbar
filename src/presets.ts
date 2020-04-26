import BubbleTabBar, { BubbleTabConfig } from './bubble';

const Presets = {
  bubble: {
    component: BubbleTabBar,
    $t: (undefined as any) as BubbleTabConfig,
  },
};

export type PresetEnum = keyof typeof Presets;

export default Presets;

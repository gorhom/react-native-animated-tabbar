import BubbleTabBar, { BubbleConfig, BubbleTabConfig } from './presets/bubble';
import FlashyTabBar, { FlashyConfig, FlashyTabConfig } from './presets/flashy';
import MaterialTabBar, {
  MaterialTabBarConfig,
  MaterialTabBarItemConfig,
} from './presets/material';

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
  material: {
    component: MaterialTabBar,
    $c: (undefined as any) as MaterialTabBarConfig,
    $t: (undefined as any) as MaterialTabBarItemConfig,
  },
};

export type PresetEnum = keyof typeof Presets;

export default Presets;

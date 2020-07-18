import BubbleTabBar, {
  BubbleTabBarConfig,
  BubbleTabBarItemConfig,
} from './presets/bubble';
import FlashyTabBar, {
  FlashyTabBarConfig,
  FlashyTabBarItemConfig,
} from './presets/flashy';
import MaterialTabBar, {
  MaterialTabBarConfig,
  MaterialTabBarItemConfig,
} from './presets/material';

const Presets = {
  bubble: {
    component: BubbleTabBar,
    $c: (undefined as any) as BubbleTabBarConfig,
    $t: (undefined as any) as BubbleTabBarItemConfig,
  },
  flashy: {
    component: FlashyTabBar,
    $c: (undefined as any) as FlashyTabBarConfig,
    $t: (undefined as any) as FlashyTabBarItemConfig,
  },
  material: {
    component: MaterialTabBar,
    $c: (undefined as any) as MaterialTabBarConfig,
    $t: (undefined as any) as MaterialTabBarItemConfig,
  },
};

export type PresetEnum = keyof typeof Presets;

export default Presets;

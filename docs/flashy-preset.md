# Flashy Preset

> This preset is inspired by [Cuberto](https://dribbble.com/cuberto) works on [Dribbble](https://dribbble.com/shots/5605168-Toolbar-icons-animation).

<img alt="Default" height="200" src="../docs/previews/flashy.gif" />

## Interfaces

## FlashyTabBarConfig

> no preset config

### FlashyTabBarItemConfig

| name         | description                                                  | required | type                | default       |
| ------------ | ------------------------------------------------------------ | -------- | ------------------- | ------------- |
| `labelStyle` | This will apply to the tab bar item label.                   | NO       | TextStyle           |               |
| `icon`       | Icon configurations.                                         | YES      | object              |               |
| `├component` | Icon component, this could be a function or class component. | YES      | [`ReactNode`](#L45) |               |
| `└color`     | Icon color.                                                  | YES      | string              |               |
| `indicator`  | Tab bar item indicator configurations.                       | YES      | object              |               |
| `├visible`   | To show or hide tab bar item indicator.                      | NO       | boolean             | true          |
| `├size`      | Indicator size.                                              | NO       | number              | 6             |
| `└color`     | Indicator color.                                             | NO       | string              | `label color` |

<details>
  <summary>TypeScript Interface</summary>

```tsx
export interface FlashyTabBarItemConfig {
  /**
   * Tab bar item label style.
   * @type {TextStyle}
   * @default
   * {
   *   color: '#000',
   *   fontSize: 14,
   *   fontWeight: '600'
   * }
   */
  labelStyle: TextStyle;
  /**
   * Tab bar item icon config.
   */
  icon: {
    /**
     * Tab bar item icon component, this could be a function or class component.
     * @type {React.FC<FlashyTabBarIconProps> | React.ComponentClass<FlashyTabBarIconProps>}
     */
    component:
      | React.FC<FlashyTabBarIconProps>
      | React.ComponentClass<FlashyTabBarIconProps>
      | React.ReactNode;
    /**
     * Icon color.
     * @type {string}
     */
    color: string;
  };
  /**
   * Tab bar item indicator config.
   */
  indicator?: {
    /**
     * To show or hide tab bar item indicator.
     * @type {boolean}
     * @default true
     */
    visible?: boolean;

    /**
     * Indicator color
     * @type {boolean}
     * @default labelStyle.color|black
     */
    color?: string;

    /**
     * Indicator size
     * @type {number}
     * @default 6
     */
    size?: number;
  };
}
```

</details>

### FlashyTabBarIconProps

| name            | description                        | required | type                    | default |
| --------------- | ---------------------------------- | -------- | ----------------------- | ------- |
| `animatedFocus` | Tab bar item animated focus value. | YES      | `Animated.Node<number>` |
| `color`         | Tab bar item icon color.           | YES      | number                  |         |
| `size`          | Tab bar item icon size.            | YES      | number                  |         |

<details>
  <summary>TypeScript Interface</summary>

```ts
export interface FlashyTabBarIconProps {
  /**
   * Tab bar item animated focus value.
   * @type {Animated.Node<number>}
   */
  animatedFocus: Animated.Node<number>;
  /**
   * Tab bar item icon color.
   * @type {string}
   */
  color: string;
  /**
   * Tab bar item icon size.
   * @type {number}
   */
  size: number;
}
```

</details>

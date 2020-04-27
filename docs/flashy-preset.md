# Flashy Preset

> This preset is inspired by [Cuberto](https://dribbble.com/cuberto) works on [Dribbble](https://dribbble.com/shots/5605168-Toolbar-icons-animation).

![Flashy Preview](/docs/previews/flashy.gif)

## FlashyTabConfig

| name          | description                                               | required | type                  | default            |
| ------------- | --------------------------------------------------------- | -------- | --------------------- | ------------------ |
| `labelStyle`  | This will apply to the tab bar item label.                | NO       | TextStyle             |                    |
| `icon`        | Icon configurations.                                      | YES      | object                |                    |
| `├component` | Icon component, this could be a function or a react node. | YES      | [`ReactNode`](#L46) |                    |
| `└color`     | Icon color.                                               | YES      | string                |                    |
| `indicator`   | Tab bar item indicator configurations.                    | YES      | object                |                    |
| `├visible`   | To show or hide tab bar item indicator.                   | NO       | boolean               | true               |
| `├size`      | Indicator size.                                           | NO       | number                | 6                  |
| `└color`     | Indicator color.                                          | NO       | string                | `label color` |

## Interfaces

### `FlashyTabConfig`

```ts
export interface FlashyTabConfig {
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
     * Tab bar item icon component, this could be a function or
     * a react node.
     * @type {(props: FlashyTabIconProps) => React.ReactNode | React.ReactNode}
     */
    component:
      | ((props: FlashyTabIconProps) => React.ReactNode)
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

### `FlashyTabIconProps`

```ts
export interface FlashyTabIconProps {
  animatedFocus: Animated.Node<number>;
  color: string;
  size: number;
}
```

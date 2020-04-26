# Flashy Preset

> This preset is inspired by [Cuberto](https://dribbble.com/cuberto) works on [Dribbble](https://dribbble.com/shots/5605168-Toolbar-icons-animation).

![Flashy Preview](/docs/previews/flashy.gif)

## FlashyTabConfig

### `labelStyle`

This will apply to the tab bar item label.

```ts
/**
 * @type {TextStyle}
 * @default
 * {
 *   color: '#000',
 *   fontSize: 14,
 *   fontWeight: '600'
 * }
 */
```

### `icon`

Icon configurations.

##### `component`

Icon component, this could be a function or a react node.

```ts
/**
 * @type {(props: FlashyTabIconProps) => React.ReactNode | React.ReactNode}
 */
```

##### `color`

Icon color.

```ts
/**
 * @type {string}
 */
```

### `indicator`

Tab bar item indicator configurations.

##### `visible`

To show or hide tab bar item indicator.

```ts
/**
 * @type {boolean}
 * @default true
 */
```

##### `color`

Indicator color.

```ts
/**
 * @type {string}
 * @default labelStyle.color|black
 */
```

##### `size`

Indicator size.

```ts
/**
 * @type {number}
 * @default 6
 */
```

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

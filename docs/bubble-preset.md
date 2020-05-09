# Bubble Preset

> This preset is inspired by [Aurélien Salomon](https://dribbble.com/aureliensalomon) works on [Dribbble](https://dribbble.com/shots/5925052-Google-Bottom-Bar-Navigation-Pattern-Mobile-UX-Design).

![Bubble Preview](/docs/previews/bubble.gif)

## BubbleTabConfig

| name              | description                                               | required | type                  | default |
| ----------------- | --------------------------------------------------------- | -------- | --------------------- | ------- |
| `labelStyle`      | This will apply to the tab bar item label.                | NO       | TextStyle             |         |
| `icon`            | Icon configurations.                                      | YES      | object                |         |
| `├component`     | Icon component, this could be a function or a react node. | YES      | [`ReactNode`](#L46) |         |
| `├activeColor`   | Icon active color.                                        | YES      | string                |         |
| `└inactiveColor` | Icon inactive color.                                      | YES      | string                |         |
| `background`      | Tab bar item background configurations.                   | YES      | object                |         |
| `├activeColor`   | Background active color.                                  | YES      | string                |         |
| `└inactiveColor` | Background inactive color.                                | YES      | string                |         |

## Interfaces

### `BubbleTabConfig`

```ts
export interface BubbleTabConfig {
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
     * @type {(props: BubbleTabIconProps) => React.ReactNode | React.ReactNode}
     */
    component:
      | ((props: BubbleTabIconProps) => React.ReactNode)
      | React.ReactNode;

    /**
     * Icon active color.
     * @type {string}
     */
    activeColor: string;
    /**
     * Icon inactive color.
     * @type {string}
     */
    inactiveColor: string;
  };
  background: {
    /**
     * Tab bar item background active color.
     * @type {string}
     */
    activeColor: string;
    /**
     * Tab bar item background inactive color.
     * @type {string}
     */
    inactiveColor: string;
  };
}
```

### `BubbleTabIconProps`

```ts
export interface BubbleTabIconProps {
  animatedFocus: Animated.Node<number>;
  color: Animated.Node<string | number>;
  size: number;
}
```

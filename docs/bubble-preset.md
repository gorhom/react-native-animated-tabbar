# Bubble Preset

> This preset is inspired by [Aurélien Salomon](https://dribbble.com/aureliensalomon) works on [Dribbble](https://dribbble.com/shots/5925052-Google-Bottom-Bar-Navigation-Pattern-Mobile-UX-Design).

<img alt="Default" height="200" src="../docs/previews/bubble.gif" />

## Interfaces

### BubbleTabBarConfig

> no preset config

### BubbleTabBarItemConfig

| name             | description                                                  | required | type                | default |
| ---------------- | ------------------------------------------------------------ | -------- | ------------------- | ------- |
| `labelStyle`     | This will apply to the tab bar item label.                   | NO       | TextStyle           |         |
| `icon`           | Icon configurations.                                         | YES      | object              |         |
| `├component`     | Icon component, this could be a function or class component. | YES      | [`ReactNode`](#L46) |         |
| `├activeColor`   | Icon active color.                                           | YES      | string              |         |
| `└inactiveColor` | Icon inactive color.                                         | YES      | string              |         |
| `background`     | Tab bar item background configurations.                      | YES      | object              |         |
| `├activeColor`   | Background active color.                                     | YES      | string              |         |
| `└inactiveColor` | Background inactive color.                                   | YES      | string              |         |

<details>
  <summary>TypeScript Interface</summary>

```ts
export interface BubbleTabBarItemConfig {
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
     * @type {React.FC<BubbleTabBarIconProps> | React.ComponentClass<BubbleTabBarIconProps>}
     */
    component:
      | React.FC<BubbleTabBarIconProps>
      | React.ComponentClass<BubbleTabBarIconProps>
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

</details>

### BubbleTabBarIconProps

| name            | description                        | required | type                           | default |
| --------------- | ---------------------------------- | -------- | ------------------------------ | ------- |
| `animatedFocus` | Tab bar item animated focus value. | YES      | `Animated.Node<number>`        |
| `color`         | Tab bar item animated icon color.  | YES      | `Animated.Node<number|string>` |         |
| `size`          | Tab bar item icon size.            | YES      | number                         |         |

<details>
  <summary>TypeScript Interface</summary>

```ts
export interface MaterialTabBarIconProps {
  /**
   * Tab bar item animated focus value.
   * @type {Animated.Node<number>}
   */
  animatedFocus: Animated.Node<number>;
  /**
   * Tab bar item animated icon color.
   * @type {Animated.Node<string | number>}
   */
  color: Animated.Node<string | number>;
  /**
   * Tab bar item icon size.
   * @type {number}
   */
  size: number;
}
```

</details>

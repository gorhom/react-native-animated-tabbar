# Bubble Preset

> This preset is inspired by [Aurélien Salomon](https://dribbble.com/aureliensalomon) works on [Dribbble](https://dribbble.com/shots/5925052-Google-Bottom-Bar-Navigation-Pattern-Mobile-UX-Design).

![Bubble Preview](/docs/previews/bubble.gif)

## BubbleTabConfig

### labelStyle

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

### icon

Icon configurations.

#### component

Icon component, this could be a function or a react node.

```ts
/**
 * @type {() => React.ReactNode | React.ReactNode}
 */
```

#### activeColor

Icon active color.

```ts
/**
 * @type {string}
 */
```

#### inactiveColor

Icon inactive color.

```ts
/**
 * @type {string}
 */
```

### background

Tab bar item background configurations.

#### activeColor

Background active color.

```ts
/**
 * @type {string}
 */
```

#### inactiveColor

Background inactive color.

```ts
/**
 * @type {string}
 */
```

## Interface

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
     * @type {() => React.ReactNode | React.ReactNode}
     */
    component:
      | ((props: {
          color: Animated.Node<string | number>;
          size: number;
        }) => React.ReactNode)
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

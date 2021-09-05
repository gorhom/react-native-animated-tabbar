const screens = [
  {
    title: 'Bubble',
    data: [
      {
        name: 'Default',
        slug: 'Bubble',
        getScreen: () => require('./bubble/Bubble').default,
      },
      // {
      //   name: 'Styled',
      //   slug: 'BubbleStyled',
      //   getScreen: () => require('./bubble/BubbleStyled').default,
      // },
      // {
      //   name: 'RTL',
      //   slug: 'BubbleRTL',
      //   getScreen: () => require('./bubble/BubbleRTL').default,
      // },
      // {
      //   name: 'Standalone',
      //   slug: 'BubbleStandalone',
      //   getScreen: () => require('./bubble/BubbleStandalone').default,
      // },
    ],
  },
];

export { screens };

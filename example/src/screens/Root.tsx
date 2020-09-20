import React, { useMemo } from 'react';
import { useNavigation } from '@react-navigation/native';
import Showcase from '@gorhom/showcase-template';
import { version, description } from '../../../package.json';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const examples = [
  {
    title: 'Bubble',
    data: [
      {
        name: 'Default',
        slug: 'Bubble',
      },
      {
        name: 'Styled',
        slug: 'BubbleStyled',
      },
      {
        name: 'RTL',
        slug: 'BubbleRTL',
      },
      {
        name: 'Standalone',
        slug: 'BubbleStandalone',
      },
    ],
  },
  {
    title: 'Flashy',
    data: [
      {
        name: 'Default',
        slug: 'Flashy',
      },
      {
        name: 'Styled',
        slug: 'FlashyStyled',
      },
      {
        name: 'RTL',
        slug: 'FlashyRTL',
      },
      {
        name: 'Standalone',
        slug: 'FlashyStandalone',
      },
    ],
  },
  {
    title: 'Material',
    data: [
      {
        name: 'Default',
        slug: 'MaterialIconWithLabel',
      },
      {
        name: 'Icon Only',
        slug: 'MaterialIconOnly',
      },
      {
        name: 'Icon With Label On Focus',
        slug: 'MaterialIconWithLabelOnFocus',
      },
      {
        name: 'Styled',
        slug: 'MaterialStyled',
      },
      {
        name: 'RTL',
        slug: 'MaterialRTL',
      },
      {
        name: 'Standalone',
        slug: 'MaterialStandalone',
      },
    ],
  },
];

const RootScreen = () => {
  // hooks
  const { navigate } = useNavigation();
  const safeInsets = useSafeAreaInsets();

  // variables
  const data = useMemo(() => examples.reverse(), []);
  const author = useMemo(
    () => ({
      username: '@gorhom',
      url: 'https://gorhom.dev',
    }),
    []
  );

  // callbacks
  const handleOnExamplePress = (slug: string) => {
    navigate(slug);
  };

  // renders
  return (
    <Showcase
      theme="dark"
      name="Animated TabBar"
      description={description}
      version={version}
      author={author}
      data={data}
      handleOnPress={handleOnExamplePress}
      safeInsets={safeInsets}
    />
  );
};

export default RootScreen;

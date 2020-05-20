import React from 'react';
import { useNavigation } from '@react-navigation/native';
import Showcase from '@gorhom/showcase-template';
import { version, description } from '../../../package.json';

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
];

const RootScreen = () => {
  // hooks
  const { navigate } = useNavigation();

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
      author={{
        username: '@gorhom',
        url: 'https://gorhom.dev',
      }}
      data={examples}
      handleOnPress={handleOnExamplePress}
    />
  );
};

export default RootScreen;

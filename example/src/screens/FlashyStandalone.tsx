import React, { useState, useMemo } from 'react';
import { View, StyleSheet, Button, StatusBar, Alert } from 'react-native';
import {
  AnimatedTabBarView,
  TabsConfig,
  FlashyTabBarItemConfig,
} from '@gorhom/animated-tabbar';
import HomeSVG from '../svg/HomeSVG';
import LikeSVG from '../svg/LikeSVG';
import SearchSVG from '../svg/SearchSVG';
import ProfileSVG from '../svg/ProfileSVG';
import { MainTabsParams } from './types';

const tabs: TabsConfig<FlashyTabBarItemConfig, MainTabsParams> = {
  Home: {
    labelStyle: {
      color: '#5B37B7',
    },
    icon: {
      component: HomeSVG,
      color: 'rgba(91,55,183,0.5)',
    },
  },
  Likes: {
    labelStyle: {
      color: '#C9379D',
    },
    icon: {
      component: LikeSVG,
      color: 'rgba(201,55,157,0.5)',
    },
  },
  Search: {
    labelStyle: {
      color: '#E6A919',
    },
    icon: {
      component: SearchSVG,
      color: 'rgba(230,169,25,0.5)',
    },
  },
  Profile: {
    labelStyle: {
      color: '#1194AA',
    },
    icon: {
      component: ProfileSVG,
      color: 'rgba(17,148,170,0.5)',
    },
  },
};

const FlashyStandaloneScreen = () => {
  const [index, setIndex] = useState(0);

  const containerStyle = useMemo(
    () => [
      styles.container,
      {
        // @ts-ignore
        backgroundColor: tabs[Object.keys(tabs)[index]].labelStyle.color,
      },
    ],
    [index]
  );
  const handleLongPress = (_index: number) => {
    Alert.alert(`${_index} long pressed !`);
  };
  return (
    <View style={containerStyle}>
      <StatusBar barStyle="dark-content" />
      <AnimatedTabBarView
        preset="flashy"
        tabs={tabs}
        itemOuterSpace={6}
        itemInnerSpace={12}
        itemContainerWidth="auto"
        style={styles.tabBarContainer}
        index={index}
        onIndexChange={setIndex}
        onLongPress={handleLongPress}
      />

      <Button
        title="Set Index to 0"
        color="black"
        onPress={() => setIndex(0)}
      />
      <Button
        title="Set Index to 1"
        color="black"
        onPress={() => setIndex(1)}
      />
      <Button
        title="Set Index to 2"
        color="black"
        onPress={() => setIndex(2)}
      />
      <Button
        title="Set Index to 3"
        color="black"
        onPress={() => setIndex(3)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabBarContainer: {
    borderRadius: 25,
  },
});

export default FlashyStandaloneScreen;

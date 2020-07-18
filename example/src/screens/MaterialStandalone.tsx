import React, { useState } from 'react';
import { View, StyleSheet, Button, StatusBar, Alert } from 'react-native';
import {
  AnimatedTabBarView,
  TabsConfig,
  MaterialTabBarItemConfig,
} from '@gorhom/animated-tabbar';
import HomeSVG from '../svg/HomeSVG';
import LikeSVG from '../svg/LikeSVG';
import SearchSVG from '../svg/SearchSVG';
import ProfileSVG from '../svg/ProfileSVG';
import { MainTabsParams } from './types';

const tabs: TabsConfig<MaterialTabBarItemConfig, MainTabsParams> = {
  Home: {
    icon: {
      component: HomeSVG,
      color: '#fff',
    },
    ripple: {
      color: '#5B37B7',
    },
  },
  Likes: {
    icon: {
      component: LikeSVG,
      color: '#fff',
    },
    ripple: {
      color: '#C9379D',
    },
  },
  Search: {
    icon: {
      component: SearchSVG,
      color: '#fff',
    },
    ripple: {
      color: '#E6A919',
    },
  },
  Profile: {
    icon: {
      component: ProfileSVG,
      color: '#fff',
    },
    ripple: {
      color: '#1194AA',
    },
  },
};

const FlashyStandaloneScreen = () => {
  const [index, setIndex] = useState(0);
  const handleLongPress = (_index: number) => {
    Alert.alert(`${_index} long pressed !`);
  };
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <AnimatedTabBarView
        index={index}
        tabs={tabs}
        preset="material"
        animation="iconOnly"
        itemContainerWidth="auto"
        itemInnerSpace={12}
        inactiveScale={0.65}
        style={styles.tabBarContainer}
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

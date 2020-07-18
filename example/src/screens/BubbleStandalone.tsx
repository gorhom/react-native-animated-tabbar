import React, { useState, useMemo } from 'react';
import { View, StyleSheet, Button, StatusBar, Alert } from 'react-native';
import {
  AnimatedTabBarView,
  TabsConfig,
  BubbleTabBarItemConfig,
} from '@gorhom/animated-tabbar';
import HomeSVG from '../svg/HomeSVG';
import LikeSVG from '../svg/LikeSVG';
import SearchSVG from '../svg/SearchSVG';
import ProfileSVG from '../svg/ProfileSVG';
import { MainTabsParams } from './types';

const tabs: TabsConfig<BubbleTabBarItemConfig, MainTabsParams> = {
  Home: {
    labelStyle: {
      color: '#5B37B7',
    },
    icon: {
      component: HomeSVG,
      activeColor: 'rgba(91,55,183,1)',
      inactiveColor: 'rgba(0,0,0,1)',
    },
    background: {
      activeColor: 'rgba(223,215,243,1)',
      inactiveColor: 'rgba(223,215,243,0)',
    },
  },
  Likes: {
    labelStyle: {
      color: '#C9379D',
    },
    icon: {
      component: LikeSVG,
      activeColor: 'rgba(201,55,157,1)',
      inactiveColor: 'rgba(0,0,0,1)',
    },
    background: {
      activeColor: 'rgba(247,215,243,1)',
      inactiveColor: 'rgba(247,215,243,0)',
    },
  },
  Search: {
    labelStyle: {
      color: '#E6A919',
    },
    icon: {
      component: SearchSVG,
      activeColor: 'rgba(230,169,25,1)',
      inactiveColor: 'rgba(0,0,0,1)',
    },
    background: {
      activeColor: 'rgba(251,239,211,1)',
      inactiveColor: 'rgba(251,239,211,0)',
    },
  },
  Profile: {
    labelStyle: {
      color: '#1194AA',
    },
    icon: {
      component: ProfileSVG,
      activeColor: 'rgba(17,148,170,1)',
      inactiveColor: 'rgba(0,0,0,1)',
    },
    background: {
      activeColor: 'rgba(207,235,239,1)',
      inactiveColor: 'rgba(207,235,239,0)',
    },
  },
};

const BubbleStandaloneScreen = () => {
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
        preset="bubble"
        tabs={tabs}
        itemOuterSpace={{
          horizontal: 6,
          vertical: 12,
        }}
        itemInnerSpace={12}
        iconSize={20}
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

export default BubbleStandaloneScreen;

import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AnimatedTabBar, { TabsConfigsType } from '@gorhom/animated-tabbar';
import DummyScreen from './Dummy';
import HomeSVG from '../svg/HomeSVG';
import LikeSVG from '../svg/LikeSVG';
import SearchSVG from '../svg/SearchSVG';
import ProfileSVG from '../svg/ProfileSVG';

const Tab = createBottomTabNavigator();

const tabs: TabsConfigsType = {
  Home: {
    labelStyle: {
      color: '#1C1C6A',
    },
    icon: {
      component: HomeSVG,
      activeColor: '#A2A2C3',
      inactiveColor: '#A2A2C3',
    },
    background: {
      activeColor: 'rgba(223,215,243,1)',
      inactiveColor: 'rgba(223,215,243,0)',
    },
  },
  Likes: {
    labelStyle: {
      color: '#1C1C6A',
    },
    icon: {
      component: LikeSVG,
      activeColor: '#A2A2C3',
      inactiveColor: '#A2A2C3',
    },
    background: {
      activeColor: 'rgba(247,215,243,1)',
      inactiveColor: 'rgba(247,215,243,0)',
    },
  },
  Search: {
    labelStyle: {
      color: '#1C1C6A',
    },
    icon: {
      component: SearchSVG,
      activeColor: '#A2A2C3',
      inactiveColor: '#A2A2C3',
    },
    background: {
      activeColor: 'rgba(251,239,211,1)',
      inactiveColor: 'rgba(251,239,211,0)',
    },
  },
  Profile: {
    labelStyle: {
      color: '#1C1C6A',
    },
    icon: {
      component: ProfileSVG,
      activeColor: '#A2A2C3',
      inactiveColor: '#A2A2C3',
    },
    background: {
      activeColor: 'rgba(207,235,239,1)',
      inactiveColor: 'rgba(207,235,239,0)',
    },
  },
};

const FlashyScreen = () => {
  return (
    <Tab.Navigator
      tabBar={props => (
        <AnimatedTabBar
          preset="flashy"
          duration={2000}
          tabs={tabs}
          itemInnerSpace={{ vertical: 24 }}
          {...props}
        />
      )}
    >
      <Tab.Screen
        name="Home"
        initialParams={{
          backgroundColor: tabs.Home.labelStyle.color,
        }}
        component={DummyScreen}
      />
      <Tab.Screen
        name="Likes"
        initialParams={{
          backgroundColor: tabs.Likes.labelStyle.color,
        }}
        component={DummyScreen}
      />
      <Tab.Screen
        name="Search"
        initialParams={{
          backgroundColor: tabs.Search.labelStyle.color,
        }}
        component={DummyScreen}
      />
      <Tab.Screen
        name="Profile"
        initialParams={{
          backgroundColor: tabs.Profile.labelStyle.color,
        }}
        component={DummyScreen}
      />
    </Tab.Navigator>
  );
};

export default FlashyScreen;

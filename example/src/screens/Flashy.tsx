import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AnimatedTabBar, {
  TabsConfig,
  FlashyTabConfig,
} from '@gorhom/animated-tabbar';
import DummyScreen from './Dummy';
import HomeSVG from '../svg/HomeSVG';
import LikeSVG from '../svg/LikeSVG';
import SearchSVG from '../svg/SearchSVG';
import ProfileSVG from '../svg/ProfileSVG';

const Tab = createBottomTabNavigator();

const tabs: TabsConfig<FlashyTabConfig> = {
  Home: {
    labelStyle: {
      color: '#1C1C6A',
    },
    icon: {
      component: HomeSVG,
      color: '#A2A2C3',
    },
  },
  Likes: {
    labelStyle: {
      color: '#1C1C6A',
    },
    icon: {
      component: LikeSVG,
      color: '#A2A2C3',
    },
  },
  Search: {
    labelStyle: {
      color: '#1C1C6A',
    },
    icon: {
      component: SearchSVG,
      color: '#A2A2C3',
    },
  },
  Profile: {
    labelStyle: {
      color: '#1C1C6A',
    },
    icon: {
      component: ProfileSVG,
      color: '#A2A2C3',
    },
  },
};

const FlashyScreen = () => {
  return (
    <Tab.Navigator
      tabBar={props => (
        <AnimatedTabBar
          preset="flashy"
          duration={750}
          tabs={tabs}
          iconSize={20}
          itemInnerSpace={24}
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

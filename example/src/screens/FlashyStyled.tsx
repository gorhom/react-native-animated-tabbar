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
import { MainTabsParams } from './types';

const Tab = createBottomTabNavigator<MainTabsParams>();

const tabs: TabsConfig<FlashyTabConfig, MainTabsParams> = {
  Home: {
    labelStyle: {
      color: 'white',
    },
    icon: {
      component: HomeSVG,
      color: '#444',
    },
    indicator: {
      size: 4,
      color: '#5B37B7',
    },
  },
  Likes: {
    labelStyle: {
      color: 'white',
    },
    icon: {
      component: LikeSVG,
      color: '#444',
    },
    indicator: {
      size: 4,
      color: '#C9379D',
    },
  },
  Search: {
    labelStyle: {
      color: 'white',
    },
    icon: {
      component: SearchSVG,
      color: '#444',
    },
    indicator: {
      size: 4,
      color: '#E6A919',
    },
  },
  Profile: {
    labelStyle: {
      color: 'white',
    },
    icon: {
      component: ProfileSVG,
      color: '#444',
    },
    indicator: {
      size: 4,
      color: '#1194AA',
    },
  },
};

const FlashyStyledScreen = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        style: {
          backgroundColor: '#080808',
        },
      }}
      tabBar={props => (
        <AnimatedTabBar preset="flashy" tabs={tabs} iconSize={20} {...props} />
      )}
    >
      <Tab.Screen
        name="Home"
        initialParams={{
          backgroundColor: '#000',
        }}
        component={DummyScreen}
      />
      <Tab.Screen
        name="Likes"
        initialParams={{
          backgroundColor: '#000',
        }}
        component={DummyScreen}
      />
      <Tab.Screen
        name="Search"
        initialParams={{
          backgroundColor: '#000',
        }}
        component={DummyScreen}
      />
      <Tab.Screen
        name="Profile"
        initialParams={{
          backgroundColor: '#000',
        }}
        component={DummyScreen}
      />
    </Tab.Navigator>
  );
};

export default FlashyStyledScreen;

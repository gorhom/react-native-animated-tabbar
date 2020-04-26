import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AnimatedTabBar, {
  TabsConfig,
  BubbleTabConfig,
} from '@gorhom/animated-tabbar';
import DummyScreen from './Dummy';
import HomeSVG from '../svg/HomeSVG';
import LikeSVG from '../svg/LikeSVG';
import SearchSVG from '../svg/SearchSVG';
import ProfileSVG from '../svg/ProfileSVG';

const Tab = createBottomTabNavigator();

const tabs: TabsConfig<BubbleTabConfig> = {
  Home: {
    labelStyle: {
      color: 'white',
    },
    icon: {
      component: HomeSVG,
      activeColor: 'rgba(255,255,255,1)',
      inactiveColor: 'rgba(68,68,68,1)',
    },
    background: {
      activeColor: 'rgba(51,51,51,1)',
      inactiveColor: 'rgba(51,51,51,0)',
    },
  },
  Likes: {
    labelStyle: {
      color: 'white',
    },
    icon: {
      component: LikeSVG,
      activeColor: 'rgba(255,255,255,1)',
      inactiveColor: 'rgba(68,68,68,1)',
    },
    background: {
      activeColor: 'rgba(51,51,51,1)',
      inactiveColor: 'rgba(51,51,51,0)',
    },
  },
  Search: {
    labelStyle: {
      color: 'white',
    },
    icon: {
      component: SearchSVG,
      activeColor: 'rgba(255,255,255,1)',
      inactiveColor: 'rgba(68,68,68,1)',
    },
    background: {
      activeColor: 'rgba(51,51,51,1)',
      inactiveColor: 'rgba(51,51,51,0)',
    },
  },
  Profile: {
    labelStyle: {
      color: 'white',
    },
    icon: {
      component: ProfileSVG,
      activeColor: 'rgba(255,255,255,1)',
      inactiveColor: 'rgba(68,68,68,1)',
    },
    background: {
      activeColor: 'rgba(51,51,51,1)',
      inactiveColor: 'rgba(51,51,51,0)',
    },
  },
};

const BubbleStyledScreen = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        style: {
          backgroundColor: '#080808',
        },
      }}
      tabBar={props => (
        <AnimatedTabBar iconSize={20} duration={750} tabs={tabs} {...props} />
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

export default BubbleStyledScreen;

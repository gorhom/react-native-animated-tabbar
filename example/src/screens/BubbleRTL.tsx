import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AnimatedTabBar, {
  TabsConfig,
  BubbleTabBarItemConfig,
} from '@gorhom/animated-tabbar';
import DummyScreen from './Dummy';
import HomeSVG from '../svg/HomeSVG';
import LikeSVG from '../svg/LikeSVG';
import SearchSVG from '../svg/SearchSVG';
import ProfileSVG from '../svg/ProfileSVG';
import { MainTabsParams } from './types';

const Tab = createBottomTabNavigator<MainTabsParams>();

const tabs: TabsConfig<BubbleTabBarItemConfig, MainTabsParams> = {
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

const BubbleRTLScreen = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        style: {
          backgroundColor: '#080808',
        },
      }}
      tabBar={props => (
        <AnimatedTabBar
          isRTL={true}
          iconSize={20}
          duration={500}
          tabs={tabs}
          {...props}
        />
      )}
    >
      <Tab.Screen
        name="Home"
        options={{
          tabBarLabel: 'الرئيسية',
        }}
        initialParams={{
          name: 'الرئيسية',
          backgroundColor: '#000',
          nextScreen: 'Likes',
        }}
        component={DummyScreen}
      />
      <Tab.Screen
        name="Likes"
        options={{
          tabBarLabel: 'אהבתי',
        }}
        initialParams={{
          name: 'אהבתי',
          backgroundColor: '#000',
          nextScreen: 'Search',
        }}
        component={DummyScreen}
      />
      <Tab.Screen
        name="Search"
        options={{
          tabBarLabel: 'ይፈልጉ',
        }}
        initialParams={{
          name: 'ይፈልጉ',
          backgroundColor: '#000',
          nextScreen: 'Profile',
        }}
        component={DummyScreen}
      />
      <Tab.Screen
        name="Profile"
        options={{
          tabBarLabel: 'مشخصات',
        }}
        initialParams={{
          name: 'مشخصات',
          backgroundColor: '#000',
          nextScreen: 'Home',
        }}
        component={DummyScreen}
      />
    </Tab.Navigator>
  );
};

export default BubbleRTLScreen;

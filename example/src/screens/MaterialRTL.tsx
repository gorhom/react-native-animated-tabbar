import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AnimatedTabBar, {
  TabsConfig,
  MaterialTabBarItemConfig,
} from '@gorhom/animated-tabbar';
import DummyScreen from './Dummy';
import HomeSVG from '../svg/HomeSVG';
import LikeSVG from '../svg/LikeSVG';
import SearchSVG from '../svg/SearchSVG';
import ProfileSVG from '../svg/ProfileSVG';
import { MainTabsParams } from './types';
import { StatusBar } from 'react-native';

const Tab = createBottomTabNavigator<MainTabsParams>();

const tabs: TabsConfig<MaterialTabBarItemConfig, MainTabsParams> = {
  Home: {
    icon: {
      component: HomeSVG,
      color: 'rgba(255,255,255,1)',
    },
    ripple: {
      color: '#5B37B7',
    },
  },
  Likes: {
    icon: {
      component: LikeSVG,
      color: 'rgba(255,255,255,1)',
    },
    ripple: {
      color: '#C9379D',
    },
  },
  Search: {
    icon: {
      component: SearchSVG,
      color: 'rgba(255,255,255,1)',
    },
    ripple: {
      color: '#E6A919',
    },
  },
  Profile: {
    icon: {
      component: ProfileSVG,
      color: 'rgba(255,255,255,1)',
    },
    ripple: {
      color: '#1194AA',
    },
  },
};

const MaterialRTLScreen = () => {
  return (
    <>
      <StatusBar barStyle="light-content" />
      <Tab.Navigator
        tabBar={props => (
          <AnimatedTabBar
            preset="material"
            animation="iconWithLabelOnFocus"
            tabs={tabs}
            isRTL={true}
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
            backgroundColor: '#2D1B5B',
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
            backgroundColor: '#641B4E',
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
            backgroundColor: '#72540C',
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
            backgroundColor: '#084954',
            nextScreen: 'Home',
          }}
          component={DummyScreen}
        />
      </Tab.Navigator>
    </>
  );
};

export default MaterialRTLScreen;

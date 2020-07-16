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

const createMaterialScreen = (
  animation: 'iconWithLabel' | 'iconOnly' | 'iconWithLabelOnFocus'
) => {
  return () => {
    return (
      <>
        <StatusBar barStyle="light-content" />
        <Tab.Navigator
          tabBar={props => (
            <AnimatedTabBar
              preset="material"
              animation={animation}
              iconSize={20}
              tabs={tabs}
              duration={500}
              {...props}
            />
          )}
        >
          <Tab.Screen
            name="Home"
            initialParams={{
              backgroundColor: '#2D1B5B',
              nextScreen: 'Likes',
            }}
            component={DummyScreen}
          />
          <Tab.Screen
            name="Likes"
            initialParams={{
              backgroundColor: '#641B4E',
              nextScreen: 'Search',
            }}
            component={DummyScreen}
          />
          <Tab.Screen
            name="Search"
            initialParams={{
              backgroundColor: '#72540C',
              nextScreen: 'Profile',
            }}
            component={DummyScreen}
          />
          <Tab.Screen
            name="Profile"
            initialParams={{
              backgroundColor: '#084954',
              nextScreen: 'Home',
            }}
            component={DummyScreen}
          />
        </Tab.Navigator>
      </>
    );
  };
};

export const MaterialIconWithLabelScreen = createMaterialScreen(
  'iconWithLabel'
);
export const MaterialIconWithLabelOnFocusScreen = createMaterialScreen(
  'iconWithLabelOnFocus'
);
export const MaterialIconOnlyScreen = createMaterialScreen('iconOnly');

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
      color: 'white',
    },
    icon: {
      component: HomeSVG,
      color: '#444',
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
  },
  Search: {
    labelStyle: {
      color: 'white',
    },
    icon: {
      component: SearchSVG,
      color: '#444',
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
        <AnimatedTabBar
          preset="flashy"
          duration={1000}
          tabs={tabs}
          iconSize={20}
          itemInnerSpace={24}
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
          backgroundColor: '#000',
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
        }}
        component={DummyScreen}
      />
    </Tab.Navigator>
  );
};

export default FlashyStyledScreen;

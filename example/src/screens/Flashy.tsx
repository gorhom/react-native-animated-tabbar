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
      color: '#5B37B7',
    },
    icon: {
      component: HomeSVG,
      color: 'rgba(91,55,183,0.5)',
    },
  },
  Likes: {
    labelStyle: {
      color: '#C9379D',
    },
    icon: {
      component: LikeSVG,
      color: 'rgba(201,55,157,0.5)',
    },
  },
  Search: {
    labelStyle: {
      color: '#E6A919',
    },
    icon: {
      component: SearchSVG,
      color: 'rgba(230,169,25,0.5)',
    },
  },
  Profile: {
    labelStyle: {
      color: '#1194AA',
    },
    icon: {
      component: ProfileSVG,
      color: 'rgba(17,148,170,0.5)',
    },
  },
};

const FlashyScreen = () => {
  return (
    <Tab.Navigator
      tabBar={props => (
        <AnimatedTabBar
          preset="flashy"
          duration={1000}
          tabs={tabs}
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

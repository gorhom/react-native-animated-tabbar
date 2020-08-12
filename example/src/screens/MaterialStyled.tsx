import React, { useMemo } from 'react';
import { StatusBar } from 'react-native';
import { useSafeArea } from 'react-native-safe-area-context';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AnimatedTabBar, {
  TabsConfig,
  MaterialTabBarItemConfig,
} from '@gorhom/animated-tabbar';
import DummyScreen from './Dummy';
import HomeIcon from '../components/iconWithBadge';
import LikeSVG from '../svg/LikeSVG';
import SearchSVG from '../svg/SearchSVG';
import ProfileSVG from '../svg/ProfileSVG';
import { MainTabsParams } from './types';

const Tab = createBottomTabNavigator<MainTabsParams>();

const tabs: TabsConfig<MaterialTabBarItemConfig, MainTabsParams> = {
  Home: {
    icon: {
      component: HomeIcon,
      color: 'rgba(255,255,255,1)',
    },
    ripple: {
      color: '#000',
    },
  },
  Likes: {
    icon: {
      component: LikeSVG,
      color: 'rgba(255,255,255,1)',
    },
    ripple: {
      color: '#333',
    },
  },
  Search: {
    icon: {
      component: SearchSVG,
      color: 'rgba(255,255,255,1)',
    },
    ripple: {
      color: '#000',
    },
  },
  Profile: {
    icon: {
      component: ProfileSVG,
      color: 'rgba(255,255,255,1)',
    },
    ripple: {
      color: '#333',
    },
  },
};

const MaterialStyledScreen = () => {
  // hooks
  const { bottom } = useSafeArea();

  // memos
  const screenPaddingBottom = useMemo(() => {
    // icon size + margin padding + outer space + inner space + screen bottom padding
    return 20 + bottom + 12 * 2 + 12 * 2 + 12;
  }, [bottom]);

  const tabBarOptions = useMemo(
    () => ({
      safeAreaInsets: {
        bottom: 0,
      },
      style: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        borderRadius: 16,
        marginLeft: 32,
        marginRight: 32,
        marginBottom: bottom,
        backgroundColor: '#000',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 12,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.0,

        elevation: 24,
      },
    }),
    [bottom]
  );
  return (
    <>
      <StatusBar barStyle="light-content" />
      <Tab.Navigator
        tabBarOptions={tabBarOptions}
        tabBar={props => (
          <AnimatedTabBar
            preset="material"
            animation="iconWithLabelOnFocus"
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
            backgroundColor: '#000',
            nextScreen: 'Likes',
            paddingBottom: screenPaddingBottom,
          }}
          component={DummyScreen}
        />
        <Tab.Screen
          name="Likes"
          initialParams={{
            backgroundColor: '#000',
            nextScreen: 'Search',
            paddingBottom: screenPaddingBottom,
          }}
          component={DummyScreen}
        />
        <Tab.Screen
          name="Search"
          initialParams={{
            backgroundColor: '#000',
            nextScreen: 'Profile',
            paddingBottom: screenPaddingBottom,
          }}
          component={DummyScreen}
        />
        <Tab.Screen
          name="Profile"
          initialParams={{
            backgroundColor: '#000',
            nextScreen: 'Home',
            paddingBottom: screenPaddingBottom,
          }}
          component={DummyScreen}
        />
      </Tab.Navigator>
    </>
  );
};

export default MaterialStyledScreen;

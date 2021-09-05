import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
// import Animated from 'react-native-reanimated';
import type { AnimatedTabBarItem } from '../../types';

// import type { AnimateTabBarContainerProps } from './types'

interface AnimateTabBarContainerProps {
  data: AnimatedTabBarItem[];
}

const AnimateTabBarContainer = ({ data }: AnimateTabBarContainerProps) => {
  return (
    <View style={styles.container}>
      {data.map(({ label }) => (
        <Text>{label}</Text>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'red',
    padding: 64,
  },
});

export default AnimateTabBarContainer;

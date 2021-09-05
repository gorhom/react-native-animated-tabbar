import React from 'react';
import { StyleSheet, View } from 'react-native';
import { AnimatedTabBarContainer } from '@gorhom/animated-tabbar-core';

const data = [
  {
    label: 'Home',
  },
];

const App = () => {
  return (
    <View style={styles.container}>
      <AnimatedTabBarContainer data={data} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;

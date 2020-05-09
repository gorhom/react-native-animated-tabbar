import React, { useMemo } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { useRoute, RouteProp } from '@react-navigation/native';
import { MainTabsParams } from './types';

const DummyScreen = () => {
  const { name, params } = useRoute<RouteProp<MainTabsParams, 'Home'>>();
  const containerStyle = useMemo(
    () => [
      styles.container,
      // @ts-ignore
      { backgroundColor: params?.backgroundColor || 'white' },
    ],
    [params]
  );
  // @ts-ignore
  const screeName = useMemo(() => params?.name || name, [params, name]);
  return (
    <View style={containerStyle}>
      <Text style={styles.text}>{screeName}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 43,
    fontWeight: '600',
    textTransform: 'uppercase',
    color: 'white',
  },
});

export default DummyScreen;

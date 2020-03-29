import React, { useMemo } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { useRoute } from '@react-navigation/native';

const DummyScreen = () => {
  const { name, params } = useRoute();
  const containerStyle = useMemo(
    () => [
      styles.container,
      // @ts-ignore
      { backgroundColor: params?.backgroundColor || 'white' },
    ],
    [params]
  );
  return (
    <View style={containerStyle}>
      <Text style={styles.text}>{name}</Text>
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

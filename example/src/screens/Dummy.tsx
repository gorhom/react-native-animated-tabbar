import React, { useMemo, useRef, useEffect, useCallback } from 'react';
import { Text, View, StyleSheet, Dimensions, Button } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import {
  useRoute,
  RouteProp,
  useScrollToTop,
  useNavigation,
} from '@react-navigation/native';
import { MainTabsParams } from './types';
import { Alert } from 'react-native';

const DummyScreen = () => {
  // scroll event
  const scrollViewRef = useRef(null);
  useScrollToTop(scrollViewRef);

  // route name
  const { name, params } = useRoute<RouteProp<MainTabsParams, 'Home'>>();
  const screeName = useMemo(() => params?.name || name, [params, name]);

  const { navigate, addListener } = useNavigation();

  // style
  const rootStyle = useMemo(
    () => [
      styles.root,
      {
        backgroundColor: params?.backgroundColor || 'white',
      },
    ],
    [params]
  );

  // effects
  useEffect(() => {
    // @ts-ignore
    const unsubscribe = addListener('tabLongPress', () => {
      // Do something
      Alert.alert(screeName, 'Long Press !');
    });

    return unsubscribe;
  }, [addListener, screeName]);

  // callbacks
  const handleNextScreenPress = useCallback(() => {
    navigate(params.nextScreen);
  }, [navigate, params]);
  return (
    <ScrollView style={rootStyle} ref={scrollViewRef}>
      <View style={styles.container}>
        <Text style={styles.text}>{screeName}</Text>
        <Button
          title={`navigate to ${params.nextScreen}`}
          color="white"
          onPress={handleNextScreenPress}
        />
      </View>
      <View style={styles.container}>
        <Text style={styles.text}>{screeName}</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: Dimensions.get('screen').height,
  },
  text: {
    fontSize: 43,
    fontWeight: '600',
    textTransform: 'uppercase',
    color: 'white',
  },
});

export default DummyScreen;

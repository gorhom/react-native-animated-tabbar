import React, { useMemo, useRef, useEffect, useCallback } from 'react';
import { Text, View, StyleSheet, Alert } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import {
  useRoute,
  RouteProp,
  useScrollToTop,
  useNavigation,
} from '@react-navigation/native';
import Button from '../components/button';
import { MainTabsParams } from './types';
import { useSafeArea } from 'react-native-safe-area-context';

const data = Array(20)
  .fill(0)
  .map((item, index) => ({
    id: `item-${index}`,
    title: `Item ${index}`,
  }));

const DummyScreen = () => {
  // safe area
  const { top } = useSafeArea();

  // scroll event
  const flatlistRef = useRef(null);
  useScrollToTop(flatlistRef);

  // route name
  const { name, params } = useRoute<RouteProp<MainTabsParams, 'Home'>>();
  const screeName = useMemo(() => params?.name || name, [params, name]);
  const paddingBottom = useMemo(() => params?.paddingBottom || 0, [params]);
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
  const contentContainerStyle = useMemo(
    () => [
      styles.flatlistContainer,
      {
        paddingBottom,
      },
    ],
    [paddingBottom]
  );
  const headerStyle = useMemo(
    () => [
      styles.header,
      {
        paddingTop: top,
        backgroundColor: params?.backgroundColor || 'white',
      },
    ],
    [params, top]
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

  // renders
  const renderHeader = () => (
    <View style={headerStyle}>
      <Text style={styles.text}>{screeName}</Text>
      <Button
        label={`navigate to ${params.nextScreen}`}
        onPress={handleNextScreenPress}
      />
    </View>
  );
  const renderItem = ({ item }: any) => (
    <View key={item.id} style={styles.item}>
      <Text>{item.title}</Text>
    </View>
  );
  return (
    <FlatList
      ref={flatlistRef}
      data={data}
      stickyHeaderIndices={[0]}
      ListHeaderComponent={renderHeader}
      renderItem={renderItem}
      style={rootStyle}
      contentContainerStyle={contentContainerStyle}
    />
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  flatlistContainer: {
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  header: {
    paddingVertical: 24,
    alignItems: 'flex-start',
  },
  text: {
    fontSize: 43,
    fontWeight: '600',
    textTransform: 'uppercase',
    color: 'white',
  },
  item: {
    paddingHorizontal: 12,
    paddingVertical: 24,
    marginVertical: 6,
    borderRadius: 2,
    backgroundColor: '#eee',
  },
});

export default DummyScreen;

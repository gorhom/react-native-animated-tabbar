import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  root: {
    ...StyleSheet.absoluteFillObject,
  },
  container: {
    overflow: 'hidden',
    flex: 1,
  },
  contentContainer: {},
  iconContainer: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {},
  labelContainer: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    color: '#000',
    fontSize: 14,
    fontWeight: '600',
  },
  mask: {
    backgroundColor: 'white',
    position: 'absolute',
  },
  indicator: {
    position: 'absolute',
    width: 6,
    height: 6,
    borderRadius: 8,
  }
});

import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  root: {
    ...StyleSheet.absoluteFillObject,
  },
  outerContainer: {
    // overflow: 'hidden',
  },
  container: {
    alignSelf: 'center',
  },
  iconContainer: {
    position: 'absolute',
    alignSelf: 'center',
    top: '50%',
    justifyContent: 'center',
  },
  icon: {},
  labelContainer: {
    position: 'absolute',
    alignSelf: 'center',
    top: '50%',
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
  },
});

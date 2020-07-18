import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  outerContainer: {
    alignItems: 'center',
  },
  innerContainer: {},
  iconContainer: {
    alignSelf: 'center',
  },
  labelContainer: {
    position: 'absolute',
    alignSelf: 'flex-end',
    justifyContent: 'center',
    top: 0,
    bottom: 0,
  },
  label: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
});

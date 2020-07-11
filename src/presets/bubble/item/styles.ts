import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {},
  contentContainer: {},
  iconContainer: {
    alignSelf: 'flex-start',
    alignItems: 'center',
    justifyContent: 'center',
  },
  labelContainer: {
    position: 'absolute',
    alignSelf: 'flex-end',
    justifyContent: 'center',
    top: 0,
    bottom: 0,
  },
  label: {
    color: '#000',
    fontSize: 14,
    fontWeight: '600',
  },
});

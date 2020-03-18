import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    padding: 12,
  },
  contentContainer: {
    borderRadius: 144,
    padding: 12,
  },
  iconContainer: {
    alignSelf: 'flex-start',
    minHeight: 24,
    minWidth: 24,
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

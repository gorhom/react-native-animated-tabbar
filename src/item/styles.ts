import { StyleSheet } from 'react-native';
import { DEFAULT_ITEM_ICON_SIZE } from './constants';

export const styles = StyleSheet.create({
  container: {},
  contentContainer: {},
  iconContainer: {
    alignSelf: 'flex-start',
    minHeight: DEFAULT_ITEM_ICON_SIZE,
    minWidth: DEFAULT_ITEM_ICON_SIZE,
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

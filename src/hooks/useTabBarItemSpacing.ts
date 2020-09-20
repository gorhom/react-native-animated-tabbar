import { useMemo } from 'react';
import type { Space } from '../types';

export const useTabBarItemSpacing = (
  itemInnerSpace: Space | number | undefined,
  itemOuterSpace: Space | number | undefined,
  DEFAULT_ITEM_INNER_SPACE: number,
  DEFAULT_ITEM_OUTER_SPACE: number
) => {
  const spacing = useMemo(() => {
    let _itemInnerVerticalSpace,
      _itemInnerHorizontalSpace,
      _itemOuterVerticalSpace,
      _itemOuterHorizontalSpace = 0;

    if (typeof itemInnerSpace === 'number') {
      _itemInnerVerticalSpace = itemInnerSpace;
      _itemInnerHorizontalSpace = itemInnerSpace;
    } else {
      _itemInnerVerticalSpace =
        itemInnerSpace?.vertical ?? DEFAULT_ITEM_INNER_SPACE;
      _itemInnerHorizontalSpace =
        itemInnerSpace?.horizontal ?? DEFAULT_ITEM_INNER_SPACE;
    }
    if (typeof itemOuterSpace === 'number') {
      _itemOuterVerticalSpace = itemOuterSpace;
      _itemOuterHorizontalSpace = itemOuterSpace;
    } else {
      _itemOuterVerticalSpace =
        itemOuterSpace?.vertical ?? DEFAULT_ITEM_OUTER_SPACE;
      _itemOuterHorizontalSpace =
        itemOuterSpace?.horizontal ?? DEFAULT_ITEM_OUTER_SPACE;
    }
    return {
      innerVerticalSpace: _itemInnerVerticalSpace,
      innerHorizontalSpace: _itemInnerHorizontalSpace,
      outerVerticalSpace: _itemOuterVerticalSpace,
      outerHorizontalSpace: _itemOuterHorizontalSpace,
    };
  }, [
    itemInnerSpace,
    itemOuterSpace,
    DEFAULT_ITEM_INNER_SPACE,
    DEFAULT_ITEM_OUTER_SPACE,
  ]);

  return spacing;
};

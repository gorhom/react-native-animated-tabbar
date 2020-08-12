import React, { memo } from 'react';
import HomeSVG from '../../svg/HomeSVG';
import Badge from '../badge';
import { SVGProps } from '../../svg/types';

const IconWithBadgeComponent = (props: SVGProps) => {
  return (
    <>
      <HomeSVG {...props} />
      <Badge iconSize={props.size} />
    </>
  );
};

const IconWithBadge = memo(IconWithBadgeComponent);

export default IconWithBadge;

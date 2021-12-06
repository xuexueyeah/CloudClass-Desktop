import { FC } from 'react';
import { BaseProps } from '~ui-kit/components/interface/base-props';

import './index.css';

import { getPath, getViewBox } from './svg-dict';

import classnames from 'classnames';

export type SvgImgProps = BaseProps & {
  type: string;
  color?: string;
  size?: number;
  prefixClass?: string;
  canHover?: boolean;
  onClick?: any;
};

export const SvgImg: FC<SvgImgProps> = ({
  type,
  size = 25,
  prefixClass = 'prefix',
  canHover = false,
  onClick,
  className,
  style,
  color,
}) => {
  const cls = classnames({
    [`svg-img`]: 1,
    [`${prefixClass}-${type}`]: 1,
    [`can-hover`]: canHover,
    [`${className}`]: !!className,
  });
  return (
    <svg
      className={cls}
      width={size}
      height={size}
      viewBox={getViewBox(type)}
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      onClick={onClick}
      style={style}>
      {getPath(type, { className: type, color })}
    </svg>
  );
};

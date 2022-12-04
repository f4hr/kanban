import React from 'react';
import cn from 'classnames';

import './ThemeIcon.css';

interface ThemeIconProps extends React.HTMLAttributes<HTMLElement> {
  variant?: 'filled' | 'light' | 'outline';
  size?: 'sm' | 'md';
  radius?: 'sm' | 'md';
}

export function ThemeIcon({
  className,
  children,
  variant = 'filled',
  size = 'md',
  radius = 'md',
  ...props
}: ThemeIconProps) {
  const sizeClass = `theme-icon--size-${size}`;
  const variantClass = `theme-icon--variant-${variant}`;
  const radiusClass = `theme-icon--radius-${radius}`;
  const iconClasses = cn('theme-icon', className, {
    [sizeClass]: size,
    [variantClass]: variant,
    [radiusClass]: radius,
  });
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <div className={iconClasses} {...props}>
      {children}
    </div>
  );
}

ThemeIcon.defaultProps = {
  variant: 'filled',
  size: undefined,
  radius: 'md',
};

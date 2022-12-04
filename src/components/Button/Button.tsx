import React, { LegacyRef } from 'react';
import cn from 'classnames';

import './Button.css';

export const ButtonDefaultType = 'button' as const;
export type ButtonDefaultAsType = typeof ButtonDefaultType;

export type ButtonOwnProps<E extends React.ElementType> = {
  children: React.ReactNode;
  as?: E;
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: React.ReactNode;
  fullWidth?: boolean;
  iconPos?: 'left' | 'right';
};

export type ButtonProps<E extends React.ElementType> = ButtonOwnProps<E> &
  Omit<React.ComponentProps<E>, keyof ButtonOwnProps<E>>;

type ButtonVariant = 'action-icon' | 'main' | 'outline' | 'unstyled' | 'menu-item';
type ButtonSize = 'sm' | 'md';

export const Button = React.forwardRef(
  <E extends React.ElementType = ButtonDefaultAsType>(
    {
      as,
      className,
      children,
      variant = 'main',
      size = 'md',
      icon,
      fullWidth,
      iconPos,
      type,
      ...props
    }: ButtonProps<E>,
    ref: LegacyRef<HTMLButtonElement>,
  ) => {
    const Component = as || ButtonDefaultType;
    const classNames = cn('btn', `btn--${variant}`, className, {
      'btn--icon-pos-left': variant !== 'action-icon' && icon && iconPos === 'left',
      'btn--icon-pos-right': variant !== 'action-icon' && icon && iconPos === 'right',
      'w-full': fullWidth,
      [`btn--${size}`]: variant !== 'unstyled',
    });

    return (
      <Component
        className={classNames}
        ref={ref}
        type={(Component === 'button' && type) || 'button'}
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...props}
      >
        {iconPos === 'left' ? icon : null}
        {children}
        {iconPos === 'right' ? icon : null}
      </Component>
    );
  },
);

Button.defaultProps = {
  as: 'button',
  icon: null,
  variant: 'main',
  size: 'md',
  fullWidth: false,
  iconPos: 'left',
};

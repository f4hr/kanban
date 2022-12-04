import React from 'react';
import cn from 'classnames';

import './BaseInput.css';

export interface BaseInputProps extends React.ComponentPropsWithoutRef<'input'> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
  labelHidden?: boolean;
}

export const BaseInput = React.forwardRef<HTMLInputElement, BaseInputProps>(
  ({ id, className, label, error, icon, labelHidden, ...props }, ref) => {
    const wrapperClasses = cn('input__wrapper', {
      'input__wrapper--w-icon': icon != null,
    });
    const labelClasses = cn({
      'sr-only': labelHidden,
    });
    const inputClasses = cn('input__input', className, {
      'input__input--invalid': error,
    });

    return (
      <div className="input__wrapper-root">
        {label ? (
          <label className={labelClasses} htmlFor={id}>
            {label}
          </label>
        ) : null}
        <div className={wrapperClasses}>
          <input
            id={id}
            className={inputClasses}
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...props}
            ref={ref}
          />
          {icon ? (
            <span className="input__icon-wrapper" role="presentation">
              {icon}
            </span>
          ) : null}
        </div>
        {error ? (
          <p className="input__error" role="alert">
            {error}
          </p>
        ) : null}
      </div>
    );
  },
);

BaseInput.defaultProps = {
  label: undefined,
  error: undefined,
  icon: null,
  labelHidden: false,
};

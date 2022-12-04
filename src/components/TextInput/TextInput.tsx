import React from 'react';
import cn from 'classnames';

import './TextInput.css';
// Components
import { BaseInput } from '../BaseInput';
// Types
import type { BaseInputProps } from '../BaseInput';

interface TextInputProps extends BaseInputProps {
  variant?: 'main' | 'unstyled';
}

export const TextInput = React.forwardRef<HTMLInputElement, TextInputProps>(
  ({ className, variant, ...props }, ref) => {
    const classNames = cn(className, {
      'input__input--text': variant === 'main',
      'input__input--text-unstyled': variant === 'unstyled',
    });

    return (
      <BaseInput
        className={classNames}
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...props}
        type="text"
        ref={ref}
      />
    );
  },
);

TextInput.defaultProps = {
  variant: 'main',
};

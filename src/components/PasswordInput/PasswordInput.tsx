import React, { useState } from 'react';
import cn from 'classnames';
import { IconEye, IconEyeOff } from '@tabler/icons';

// Components
import { BaseInput } from '../BaseInput';
import { Button } from '../Button';
// Types
import type { BaseInputProps } from '../BaseInput';

export const PasswordInput = React.forwardRef<HTMLInputElement, BaseInputProps>(
  ({ className, ...props }, ref) => {
    const [isMasked, setIsMasked] = useState<boolean>(true);

    const inputType = isMasked ? 'password' : 'text';
    const toggleTitle = isMasked ? 'Show password' : 'Hide password';
    const icon = isMasked ? <IconEye size={16} /> : <IconEyeOff size={16} />;

    const classNames = cn('input__input--text', className);

    return (
      <div>
        <BaseInput
          className={classNames}
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...props}
          type={inputType}
          icon={
            <Button
              className="input__icon"
              variant="action-icon"
              title={toggleTitle}
              onClick={() => setIsMasked(!isMasked)}
              icon={icon}
              type="button"
            />
          }
          ref={ref}
        />
      </div>
    );
  },
);

PasswordInput.defaultProps = {
  label: undefined,
};

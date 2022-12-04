import React from 'react';
import * as RadioGroupBase from '@radix-ui/react-radio-group';
import cn from 'classnames';

import type {
  RadioGroupProps as RadioGroupBaseProps,
  RadioGroupItemProps as RadioGroupItemBaseProps,
  RadioGroupIndicatorProps as RadioGroupIndicatorBaseProps,
} from '@radix-ui/react-radio-group';

import './RadioGroup.css';

export function RadioGroup({ className, children, ...props }: RadioGroupBaseProps) {
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <RadioGroupBase.Root className={cn('radio-group', className)} {...props}>
      <ul className="radio-group__list">{children}</ul>
    </RadioGroupBase.Root>
  );
}

interface RadioGroupItemProps extends RadioGroupItemBaseProps {
  label?: string;
}

function RadioGroupItem({ id, value, label, children, ...props }: RadioGroupItemProps) {
  return (
    <li>
      <RadioGroupBase.Item
        id={id}
        className="radio-group__input"
        value={value}
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...props}
        aria-label={value}
      >
        {children}
      </RadioGroupBase.Item>
      {label ? <label htmlFor={id}>{label}</label> : null}
    </li>
  );
}

RadioGroupItem.defaultProps = {
  label: undefined,
};

function RadioGroupIndicator({ children, ...props }: RadioGroupIndicatorBaseProps) {
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <RadioGroupBase.Indicator className="radio-group__indicator" {...props}>
      {children}
    </RadioGroupBase.Indicator>
  );
}

RadioGroup.Item = RadioGroupItem;
RadioGroup.Indicator = RadioGroupIndicator;

import React from 'react';
import * as SeparatorBase from '@radix-ui/react-separator';
import cn from 'classnames';

import './Separator.css';

interface SeparatorProps {
  className?: string;
}

export function Separator({ className }: SeparatorProps) {
  const classNames = cn('separator', className);

  return <SeparatorBase.Root className={classNames} />;
}

Separator.defaultProps = {
  className: undefined,
};

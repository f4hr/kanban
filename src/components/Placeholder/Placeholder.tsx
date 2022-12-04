import React, { useMemo } from 'react';
import cn from 'classnames';

import './Placeholder.css';

interface PlaceholderProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export function Placeholder({ className, children, ...props }: PlaceholderProps) {
  const classNames = useMemo(() => cn('placeholder', className), [className]);

  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <div className={classNames} {...props}>
      {children}
    </div>
  );
}

Placeholder.defaultProps = {
  className: undefined,
};

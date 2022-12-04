import React from 'react';
import cn from 'classnames';

import './Code.css';

interface CodeProps extends React.PropsWithChildren {
  className?: string;
}

export function Code({ className, children }: CodeProps) {
  return (
    <code className={cn('code', className)} role="code">
      {children}
    </code>
  );
}

Code.defaultProps = {
  className: undefined,
};

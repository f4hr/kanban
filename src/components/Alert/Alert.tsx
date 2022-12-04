import React from 'react';
import cn from 'classnames';

import './Alert.css';

export type AlertType = 'info' | 'danger' | 'success';

interface AlertProps extends React.HTMLAttributes<HTMLElement> {
  icon?: React.ReactNode;
  type?: AlertType;
}

export const COLOR_CLASSES: { [key: string]: { bg: string; text: string } } = {
  info: {
    bg: 'bg-info-50 dark:bg-info-400/20',
    text: 'text-info-500',
  },
  danger: {
    bg: 'bg-danger-50 dark:bg-danger-400/20',
    text: 'text-danger-500',
  },
  success: {
    bg: 'bg-success-50 dark:bg-success-400/20',
    text: 'text-success-500',
  },
};

const getColorClasses = (alertType: AlertType) => COLOR_CLASSES[alertType];

export function Alert({ className, icon, title, children, type = 'info', ...props }: AlertProps) {
  const colorClasses = getColorClasses(type);
  const containerClasses = cn('alert', className, colorClasses.bg);
  const iconClasses = cn('alert__icon', colorClasses.text);
  const titleClasses = cn('alert__title', colorClasses.text);

  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <div className={containerClasses} {...props}>
      <div className="alert__wrapper">
        {icon ? (
          <div className={iconClasses} role="presentation">
            {icon}
          </div>
        ) : null}
        <div className="alert__body">
          <span className={titleClasses}>{title}</span>
          <p className="alert__message">{children}</p>
        </div>
      </div>
    </div>
  );
}

Alert.defaultProps = {
  icon: null,
  type: 'info',
};

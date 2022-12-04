import React from 'react';
import cn from 'classnames';

import './CommonUserForm.css';

/**
 * Header
 */
interface CommonUserFormHeaderProps extends React.PropsWithChildren {
  className?: string;
}
function CommonUserFormHeader({ className, children }: CommonUserFormHeaderProps) {
  const classNames = cn('user-form__header', className);

  return <div className={classNames}>{children}</div>;
}
CommonUserFormHeader.defaultProps = {
  className: undefined,
};

/**
 * Form
 */
interface CommonUserFormFormProps extends React.PropsWithChildren {
  id?: string;
  className?: string;
  handleSubmit: (e?: React.FormEvent<HTMLFormElement>) => Promise<void>;
}
function CommonUserFormForm({ id, className, children, handleSubmit }: CommonUserFormFormProps) {
  const classNames = cn('user-form__main', className);

  return (
    <div className={classNames}>
      <form
        id={id}
        onSubmit={(e) => {
          handleSubmit(e).catch(() => {});
        }}
      >
        <ul>{children}</ul>
      </form>
    </div>
  );
}
CommonUserFormForm.defaultProps = {
  id: undefined,
  className: undefined,
};

/**
 * Item
 */
interface CommonUserFormItemProps extends React.PropsWithChildren {
  className?: string;
}
function CommonUserFormItem({ className, children }: CommonUserFormItemProps) {
  return <li className={className}>{children}</li>;
}
CommonUserFormItem.defaultProps = {
  className: undefined,
};

/**
 * Footer
 */
interface CommonUserFormFooterProps extends React.PropsWithChildren {
  className?: string;
}
function CommonUserFormFooter({ className, children }: CommonUserFormFooterProps) {
  const classNames = cn('user-form__footer', className);

  return <div className={classNames}>{children}</div>;
}
CommonUserFormFooter.defaultProps = {
  className: undefined,
};

/**
 * Container
 */
export interface CommonUserFormProps extends React.PropsWithChildren {
  className?: string;
}
export function CommonUserForm({ className, children }: CommonUserFormProps) {
  const containerClasses = cn('user-form__container', className);

  return <div className={containerClasses}>{children}</div>;
}
CommonUserForm.defaultProps = {
  className: undefined,
};

CommonUserForm.Header = CommonUserFormHeader;
CommonUserForm.Form = CommonUserFormForm;
CommonUserForm.Item = CommonUserFormItem;
CommonUserForm.Footer = CommonUserFormFooter;

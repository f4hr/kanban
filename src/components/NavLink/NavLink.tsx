import React from 'react';
import { useRoute, Link } from 'wouter';

interface NavLinkProps
  extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href' | 'className'> {
  to: string;
  className?: string | ((props: { isActive: boolean }) => string | undefined);
}

export function NavLink({ className: classNameProp, ...props }: NavLinkProps) {
  const { to, children } = props;
  const [isActive] = useRoute(to);

  const className =
    typeof classNameProp === 'function'
      ? classNameProp({ isActive })
      : [classNameProp, isActive ? 'active' : null].filter(Boolean).join(' ');

  return (
    <Link to={to}>
      {/* "href" prop is passed by Link component */}
      {/* eslint-disable-next-line jsx-a11y/anchor-is-valid, react/jsx-props-no-spreading */}
      <a className={className} {...props}>
        {children}
      </a>
    </Link>
  );
}

NavLink.defaultProps = {
  className: undefined,
};

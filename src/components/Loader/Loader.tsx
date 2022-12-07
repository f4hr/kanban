import React from 'react';

import './Loader.css';
// Hooks
import { useTheme } from '../../hooks';

interface LoaderProps extends React.HTMLAttributes<SVGElement> {
  size?: 'xs' | 'sm' | 'md';
  color?: string;
}

export function Loader({ size = 'md', color, ...props }: LoaderProps) {
  const {
    theme: { colors },
  } = useTheme();
  const sizes = {
    xs: '18px',
    sm: '22px',
    md: '36px',
  };
  const stroke = color ?? colors.accent[600];

  return (
    <span className="loader">
      <svg
        width={sizes[size]}
        height={sizes[size]}
        viewBox="0 0 38 38"
        xmlns="http://www.w3.org/2000/svg"
        stroke={stroke}
        role="presentation"
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...props}
      >
        <g fill="none" fillRule="evenodd">
          <g transform="translate(2.5 2.5)" strokeWidth="5">
            <circle strokeOpacity=".5" cx="16" cy="16" r="16" />
            <path d="M32 16c0-9.94-8.06-16-16-16">
              <animateTransform
                attributeName="transform"
                type="rotate"
                from="0 16 16"
                to="360 16 16"
                dur="1s"
                repeatCount="indefinite"
              />
            </path>
          </g>
        </g>
      </svg>
    </span>
  );
}

Loader.defaultProps = {
  size: 'md',
  color: undefined,
};

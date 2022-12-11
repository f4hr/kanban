import React, { useMemo, useRef, useState } from 'react';
import cn from 'classnames';
import { IconUserCircle } from '@tabler/icons';

import './Avatar.css';
// Hooks
import { useTheme } from '../../hooks';
// Types
import { Status } from '../../types';

interface AvatarPlaceholderProps extends React.PropsWithChildren {
  theme: ReturnType<typeof useTheme>;
  color?: string;
}

function AvatarPlaceholder({ children, color = 'main', theme }: AvatarPlaceholderProps) {
  const {
    theme: { colors },
    isDark,
  } = theme;

  const style = useMemo<{ backgroundColor: string; color: string }>(
    () => ({
      backgroundColor: colors[color][isDark ? '900' : '100'],
      color: colors[color][isDark ? '300' : '600'],
    }),
    [color, colors, isDark],
  );

  return (
    <span className="avatar__placeholder" style={style} role="presentation">
      {children ?? <IconUserCircle stroke={1.5} />}
    </span>
  );
}

AvatarPlaceholder.defaultProps = {
  color: 'main',
};

interface AvatarProps extends React.PropsWithChildren {
  className?: string;
  color?: string;
  src?: string;
  alt?: string;
}

export function Avatar({ className, children, src, alt = 'avatar', color }: AvatarProps) {
  const [state, setState] = useState<Status>('idle');
  const imgRef = useRef<HTMLImageElement>(null);
  const theme = useTheme();

  const classNames = cn('avatar', className, {});

  const isValid = state === 'idle' || state === 'success';

  return (
    <div className={classNames}>
      {src && isValid ? (
        <img
          ref={imgRef}
          className="avatar__image"
          src={src}
          alt={alt}
          onLoad={() => setState('success')}
          onError={() => setState('error')}
        />
      ) : null}
      {!src || !isValid ? (
        <AvatarPlaceholder color={color} theme={theme}>
          {children}
        </AvatarPlaceholder>
      ) : null}
    </div>
  );
}

Avatar.defaultProps = {
  className: undefined,
  color: undefined,
  src: undefined,
  alt: '',
};

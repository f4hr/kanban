import React from 'react';
import { useLocation } from 'wouter';
import cn from 'classnames';

import './UserButton.css';
// Utils
import { useUserQuery } from './queries';
import routes from '../../routes';
// Components
import { Avatar, Button, Placeholder } from '../../components';
import { useToast } from '../../hooks';

interface UserButtonProps extends React.HTMLAttributes<HTMLElement> {
  userId?: string;
  image?: string;
  color?: string;
}

export function UserButton({ className, userId, image, color, ...props }: UserButtonProps) {
  const toast = useToast();
  const [, setLocation] = useLocation();

  // Queries
  const { status, data: user } = useUserQuery(userId, {
    onError() {
      toast.show({ type: 'error', title: 'Error', description: 'Failed to load user details' });
    },
  });

  if (status !== 'success' || !user) {
    return (
      <Button
        className={cn('user-button', className)}
        variant="unstyled"
        onClick={() => setLocation(routes.accountPath())}
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...props}
      >
        <div className="user-button__content">
          <Avatar className="mr-1 text-main-400" color={color} />
          <div className="flex-1 mr-1">
            <Placeholder className="w-2/3 h-5 mb-2" title="Loading user data..." />
            <Placeholder className="w-full h-3" />
          </div>
        </div>
      </Button>
    );
  }

  return (
    <Button
      className={cn('user-button', className)}
      variant="unstyled"
      onClick={() => setLocation(routes.accountPath())}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
    >
      <div className="user-button__content">
        <Avatar className="mr-2 text-main-400" src={image} color={color} />
        <div className="flex-1 mr-1 text-left">
          <span className="block text-sm font-medium">{user.name}</span>
          <span className="block text-sm text-main-500">{user.email}</span>
        </div>
      </div>
    </Button>
  );
}

UserButton.defaultProps = {
  userId: undefined,
  image: null,
  color: 'gray',
};

import React from 'react';
import { Link } from 'wouter';

// Utils
import routes from '../../routes';
// Components
import { Button } from '../../components';

export function NoMatch() {
  return (
    <div className="pt-20 pb-20">
      <div className="relative">
        <div className="md:pt-60 text-center">
          <h1 className="mb-5 text-4xl font-bold">Route not found</h1>
          <p className="text-xl text-main-400 max-w-lg mx-auto mb-4">
            Page you are trying to open does not exist. You may have mistyped the address, or the
            page has been moved to another URL.
          </p>
          <div className="flex justify-center">
            <Button as={Link} to={routes.dashboardPath()} size="md">
              Go to Dashboard
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

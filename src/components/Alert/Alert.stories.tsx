import React from 'react';
import { ComponentMeta } from '@storybook/react';

import { Alert } from './Alert';

export default {
  title: 'Components/Alert',
  component: Alert,
  parameters: {
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof Alert>;

export function Info() {
  return <Alert title="Info">description</Alert>;
}

export function Error() {
  return (
    <Alert type="danger" title="Error">
      description
    </Alert>
  );
}

export function Success() {
  return (
    <Alert type="success" title="Success">
      description
    </Alert>
  );
}

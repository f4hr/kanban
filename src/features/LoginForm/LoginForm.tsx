import React, { useId } from 'react';
import { useLocation, Link } from 'wouter';
import { useForm } from 'react-hook-form';
import { nopeResolver } from '@hookform/resolvers/nope';
import Nope from 'nope-validator';
import { IconAlertCircle } from '@tabler/icons';

import routes from '../../routes';
// Hooks
import { useLogin } from './mutations';
// Components
import { Button, TextInput, PasswordInput, Alert, Loader } from '../../components';
import { CommonUserForm } from '../../components/CommonUserForm';

type FormValues = {
  form: string;
  email: string;
  password: string;
};

const schema = Nope.object().shape({
  email: Nope.string().email().required(),
  password: Nope.string().required(),
});

interface LoginFormProps {
  className?: string;
}

export function LoginForm({ className }: LoginFormProps) {
  const formId = useId();
  const [, setLocation] = useLocation();

  const form = useForm<FormValues>({
    mode: 'onSubmit',
    resolver: nopeResolver(schema),
  });
  const {
    handleSubmit,
    register,
    setError,
    clearErrors,
    formState: { isValid, isSubmitting, submitCount, errors },
  } = form;

  const { mutateAsync: login } = useLogin();

  const onLogin = async (payload: FormValues) =>
    login(payload)
      .then(() => setLocation(routes.homePath()))
      .catch((err: Error) => setError('form', { type: 'custom', message: err.message }));

  return (
    <CommonUserForm className={className}>
      <CommonUserForm.Header className="text-center">
        <h1 className="text-2xl font-bold">Log In</h1>
        <p className="mt-4 text-sm text-main-500 dark:text-main-400">
          Don&apos;t have an account yet?{' '}
          <Link
            className="text-accent-600 underline hover:text-accent-400"
            to={routes.signupPath()}
          >
            Create account
          </Link>
        </p>
      </CommonUserForm.Header>
      <CommonUserForm.Form
        id={`${formId}-form`}
        onSubmit={(e) => {
          handleSubmit(onLogin)(e).catch(() => {});
        }}
      >
        <CommonUserForm.Item>
          <TextInput
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...register('email', { onChange: () => clearErrors('form') })}
            id={`${formId}-email`}
            label="Email"
            placeholder="example@example.com"
            error={errors.email && errors.email.message}
          />
        </CommonUserForm.Item>
        <CommonUserForm.Item className="mt-3">
          <PasswordInput
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...register('password', { onChange: () => clearErrors('form') })}
            id={`${formId}-password`}
            label="Password"
            error={errors.password && errors.password.message}
          />
        </CommonUserForm.Item>
        {errors.form && errors.form.message ? (
          <CommonUserForm.Item>
            <Alert
              className="mt-4"
              icon={<IconAlertCircle size={16} />}
              title="Error!"
              type="danger"
            >
              {errors.form?.message}
            </Alert>
          </CommonUserForm.Item>
        ) : null}
        <CommonUserForm.Item className="mt-5">
          <Button
            className="text-center"
            form={`${formId}-form`}
            type="submit"
            variant="main"
            disabled={isSubmitting || (!isValid && submitCount > 0)}
            fullWidth
          >
            {isSubmitting ? <Loader className="stroke-white" size="sm" /> : 'Log In'}
          </Button>
        </CommonUserForm.Item>
      </CommonUserForm.Form>
    </CommonUserForm>
  );
}

LoginForm.defaultProps = {
  className: undefined,
};

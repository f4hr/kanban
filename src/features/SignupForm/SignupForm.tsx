import React, { useId } from 'react';
import { useLocation, Link } from 'wouter';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { IconAlertCircle } from '@tabler/icons';

// Utils
import routes from '../../routes';
// Hooks
import { useSignup } from './mutations';
// Components
import { Button, TextInput, PasswordInput, Alert, Loader } from '../../components';
import { CommonUserForm } from '../../components/CommonUserForm';
import { useToast } from '../../hooks';

type FormValues = {
  form: null;
  email: string;
  password: string;
  name: string;
};

const schema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().min(6).required(),
  name: yup.string().min(3).required(),
});

interface SignupFormProps {
  className?: string;
}

export function SignupForm({ className }: SignupFormProps) {
  const toast = useToast();
  const formId = useId();
  const [, setLocation] = useLocation();

  const form = useForm<FormValues>({
    mode: 'onSubmit',
    resolver: yupResolver(schema),
  });
  const {
    handleSubmit,
    register,
    setError,
    clearErrors,
    formState: { isValid, isSubmitting, submitCount, errors },
  } = form;

  const { mutateAsync: signup } = useSignup();

  const onSignup = async (payload: FormValues) =>
    signup(payload)
      .then(() => {
        setLocation(routes.loginPath());
        toast.show({
          type: 'success',
          title: 'Successful sign up',
          description: 'You can log in now',
        });
      })
      .catch((err: Error) => setError('form', { type: 'custom', message: err.message }));

  return (
    <CommonUserForm className={className}>
      <CommonUserForm.Header className="text-center">
        <h1 className="text-2xl font-bold">Sign Up</h1>
        <p className="mt-4 text-sm text-main-500 dark:text-main-400">
          Already have an account?{' '}
          <Link className="text-accent-600 underline hover:text-accent-400" to={routes.loginPath()}>
            Log in
          </Link>
        </p>
      </CommonUserForm.Header>
      <CommonUserForm.Form
        id={`${formId}-form`}
        onSubmit={(e) => {
          handleSubmit(onSignup)(e).catch(() => {});
        }}
      >
        <CommonUserForm.Item>
          <TextInput
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...register('email', { onChange: () => clearErrors('form') })}
            id={`${formId}-email`}
            label="E-mail"
            placeholder="Your e-mail"
            error={errors.email && errors.email.message}
          />
        </CommonUserForm.Item>
        <CommonUserForm.Item className="mt-3">
          <TextInput
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...register('name', { onChange: () => clearErrors('form') })}
            id={`${formId}-name`}
            label="Name"
            placeholder="Your name"
            error={errors.name && errors.name.message}
          />
        </CommonUserForm.Item>
        <CommonUserForm.Item className="mt-3">
          <PasswordInput
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...register('password', { onChange: () => clearErrors('form') })}
            id={`${formId}-password`}
            label="Password"
            placeholder="Your password"
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
            {isSubmitting ? <Loader className="stroke-white" size="sm" /> : 'Sign Up'}
          </Button>
        </CommonUserForm.Item>
      </CommonUserForm.Form>
    </CommonUserForm>
  );
}

SignupForm.defaultProps = {
  className: undefined,
};

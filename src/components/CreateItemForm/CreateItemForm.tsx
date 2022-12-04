import React, { useId } from 'react';
import { useForm } from 'react-hook-form';
import cn from 'classnames';

import './CreateItemForm.css';
// Hooks
import { useToast } from '../../hooks';
// Components
import { Button } from '../Button';
import { TextInput } from '../TextInput';

export interface CreateItemFormProps<T> extends React.HTMLAttributes<HTMLElement> {
  onCreateItem: (payload: string) => Promise<T>;
  placeholder?: string;
  submitText?: string;
  styles?: {
    formContainer?: string;
    input?: string;
    button?: string;
  };
}

type FormValues = {
  form: null;
  name: string;
};

export function CreateItemForm<TData>({
  onCreateItem,
  placeholder,
  submitText = 'Submit',
  styles,
}: CreateItemFormProps<TData>) {
  const toast = useToast();
  const formId = useId();
  const {
    register,
    handleSubmit,
    clearErrors,
    reset,
    formState: { isValid, isSubmitting },
  } = useForm<FormValues>({
    mode: 'onChange',
  });

  const onSubmit = ({ name }: FormValues) =>
    onCreateItem(name)
      .then(() => reset())
      .catch((err: Error) => {
        toast.show({ type: 'error', title: 'Error', description: err.message });
      });

  const containerClasses = cn('create-item-form', styles?.formContainer);

  return (
    <div className={containerClasses}>
      <form
        id={`${formId}-form`}
        onSubmit={(e) => {
          handleSubmit(onSubmit)(e).catch(() => {});
        }}
        action=""
      >
        <TextInput
          id={`${formId}-name`}
          className={cn('create-item-form__input', styles?.input)}
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...register('name', {
            required: 'Field is required',
            onChange: () => clearErrors('form'),
          })}
          placeholder={placeholder}
          autoComplete="off"
        />
        <Button
          form={`${formId}-form`}
          className={cn('create-item-form__button', styles?.button)}
          type="submit"
          disabled={isSubmitting || !isValid}
          variant="outline"
          fullWidth
          size="sm"
        >
          {submitText}
        </Button>
      </form>
    </div>
  );
}

CreateItemForm.defaultProps = {
  placeholder: undefined,
  submitText: 'Submit',
  styles: null,
};

import React, { useEffect, useId, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import cn from 'classnames';
import { IconX } from '@tabler/icons';

import type { SubmitHandler } from 'react-hook-form';

import './RenameItemForm.css';
// Hooks
import { useToast } from '../../hooks';
// Components
import { Button } from '../Button';
import { TextInput } from '../TextInput';

interface RenameItemFormProps<T> extends React.HTMLProps<HTMLDivElement> {
  values: { name: string };
  onRename: (name: string) => Promise<T>;
  placeholder: string;
  styles?: {
    formContainer?: string;
    input?: string;
    button?: string;
  };
  resetOnDefaultValuesChange?: boolean;
}

type FormValues = {
  name: string;
};

export function RenameItemForm<T extends { name: string }>({
  values,
  onRename,
  placeholder,
  label,
  styles,
  resetOnDefaultValuesChange = false,
}: RenameItemFormProps<void | T>) {
  const toast = useToast();
  const formId = useId();
  const [isEditable, setIsEditable] = useState<boolean>(false);
  const [defaultValues, setDefaultValues] = useState<FormValues>(values);
  const nameRef = useRef<HTMLInputElement | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<FormValues>({
    mode: 'onChange',
    defaultValues,
  });

  useEffect(() => {
    if (resetOnDefaultValuesChange && !isSubmitting) {
      setDefaultValues(values);
      reset(values);
    }
  }, [values, isSubmitting, resetOnDefaultValuesChange, setDefaultValues, reset]);

  const resetForm = (formValues: FormValues = defaultValues) => {
    setDefaultValues(formValues);
    reset(formValues);
    setIsEditable(false);
    nameRef.current?.blur();
  };
  const onSubmit: SubmitHandler<FormValues> = async ({ name }) => {
    if (name === '' || name === defaultValues.name) {
      return undefined;
    }
    return onRename(name)
      .then(() => {
        setDefaultValues({ ...defaultValues, name });
        resetForm({ ...defaultValues, name });
      })
      .catch((err: Error) =>
        toast.show({ type: 'error', title: 'Error', description: err.message }),
      );
  };

  const { ref, ...nameInputProps } = register('name', {
    required: 'Field is required',
    onBlur: (e: React.FocusEvent<HTMLInputElement, Element>) => e.target.setSelectionRange(0, 0),
  });

  const containerClasses = cn('rename-item', styles?.formContainer, { 'is-editing': isEditable });

  return (
    <div className={containerClasses}>
      <form
        id={`${formId}-form`}
        onSubmit={(e) => {
          handleSubmit(onSubmit)(e).catch(() => {});
        }}
        onBlur={() => resetForm()}
      >
        <TextInput
          id={`${formId}-name`}
          className={styles?.input}
          variant="unstyled"
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...nameInputProps}
          onFocus={(e) => {
            setIsEditable(true);
            e.target.setSelectionRange(e.target.value.length, e.target.value.length);
          }}
          onKeyDown={(e) => {
            if (e.key === 'Escape') resetForm();
          }}
          ref={(e) => {
            ref(e);
            nameRef.current = e;
          }}
          placeholder={placeholder}
          label={label}
          autoComplete="off"
          disabled={isSubmitting}
          labelHidden
        />
        <Button
          className="btn--close right-0"
          title="Cancel editing"
          onClick={() => {}}
          icon={<IconX size={16} />}
          variant="action-icon"
          disabled={!isEditable || isSubmitting}
        />
      </form>
    </div>
  );
}

RenameItemForm.defaultProps = {
  styles: undefined,
  resetOnDefaultValuesChange: false,
};

import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

// Components
import { RenameItemForm } from './RenameItemForm';
import { wrapWithToast } from '../../testHelpers';

const label = 'Item name';
const renderRenameItemForm = (cb: (name: string) => Promise<any>, placeholder: string) => {
  render(
    wrapWithToast(
      <RenameItemForm
        values={{ name: 'test' }}
        label={label}
        onRename={cb}
        placeholder={placeholder}
      />,
    ),
  );
};

describe('RenameItemForm', () => {
  describe('on mount', () => {
    it('should render #smoke', () => {
      // Arrange
      const placeholderText = 'placeholder';
      renderRenameItemForm(vi.fn(), placeholderText);

      // Assert
      expect(screen.getByPlaceholderText(placeholderText)).toBeInTheDocument();
    });
  });

  describe('when input is empty or unchanged', () => {
    it('should not submit', async () => {
      // Arrange
      const user = userEvent.setup();
      const handleRename = vi.fn(() => Promise.resolve());
      renderRenameItemForm(handleRename, 'placeholder');

      const input = screen.getByRole<HTMLInputElement>('textbox', { name: label });

      // Act (name unchanged)
      await user.clear(input);
      await user.type(input, 'test');
      await user.keyboard('[Enter]');

      // Assert
      expect(handleRename).not.toBeCalled();

      // Act (empty)
      await user.clear(input);
      await user.keyboard('[Enter]');

      // Assert
      expect(handleRename).not.toBeCalled();
    });
  });

  describe('on error', () => {
    it('should display error message', async () => {
      // Arrange
      const user = userEvent.setup();
      const errorMessage = 'failed to rename';
      const handleRename = vi.fn(() => Promise.reject(new Error(errorMessage)));
      renderRenameItemForm(handleRename, 'placeholder');

      // Act
      await user.type(screen.getByRole<HTMLInputElement>('textbox', { name: label }), 'foobar');
      await user.keyboard('[Enter]');

      // Assert
      expect(handleRename).toBeCalled();
      await expect(handleRename).rejects.toThrow(errorMessage);
      expect(screen.getByText(errorMessage)).toBeInTheDocument();
    });
  });

  describe('on "Esc" key down', () => {
    it('should reset form', async () => {
      // Arrange
      const user = userEvent.setup();
      renderRenameItemForm(vi.fn(), 'placeholder');
      const input = screen.getByRole<HTMLInputElement>('textbox', { name: label });

      // Act
      await user.type(input, 'foobar');
      await user.keyboard('[Escape]');

      // Assert
      expect(input.value).toBe('test');
    });
  });

  describe('when "resetOnDefaultValuesChange" attribute is set and "values" attribute is changed', () => {
    it.todo('should update input values');
  });

  describe('on success', () => {
    it('should display new name', async () => {
      // Arrange
      const user = userEvent.setup();
      const newName = 'foobar';
      const handleRename = vi.fn(() => Promise.resolve());
      renderRenameItemForm(handleRename, 'placeholder');
      const input = screen.getByRole<HTMLInputElement>('textbox', { name: label });

      // Act
      await user.clear(input);
      await user.type(input, newName);
      await user.keyboard('[Enter]');

      // Assert
      expect(handleRename).toBeCalledWith(newName);
      expect(input.value).toBe(newName);
    });
  });
});

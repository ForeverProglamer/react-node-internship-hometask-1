import { NoteCategory } from '../Note.js';

export const renderDate = (date) =>
  new Intl.DateTimeFormat('en-GB').format(date);

export const validateFormData = ({ name, category }) => {
  const errors = { name: '', category: '' };

  const fieldIsRequired = (fieldName) => `${fieldName} is required field`;
  const fieldMustBeLongerThan = (fieldName, value) =>
    `${fieldName} must be longer than ${value} characters`;

  if (!name) errors.name = fieldIsRequired('Name');

  if (!Object.values(NoteCategory).includes(category)) {
    errors.category = fieldIsRequired('Category');
  }

  if (name && name.length <= 4) errors.name = fieldMustBeLongerThan('Name', 4);

  return errors;
};

export const formDataHasErrors = (errors) =>
  Object.values(errors).some((message) => message);

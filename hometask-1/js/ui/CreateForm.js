import { validateFormData, formDataHasErrors } from './Utils.js';

const createModalWindow = document.getElementById('create-note-modal-window');
const createForm = document.getElementById('create-note-form');

const createNameInput = document.getElementById('create-note-name');
const createCategorySelect = document.getElementById('create-note-category');
const createContentTextArea = document.getElementById('create-note-content');

const createNameError = document.getElementById('create-note-name-error');
const createCategoryError = document.getElementById(
  'create-note-category-error',
);

let errors = {};

const CreateForm = {
  getData() {
    return {
      name: createNameInput.value,
      category: createCategorySelect.value,
      content: createContentTextArea.value,
    };
  },

  clear() {
    createForm.reset();
  },

  hasErrors() {
    errors = validateFormData(this.getData());
    return formDataHasErrors(errors);
  },

  displayErrors() {
    const { name, category } = errors;
    createNameError.innerText = name;
    createCategoryError.innerText = category;
  },

  clearErrors() {
    errors = {};
    createNameError.innerText = '';
    createCategoryError.innerText = '';
  },
};

createModalWindow.addEventListener('hide.bs.modal', CreateForm.clearErrors);

export default CreateForm;

import { renderDate, validateFormData, formDataHasErrors } from './Utils.js';

const editModalWindow = document.getElementById('edit-note-modal-window');
const editForm = document.getElementById('edit-note-form');

const editNameInput = document.getElementById('edit-note-name');
const editCreatedAtInput = document.getElementById('edit-note-created-at');
const editCategorySelect = document.getElementById('edit-note-category');
const editDatesList = document.getElementById('edit-note-dates');
const editContentTextArea = document.getElementById('edit-note-content');

const editNameError = document.getElementById('edit-note-name-error');
const editCategoryError = document.getElementById('edit-note-category-error');

let errors = {};

const EditForm = {
  getData() {
    return {
      name: editNameInput.value,
      category: editCategorySelect.value,
      content: editContentTextArea.value,
    };
  },

  getNoteId() {
    return editForm.dataset.id;
  },

  clear() {
    editForm.reset();
    editForm.removeAttribute('data-id');
    editDatesList.innerHTML = '';
  },

  displayNote(index, note) {
    editForm.setAttribute('data-id', index);
    editNameInput.value = note.name;
    editCreatedAtInput.value = renderDate(note.createdAt);
    editCategorySelect.value = note.category;

    note.dates.forEach((date) => {
      const li = document.createElement('li');
      li.className = 'list-group-item';
      li.appendChild(document.createTextNode(renderDate(date)));
      editDatesList.append(li);
    });

    editContentTextArea.value = note.content;
  },

  hasErrors() {
    errors = validateFormData(this.getData());
    return formDataHasErrors(errors);
  },

  displayErrors() {
    const { name, category } = errors;
    editNameError.innerText = name;
    editCategoryError.innerText = category;
  },

  clearErrors() {
    errors = {};
    editNameError.innerText = '';
    editCategoryError.innerText = '';
  },
};

editModalWindow.addEventListener('hide.bs.modal', () => {
  EditForm.clear();
  EditForm.clearErrors();
});

export default EditForm;

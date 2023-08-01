import * as service from './note_service.js';

const [homePage, archivedPage] = document.querySelectorAll('.nav-link');
const notesContainer = document.querySelector('#notes-list > tbody');

const createForm = document.getElementById('create-note-form');

const createNameInput = document.getElementById('create-note-name');
const createCategorySelect = document.getElementById('create-note-category');
const createContentTextArea = document.getElementById('create-note-content');
const createNoteButton = document.getElementById('create-note-button');

const newNoteButton = document.getElementById('new-note-button');

const editModalWindow = document.getElementById('edit-note-modal-window');
const editForm = document.getElementById('edit-note-form');

const editNameInput = document.getElementById('edit-note-name');
const editCreatedAtInput = document.getElementById('edit-note-created-at');
const editCategorySelect = document.getElementById('edit-note-category');
const editDatesList = document.getElementById('edit-note-dates');
const editContentTextArea = document.getElementById('edit-note-content');
const editSaveButton = document.getElementById('edit-note-save-button');

const renderDate = (date) => new Intl.DateTimeFormat('en-GB').format(date);

const readNote = (index) => {
  clearEditForm();

  const note = service.getNote(index);

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
};

const removeNote = (index) => {
  service.removeNote(index);
  renderPage();
};

const archiveNote = (index) => {
  service.archiveNote(index);
  renderPage();
};

const actionHandlers = {
  read: readNote,
  remove: removeNote,
  archive: archiveNote,
};

const noteButtonsHTML = (index) => `
  <div class="btn-group">
    <a class="btn btn-sm btn-dark" 
      data-bs-toggle="modal" data-bs-target="#edit-note-modal-window" 
      data-action="read" data-id="${index}"
    >
      <i class="fa-solid fa-pen-to-square fa-lg"></i>
    </a>
    <a class="btn btn-sm btn-dark" data-action="archive" data-id="${index}">
      <i class="fa-solid fa-box-archive fa-lg"></i>
    </a>
    <a class="btn btn-sm btn-dark" data-action="remove" data-id="${index}">
      <i class="fa-solid fa-trash fa-lg"></i>
    </a>
  </div>
`;

const getNoteList = () => {
  if (homePage.classList.contains('active')) return service.getActiveNotes();
  return service.getArchivedNotes();
};

const noteToTableRow = ([index, note]) => {
  const tr = document.createElement('tr');

  const tdName = document.createElement('td');
  tdName.appendChild(document.createTextNode(note.name));

  const tdCreatedAt = document.createElement('td');
  tdCreatedAt.appendChild(document.createTextNode(renderDate(note.createdAt)));

  const tdCategory = document.createElement('td');
  tdCategory.appendChild(document.createTextNode(note.category));

  const tdContent = document.createElement('td');
  tdContent.appendChild(document.createTextNode(note.content));
  tdContent.className = 'text-truncate';
  tdContent.style.maxWidth = '350px';

  const tdDates = document.createElement('td');
  tdDates.appendChild(
    document.createTextNode(note.dates.map(renderDate).join(', ')),
  );

  const tdButtons = document.createElement('td');
  tdButtons.innerHTML = noteButtonsHTML(index);

  tr.append(tdName, tdCreatedAt, tdCategory, tdContent, tdDates, tdButtons);
  return tr;
};

const renderPage = () => {
  const noteList = getNoteList();
  notesContainer.innerHTML = '';
  notesContainer.append(...noteList.map(noteToTableRow));
};

const getCreateFormData = () => ({
  name: createNameInput.value,
  category: createCategorySelect.value,
  content: createContentTextArea.value,
});

const clearCreateForm = () => createForm.reset();

const toggleView = (event) => {
  const current = document.querySelector('.nav-link.active');
  current.classList.remove('active');
  event.target.classList.add('active');
  renderPage();
};

const getEditFormData = () => ({
  name: editNameInput.value,
  category: editCategorySelect.value,
  content: editContentTextArea.value,
});

const clearEditForm = () => {
  editForm.reset();
  editForm.removeAttribute('data-id');
  editDatesList.innerHTML = '';
};

const initPage = () => {
  homePage.addEventListener('click', toggleView);
  archivedPage.addEventListener('click', toggleView);

  homePage.addEventListener('click', () =>
    newNoteButton.classList.remove('invisible'),
  );

  archivedPage.addEventListener('click', () =>
    newNoteButton.classList.add('invisible'),
  );

  createNoteButton.addEventListener('click', () => {
    // TODO validate form
    const formData = getCreateFormData();
    console.log(formData);
    const note = service.addNote(formData);
    notesContainer.append(noteToTableRow(note));
    clearCreateForm();
  });

  notesContainer.addEventListener('click', (event) => {
    const target = event.target.closest('a[data-action]');

    if (!target) return;
    if (!notesContainer.contains(target)) return;

    const { action, id } = target.dataset;
    actionHandlers[action](id);
  });

  editModalWindow.addEventListener('hide.bs.modal', clearEditForm);

  editSaveButton.addEventListener('click', () => {
    // TODO validate form
    const formData = getEditFormData();
    const { id } = editForm.dataset;
    service.updateNote(id, formData);
    readNote(id);
    renderPage();
  });

  renderPage();
};

export default initPage;

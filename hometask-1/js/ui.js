import { getActiveNotes, getArchivedNotes, addNote } from './note_service.js';

const [homePage, archivedPage] = document.querySelectorAll('.nav-link');
const notesContainer = document.querySelector('#notes-list > tbody');

const createNameInput = document.getElementById('create-note-name');
const createCategorySelect = document.getElementById('create-note-category');
const createContentTextArea = document.getElementById('create-note-content');
const createNoteButton = document.getElementById('create-note-button');

const newNoteButton = document.getElementById('new-note-button');

const noteButtonsHTML = `
  <div class="btn-group">
    <a class="btn btn-sm btn-dark" data-bs-toggle="modal" data-bs-target="#editNote">
        <i class="fa-solid fa-pen-to-square fa-lg"></i>
    </a>
    <a class="btn btn-sm btn-dark archive">
        <i class="fa-solid fa-box-archive fa-lg archive"></i>
    </a>
    <a class="btn btn-sm btn-dark remove">
        <i class="fa-solid fa-trash fa-lg remove"></i>
    </a>
  </div>
`;

const getNoteList = () => {
  if (homePage.classList.contains('active')) return getActiveNotes();
  return getArchivedNotes();
};

const renderDate = (date) => new Intl.DateTimeFormat('en-GB').format(date);

const noteToTableRow = ([index, note]) => {
  const tr = document.createElement('tr');
  tr.setAttribute('data-note-id', index);

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
  tdButtons.innerHTML = noteButtonsHTML;

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

const clearCreateForm = () => {
  createNameInput.value = '';
  createCategorySelect.selectedIndex = 0;
  createContentTextArea.value = '';
};

const toggleView = (event) => {
  const current = document.querySelector('.nav-link.active');
  current.classList.remove('active');
  event.target.classList.add('active');
  renderPage();
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
    const note = addNote(formData);
    notesContainer.append(noteToTableRow(note));
    clearCreateForm();
  });

  renderPage();
};

export default initPage;

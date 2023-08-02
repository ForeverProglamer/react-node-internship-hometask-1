import * as service from './NoteService.js';

import NotesContainer from './ui/NotesContainer.js';
import SummaryContainer from './ui/SummaryContainer.js';

import CreateForm from './ui/CreateForm.js';
import EditForm from './ui/EditForm.js';

const [homePage, archivedPage] = document.querySelectorAll('.nav-link');

const createNoteButton = document.getElementById('create-note-button');
const newNoteButton = document.getElementById('new-note-button');
const editSaveButton = document.getElementById('edit-note-save-button');

const createNote = () => {
  const formData = CreateForm.getData();

  if (CreateForm.hasErrors()) {
    CreateForm.displayErrors();
    return;
  }

  service.addNote(formData);
  renderPage();

  CreateForm.clearErrors();
  CreateForm.clear();
};

const updateNote = () => {
  const formData = EditForm.getData();
  const id = EditForm.getNoteId();

  if (EditForm.hasErrors()) {
    EditForm.displayErrors();
    return;
  }

  service.updateNote(id, formData);
  readNote(id);
  renderPage();

  EditForm.clearErrors();
};

const readNote = (index) => {
  EditForm.clear();
  const note = service.getNote(index);
  EditForm.displayNote(index, note);
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

const handleNoteAction = (event) => {
  const target = event.target.closest('a[data-action]');

  if (!target) return;
  if (!NotesContainer.contains(target)) return;

  const { action, id } = target.dataset;
  actionHandlers[action](id);
};

const getPageData = () => {
  if (homePage.classList.contains('active')) {
    return {
      noteList: service.getActiveNotes(),
      summary: service.getActiveNotesSummary(),
    };
  }
  return {
    noteList: service.getArchivedNotes(),
    summary: service.getArchivedNotesSummary(),
  };
};

const renderPage = () => {
  const { noteList, summary } = getPageData();

  NotesContainer.clear();
  NotesContainer.append(noteList);

  SummaryContainer.clear();
  SummaryContainer.append(summary);
};

const toggleView = (event) => {
  const current = document.querySelector('.nav-link.active');
  current.classList.remove('active');
  event.target.classList.add('active');
  renderPage();
};

const App = {
  init() {
    homePage.addEventListener('click', toggleView);
    archivedPage.addEventListener('click', toggleView);

    homePage.addEventListener('click', () =>
      newNoteButton.classList.remove('invisible'),
    );

    archivedPage.addEventListener('click', () =>
      newNoteButton.classList.add('invisible'),
    );

    createNoteButton.addEventListener('click', createNote);

    NotesContainer.on('click', handleNoteAction);

    editSaveButton.addEventListener('click', updateNote);

    renderPage();
  },
};

export default App;

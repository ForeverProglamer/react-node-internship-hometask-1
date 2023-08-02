import { renderDate } from './Utils.js';

const container = document.querySelector('#notes-list > tbody');

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

const NotesContainer = {
  on(eventName, listener) {
    container.addEventListener(eventName, listener);
  },

  contains(element) {
    return container.contains(element);
  },

  clear() {
    container.innerHTML = '';
  },

  append(notes) {
    container.append(...notes.map(noteToTableRow));
  },
};

export default NotesContainer;

import { Note } from './note.js';
import storage from './storage.js';

export const archiveNote = (index) => storage.getNote(index).archive();

export const getActiveNotes = () =>
  storage.getNotes((note) => note.archived === false);

export const getArchivedNotes = () =>
  storage.getNotes((note) => note.archived === true);

export const getNote = (index) => storage.getNote(index);

export const addNote = ({ name, category, content }) =>
  storage.addNote(new Note(name, category, content));

export const updateNote = (index, data) => storage.updateNote(index, data);

export const removeNote = (index) => storage.removeNote(index);

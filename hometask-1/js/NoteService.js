import { Note, NoteCategory } from './Note.js';
import Storage from './Storage.js';

export const archiveNote = (index) => Storage.getNote(index).archive();

export const getActiveNotes = () =>
  Storage.getNotes((note) => note.archived === false);

export const getArchivedNotes = () =>
  Storage.getNotes((note) => note.archived === true);

const getNotesSummary = (notes) => {
  const summary = Object.fromEntries([
    ...Object.values(NoteCategory).map((category) => [category, 0]),
  ]);

  notes.forEach(([, note]) => {
    summary[note.category] += 1;
  });

  return summary;
};

export const getActiveNotesSummary = () => getNotesSummary(getActiveNotes());

export const getArchivedNotesSummary = () =>
  getNotesSummary(getArchivedNotes());

export const getNote = (index) => Storage.getNote(index);

export const addNote = ({ name, category, content }) =>
  Storage.addNote(new Note(name, category, content));

export const updateNote = (index, data) => Storage.updateNote(index, data);

export const removeNote = (index) => Storage.removeNote(index);

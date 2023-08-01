import { Note, NoteCategory } from './note.js';

const state = [
  new Note(
    'Project Deadline',
    NoteCategory.Task,
    'Complete project by 15/08/2023. Start working on the frontend.',
  ),
  new Note(
    'Feature Suggestions',
    NoteCategory.Idea,
    'Brainstorm new feature ideas for the application.',
  ),
  new Note(
    'Random Thought',
    NoteCategory.RandomThought,
    'The weather is beautiful today!',
  ),
  new Note(
    'Documentation Update',
    NoteCategory.Task,
    'Update documentation by 20/08/2023. Prepare release notes.',
  ),
  new Note(
    'Performance Enhancements',
    NoteCategory.Idea,
    'Research potential technologies to enhance performance. Deadlines: 25/08/2023, 10/09/2023, 30/09/2023.',
  ),
  new Note(
    'Bug Fixes',
    NoteCategory.Task,
    'Fix bugs reported by users by 25/08/2023.',
    true,
  ),
  new Note(
    'Team Meeting',
    NoteCategory.RandomThought,
    'Had a great meeting with the team! Looking forward to the next ones: 05/08/2023, 15/08/2023.',
    true,
  ),
];

const storage = {
  getNote(index) {
    return state[index];
  },

  getNotes(predicate = () => true) {
    return [...state.entries()].filter(([, value]) => predicate(value));
  },

  addNote(note) {
    state.push(note);
    return [state.length - 1, note];
  },

  removeNote(index) {
    state.splice(index, 1);
  },

  updateNote(index, data) {
    state[index].updateWith(data);
  },
};

export default storage;

import { parseDates } from './Utils.js';

export const NoteCategory = Object.freeze({
  Task: 'Task',
  Idea: 'Idea',
  RandomThought: 'Random Thought',
});

export const validateNoteCategory = (category) => {
  if (!Object.values(NoteCategory).includes(category)) {
    throw new Error(`Unsupported category given: ${category}.`);
  }
};

export class Note {
  constructor(name, category, content, archived = false) {
    validateNoteCategory(category);

    this.name = name;
    this.category = category;
    this.content = content;
    this.createdAt = new Date();
    this.archived = archived;
  }

  get dates() {
    return parseDates(this.content);
  }

  archive() {
    this.archived = !this.archived;
  }

  updateWith({ name, category, content }) {
    validateNoteCategory(category);

    this.name = name;
    this.category = category;
    this.content = content;
  }
}

import { validateNoteCategory, NoteCategory } from '../js/Note.js';

describe('test validateNoteCategory', () => {
  test('throws error when passing an invalid/unsupported category', () => {
    const categories = ['blabla', 'task', 'idea', 'random thought'];

    categories.forEach((category) => {
      expect(() => {
        validateNoteCategory(category);
      }).toThrow();
    });
  });

  test('does not throw any error with valid inputs', () => {
    const categories = [
      NoteCategory.Task,
      NoteCategory.Idea,
      NoteCategory.RandomThought,
    ];

    categories.forEach((category) => {
      expect(validateNoteCategory(category)).toBeUndefined();
    });
  });
});

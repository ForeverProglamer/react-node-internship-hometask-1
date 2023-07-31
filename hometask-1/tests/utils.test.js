import { parseDates } from '../js/utils.js';

describe('test parseDates', () => {
  test('returns empty array when input does not contain dates', () => {
    const content = 'Brainstorm new feature ideas for the application.';
    expect(parseDates(content)).toEqual([]);
  });

  test('returns non-empty array when input contains dd/mm/yyyy format dates', () => {
    const data = [
      {
        content:
          'I’m gonna have a dentist appointment on the 3/5/2021, I moved it from 5/5/2021',
        expected: [new Date(2021, 4, 3), new Date(2021, 4, 5)],
      },
      {
        content: 'Update documentation by 20/08/2023. Prepare release notes.',
        expected: [new Date(2023, 7, 20)],
      },
      {
        content:
          'Had a great meeting with the team! Looking forward to the next ones: 05/08/2023, 15/08/2023.',
        expected: [new Date(2023, 7, 5), new Date(2023, 7, 15)],
      },
      {
        content:
          'Research potential technologies to enhance performance. Deadlines: 25/08/2023, 10/09/2023, 30/09/2023.',
        expected: [
          new Date(2023, 7, 25),
          new Date(2023, 8, 10),
          new Date(2023, 8, 30),
        ],
      },
    ];

    data.forEach(({ content, expected }) => {
      expect(parseDates(content)).toEqual(expected);
    });
  });

  test('returns empty array when input contains unsupported date format', () => {
    const contents = [
      'The event is on 15-08-2023.',
      'My birthday is on 2023-08-15.',
      'Mark the date: 08.15.2023.',
      'Next meeting is scheduled for August 15, 2023.',
      'Don`t forget the deadline: 2023/08/15.',
    ];

    contents.forEach((content) => {
      expect(parseDates(content)).toEqual([]);
    });
  });

  test('returns empty array when input contains incomplete dates', () => {
    const contents = ['15/20', '14/2015', '01/2023', '12/31', '2022/08'];

    contents.forEach((content) => {
      expect(parseDates(content)).toEqual([]);
    });
  });

  test('returns empty array for input with out-of-range month or day', () => {
    const problematicDates = [
      '32/06/2023',
      '31/99/2023',
      '45/78/2023',
      '85/95/2023',
      '75/45/2023',
    ];

    problematicDates.forEach((date) => {
      console.log(date);
      expect(parseDates(date)).toEqual([]);
    });
  });
});

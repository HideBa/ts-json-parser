import type { ParserOutput } from '../../types';
import { whitespace } from './whitespace';

describe('whitespace', () => {
  const parser = whitespace;

  test('Empty input', () => {
    const input = [] as const;
    const output = parser(input);
    expect(output).toEqual<ParserOutput<null>>({
      result: 'success',
      data: null,
      rest: []
    });
  });

  test('Input "abc"', () => {
    const input = [...'abc'];
    const output = parser(input);
    expect(output).toEqual<ParserOutput<null>>({
      result: 'success',
      data: null,
      rest: [...'abc']
    });
  });

  test('Input "\\t\\n\\r hoge"', () => {
    const input = [...'\t\n\r hoge'];
    const output = parser(input);
    expect(output).toEqual<ParserOutput<null>>({
      result: 'success',
      data: null,
      rest: [...'hoge']
    });
  });
});
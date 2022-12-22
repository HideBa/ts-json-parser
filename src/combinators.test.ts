import { not } from './combinators';
import { char } from './char';
import type { ParserOutput } from './types';

describe('not(char("a"))', () => {
  const parser = not(char('a'));

  test('Empty input', () => {
    const input = [] as const;
    const output = parser(input);
    expect(output).toEqual<ParserOutput<null>>({
      result: 'success',
      data: null,
      rest: []
    });
  });

  test('Input "a"', () => {
    const input = [...'a'];
    const output = parser(input);
    expect(output).toEqual<ParserOutput<null>>({
      result: 'fail'
    });
  });

  test('Input "A"', () => {
    const input = [...'A'];
    const output = parser(input);
    expect(output).toEqual<ParserOutput<null>>({
      result: 'success',
      data: null,
      rest: [...'A']
    });
  });

  test('Input "hoge"', () => {
    const input = [...'hoge'];
    const output = parser(input);
    expect(output).toEqual<ParserOutput<null>>({
      result: 'success',
      data: null,
      rest: [...'hoge']
    });
  });
});
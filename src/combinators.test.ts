import { not, or } from './combinators';
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


describe('or()', () => {
  describe('or([])', () => {
    const parser = or([]);

    test('Empty input', () => {
      const input = [] as const;
      const output = parser(input);
      expect(output).toEqual<ParserOutput<unknown>>({
        result: 'fail'
      });
    });

    test('Input "a"', () => {
      const input = [...'a'];
      const output = parser(input);
      expect(output).toEqual<ParserOutput<unknown>>({
        result: 'fail'
      });
    });
  });

  describe('or([char("a"), char("b")])', () => {
    const parser = or([char('a'), char('b')]);

    test('Empty input', () => {
      const input = [] as const;
      const output = parser(input);
      expect(output).toEqual<ParserOutput<'a' | 'b'>>({
        result: 'fail'
      });
    });

    test('Input "a"', () => {
      const input = [...'a'];
      const output = parser(input);
      expect(output).toEqual<ParserOutput<'a' | 'b'>>({
        result: 'success',
        data: 'a',
        rest: []
      });
    });

    test('Input "b"', () => {
      const input = [...'b'];
      const output = parser(input);
      expect(output).toEqual<ParserOutput<'a' | 'b'>>({
        result: 'success',
        data: 'b',
        rest: []
      });
    });

    test('Input "A"', () => {
      const input = [...'A'];
      const output = parser(input);
      expect(output).toEqual<ParserOutput<'a' | 'b'>>({
        result: 'fail'
      });
    });
  });
});
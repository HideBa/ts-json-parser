import { upperAlpha, lowerAlpha, alpha } from './char';
import type { UpperAlphabet, LowerAlphabet, Alphabet } from './char';
import { ParserOutput } from './types';


describe('upperAlpha', () => {
  const parser = upperAlpha;

  test('Empty input', () => {
    const input = [] as const;
    const output = parser(input);
    expect(output).toEqual<ParserOutput<UpperAlphabet>>({
      result: 'fail'
    });
  });

  test('Input "a"', () => {
    const input = [...'a'];
    const output = parser(input);
    expect(output).toEqual<ParserOutput<UpperAlphabet>>({
      result: 'fail'
    });
  });

  test('Input "A"', () => {
    const input = [...'A'];
    const output = parser(input);
    expect(output).toEqual<ParserOutput<UpperAlphabet>>({
      result: 'success',
      data: 'A',
      rest: []
    });
  });
});

describe('lowerAlpha', () => {
  const parser = lowerAlpha;

  test('Empty input', () => {
    const input = [] as const;
    const output = parser(input);
    expect(output).toEqual<ParserOutput<LowerAlphabet>>({
      result: 'fail'
    });
  });

  test('Input "a"', () => {
    const input = [...'a'];
    const output = parser(input);
    expect(output).toEqual<ParserOutput<LowerAlphabet>>({
      result: 'success',
      data: 'a',
      rest: []
    });
  });

  test('Input "A"', () => {
    const input = [...'A'];
    const output = parser(input);
    expect(output).toEqual<ParserOutput<LowerAlphabet>>({
      result: 'fail'
    });
  });
});

describe('alpha', () => {
  const parser = alpha;

  test('Empty input', () => {
    const input = [] as const;
    const output = parser(input);
    expect(output).toEqual<ParserOutput<Alphabet>>({
      result: 'fail'
    });
  });

  test('Input "a"', () => {
    const input = [...'a'];
    const output = parser(input);
    expect(output).toEqual<ParserOutput<Alphabet>>({
      result: 'success',
      data: 'a',
      rest: []
    });
  });

  test('Input "A"', () => {
    const input = [...'A'];
    const output = parser(input);
    expect(output).toEqual<ParserOutput<Alphabet>>({
      result: 'success',
      data: 'A',
      rest: []
    });
  });

  test('Input "1"', () => {
    const input = [...'1'];
    const output = parser(input);
    expect(output).toEqual<ParserOutput<Alphabet>>({
      result: 'fail'
    });
  });
});
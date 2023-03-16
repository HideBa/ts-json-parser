import { upperAlpha, lowerAlpha, alpha, char, Digit, digit } from './char';
import type { UpperAlphabet, LowerAlphabet, Alphabet } from './char';
import { ParserOutput } from './types';
import { str, Option, opt, diff, list } from './util';


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

describe('str("true")', () => {
  const parser = str('true');

  test('Empty input', () => {
    const input = [] as const;
    const output = parser(input);
    expect(output).toEqual<ParserOutput<'true'>>({
      result: 'fail'
    });
  });

  test('Input "true"', () => {
    const input = [...'true'];
    const output = parser(input);
    expect(output).toEqual<ParserOutput<'true'>>({
      result: 'success',
      data: 'true',
      rest: []
    });
  });
});

describe('opt()', () => {
  describe('opt(char("a"))', () => {
    const parser = opt(char('a'));

    test('Empty input', () => {
      const input = [] as const;
      const output = parser(input);
      expect(output).toEqual<ParserOutput<Option<'a'>>>({
        result: 'success',
        data: { status: 'none' },
        rest: []
      });
    });

    test('Input "a"', () => {
      const input = [...'a'];
      const output = parser(input);
      expect(output).toEqual<ParserOutput<Option<'a'>>>({
        result: 'success',
        data: { status: 'some', value: 'a' },
        rest: []
      });
    });

    test('Input "aa"', () => {
      const input = [...'aa'];
      const output = parser(input);
      expect(output).toEqual<ParserOutput<Option<'a'>>>({
        result: 'success',
        data: { status: 'some', value: 'a' },
        rest: [...'a']
      });
    });

    test('Input "b"', () => {
      const input = [...'b'];
      const output = parser(input);
      expect(output).toEqual<ParserOutput<Option<'a'>>>({
        result: 'success',
        data: { status: 'none' },
        rest: [...'b']
      });
    });
  });
});

describe('diff(digit, char("0"))', () => {
  const parser = diff(digit, char('0'));

  test('Empty input', () => {
    const input = [] as const;
    const output = parser(input);
    expect(output).toEqual<ParserOutput<Digit>>({
      result: 'fail'
    });
  });

  test('Input "a"', () => {
    const input = [...'a'];
    const output = parser(input);
    expect(output).toEqual<ParserOutput<Digit>>({
      result: 'fail'
    });
  });

  test('Input "0"', () => {
    const input = [...'0'];
    const output = parser(input);
    expect(output).toEqual<ParserOutput<Digit>>({
      result: 'fail'
    });
  });

  test('Input "5"', () => {
    const input = [...'5'];
    const output = parser(input);
    expect(output).toEqual<ParserOutput<Digit>>({
      result: 'success',
      data: '5',
      rest: []
    });
  });
});

describe('list(digit, char(","))', () => {
  const parser = list(digit, char(','));

  test('Empty input', () => {
    const input = [] as const;
    const output = parser(input);
    expect(output).toEqual<ParserOutput<Digit[]>>({
      result: 'fail'
    });
  });

  test('Input "a"', () => {
    const input = [...'a'];
    const output = parser(input);
    expect(output).toEqual<ParserOutput<Digit[]>>({
      result: 'fail'
    });
  });

  test('Input "1"', () => {
    const input = [...'1'];
    const output = parser(input);
    expect(output).toEqual<ParserOutput<Digit[]>>({
      result: 'success',
      data: ['1'],
      rest: []
    });
  });

  test('Input "1,2,3,4,5"', () => {
    const input = [...'1,2,3,4,5'];
    const output = parser(input);
    expect(output).toEqual<ParserOutput<Digit[]>>({
      result: 'success',
      data: ['1', '2', '3', '4', '5'],
      rest: []
    });
  });
});
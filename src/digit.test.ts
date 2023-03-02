
import { Digit, digit, map } from "./char";
import { ParserOutput } from "./types";

describe('digit', () => {
  const parser = digit;

  test('Empty input', () => {
    const input = [] as const;
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

  test('Input "a"', () => {
    const input = [...'a'];
    const output = parser(input);
    expect(output).toEqual<ParserOutput<Digit>>({
      result: 'fail'
    });
  });
});


describe('map(digit, s => Number.parseInt(s, 10))', () => {
  const parser = map(digit, s => Number.parseInt(s, 10));

  test('Empty input', () => {
    const input = [] as const;
    const output = parser(input);
    expect(output).toEqual<ParserOutput<number>>({
      result: 'fail'
    });
  });

  test('Input "5"', () => {
    const input = [...'5'];
    const output = parser(input);
    expect(output).toEqual<ParserOutput<number>>({
      result: 'success',
      data: 5,
      rest: []
    });
  });
});
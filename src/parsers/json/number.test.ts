import type { ParserOutput } from '../../types';
import { number } from './number';

describe('number', () => {
  const parser = number;

  test('Empty input', () => {
    const input = [] as const;
    const output = parser(input);
    expect(output).toEqual<ParserOutput<number>>({
      result: 'fail'
    });
  });

  test('Input "+1"', () => {
    const input = [...'+1'];
    const output = parser(input);
    expect(output).toEqual<ParserOutput<number>>({
      result: 'fail'
    });
  });

  test('Input "42"', () => {
    const input = [...'42'];
    const output = parser(input);
    expect(output).toEqual<ParserOutput<number>>({
      result: 'success',
      data: 42,
      rest: []
    });
  });

  test('Input "-273.15"', () => {
    const input = [...'-273.15'];
    const output = parser(input);
    expect(output).toEqual<ParserOutput<number>>({
      result: 'success',
      data: -273.15,
      rest: []
    });
  });

  test('Input "-1.125e+2"', () => {
    const input = [...'-1.125e+2'];
    const output = parser(input);
    expect(output).toEqual<ParserOutput<number>>({
      result: 'success',
      data: -1.125e+2,
      rest: []
    });
  });
});
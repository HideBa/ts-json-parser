import { anyChar } from './primitives';
import type { Parser, ParserInput } from './types';

type CharFunc = <T extends ParserInput[0]>(c: T) => Parser<T>;

export const char: CharFunc = c => input => {
  const r = anyChar(input);
  if (r.result === 'fail') return r;
  if (r.data !== c) return { result: 'fail' };
  return {
    result: 'success',
    data: c,
    rest: r.rest
  };
};

type IsFunc = <T extends string>(f: (c: ParserInput[0]) => c is T) => Parser<T>;
export const is: IsFunc = f => input => {
  const r = anyChar(input);
  if (r.result === 'fail') return r;
  if (!f(r.data)) return { result: 'fail' };
  return {
    result: 'success',
    data: r.data,
    rest: r.rest
  };
};

export type UpperAlphabet = "A"|"B"|"C"|"D"|"E"|"F"|"G"|"H"|"I"|"J"|"K"|"L"|"M"|"N"|"O"|"P"|"Q"|"R"|"S"|"T"|"U"|"V"|"W"|"X"|"Y"|"Z";
export type LowerAlphabet = Lowercase<UpperAlphabet>;
export type Alphabet = UpperAlphabet | LowerAlphabet;

export const upperAlpha: Parser<UpperAlphabet> = is((input): input is UpperAlphabet => (/^[A-Z]$/).test(input))

export const lowerAlpha: Parser<LowerAlphabet> = is((input): input is LowerAlphabet => (/^[a-z]$/).test(input))

export const alpha: Parser<Alphabet> = is((input): input is Alphabet => (/^[a-zA-Z]$/).test(input))

export type Digit = "1"|"2"|"3"|"4"|"5"|"6"|"7"|"8"|"9"|"0"

export const digit: Parser<Digit> = is((input): input is Digit => (/^[0-9]$/).test(input))

export type MapFunc = <T, U>(parser: Parser<T>, convertFn: (s: T) => U) => Parser<U>

export const map: MapFunc = (parser, convertFn) => {
  return (input) => {
    const res = parser(input)
    if(res.result === "fail"){
      return res
    }
    return {
      result: "success",
      data: convertFn(res.data),
      rest: res.rest
    }
  }
}

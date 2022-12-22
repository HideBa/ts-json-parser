import type { Parser } from './types'

type NotFunc = (p: Parser<unknown>) => Parser<null>;
export const not: NotFunc = p => input => {
  if (p(input).result === 'success') {
    return { result: 'fail' };
  } else {
    return { result: 'success', data: null, rest: input };
  }
};

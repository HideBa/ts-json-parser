import type { Parser } from './types'

type NotFunc = (p: Parser<unknown>) => Parser<null>;
export const not: NotFunc = p => input => {
  if (p(input).result === 'success') {
    return { result: 'fail' };
  } else {
    return { result: 'success', data: null, rest: input };
  }
};

type OrFunc = <T>(pList: Parser<T>[]) => Parser<T>
export const or: OrFunc = pList => input => {
  for(const p of pList){
    const res = p(input)
    if(res.result === "success"){
      return res
    }
    }
    return {
      result: "fail",
    }
  }

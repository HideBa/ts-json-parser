import type { Parser, ParserData, ParserInput } from './types'

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


// type CatFunc = <T extends Parser<unknown>>() => () => any
type CatFunc = <T extends Parser<unknown>[]>(ps: [...T]) => Parser<{ [K in keyof T]: ParserData<T[K]> }>;

// //**
//  * TはParser<unknow>[]型
//  * psは例えば [Parser<"a">, Parser<"b">]みたいなタプル
//  * 戻り値は例えば、
//  * Parser<
//  *  {
//  *    0: ParserData<Parser<"a">> => "a"
//  *    1: ParserData<Parser<"b">> => "b"
//  *  }
//     ... => Parser<["a", "b"]
//  * >
//  */
//**

export const cat: CatFunc = ps => input => {
  const rs = [];
  let i = input;
  for (const p of ps) {
    const r = p(i);
    if (r.result === 'fail') return r;
    rs.push(r.data);
    i = r.rest;
  }
  return {
    result: 'success',
    data: rs as ParserData<ReturnType<ReturnType<CatFunc>>>,
    rest: i
  };
};

export type RepFunc = <T>(p: Parser<T>, min?: number,max?: number ) => Parser<T[]>

export const rep: RepFunc = <T>(p: Parser<T>, min: number = 0, max: number = Number.MAX_SAFE_INTEGER) => (input:ParserInput) => {
  if (min > max) throw new Error('rep: min > max is not allowed.');
  if (min < 0) throw new Error('rep: negative min is not allowed.');
  if (max < 0) throw new Error('rep: negative max is not allowed.');

  let input2 = input
  const rs: ParserData<typeof p>[] = []

  for(let i = 0; i < max; i++){
    const res = p(input2)
    if (res.result === "fail")break
    rs.push(res.data)
    input2 = res.rest
  }

  if(rs.length < min)return {result: "fail"}

  return {
    result: "success",
    data: rs,
    rest: input2,
  }
}
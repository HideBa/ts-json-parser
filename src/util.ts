import { char } from "./char";
import { cat, rep } from "./combinators";
import { Parser } from "./types";

export type Str = <T extends string>(str: T) => Parser<T>

export const str: Str = (s) => (input) => {
  const charactors = [...s]
  const parser = cat(charactors.map(c => char(c)))
  const res = parser(input)
  if(res.result === "fail")return res
  return {
    result: "success",
    data: s,
    rest: res.rest
  }
}

interface Some<T> {
  status: "some";
  value: T;
}

interface None {
  status: "none"
}

export type Option<T> = Some<T> | None

export type OptionFunc = <T>(parser: Parser<T>) =>  Parser<Option<T>>

export const opt: OptionFunc = (parser) => (input) => {
  const res = parser(input)
  if(res.result === "success"){
    return {
      data: {
        status: "some",
        value: res.data
      },
      result: res.result,
      rest: res.rest
    }
  }
  return {
    result: "success",
    data: {
      status: "none"
    },
    rest: input
  }
}

export type DiffFunc = <T, U>(p1: Parser<T>, p2: Parser<U>) => Parser<T>

export const diff: DiffFunc = (p1, p2) =>(input) => {
  const res = p1(input)
  if(res.result === "success"){
    const res2 = p2(input)
    if(res2.result === "success"){
      return {
        result: "fail"
      }
    }
    return {
      result: "success",
      data: res.data,
      rest: res.rest
    }
  }

  return {
    result: "fail"
  }
}

export type ListFunc = <T, U>(p1: Parser<T>, p2: Parser<U>) => Parser<T[]>

export const list: ListFunc = <T, U>(p1: Parser<T>, p2: Parser<U>) => (input) => {
  const res = p1(input)
  if(res.result === "fail")return res

  if(res.rest.length === 0)return {
    result: "success",
    data: [res.data],
    rest: res.rest
  }

  // "1,2,3,4,5" -> ",2,3,4,5"

  const p1p2 = cat([p2, p1])
  const repp1p2 = rep(p1p2, 0, Number.MAX_SAFE_INTEGER)
  const res2 = repp1p2(res.rest)

  if(res2.result === "fail")return res2
  return {
    result: "success",
    data: [res.data, ...res2.data.map(d => d[1])],
    rest: []
  }

}
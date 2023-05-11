import { char, map } from "../char"
import { cat, or, rep } from "../combinators"
import { ParserInput, ParserOutput } from "../types"
import { numbers } from "./int"

// <expr> ::= <term> [ ("+" | "-") <term> ]*
// <term> ::= <factor> [ ("*" | "/") <factor> ]*
// <factor> ::= <number> | "(" <expr> ")"
// <number> ::= 整数

export function expr(input: ParserInput): ParserOutput<number> {
  return map(cat([term, rep(cat([or([char('+'), char('-')]), term]))]), ([first, rest]) => {
    return rest.reduce((lhs, [op, rhs]) => {
      if (op === '+') return lhs + rhs;
      return lhs - rhs;
    }, first);
  })(input);
}

function term(input: ParserInput): ParserOutput<number> {
  return map(cat([factor, rep(cat([or([char('*'), char('/')]), factor]))]), ([first, rest]) => {
    return rest.reduce((lhs, [op, rhs]) => {
      if (op === '*') return lhs * rhs;
      return lhs / rhs;
    }, first);
  })(input);
}

function factor(input: ParserInput): ParserOutput<number> {
  return or([numbers, map(cat([char('('), expr, char(')')]), ([,n,]) => n)])(input);
}
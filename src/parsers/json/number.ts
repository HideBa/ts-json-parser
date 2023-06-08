import {  char, digit, map } from "../../char"
import { cat, or, rep } from "../../combinators"
import { Parser } from "../../types"
import {  diff, opt } from "../../util"
import type { Option } from "../../util"


// 111.111
// 1
// 1.01
// -1.1
// 1.11e+32
// const point = map(str("."), (res) => res)
// const sign:Parser<string> = map(opt(char("-")), s => s.status === "some" ? "-" : "")
// const decimal: Parser<string> = map(rep(digit), (res) => res.join(""))
// const exponent: Parser<string> = map(cat([or([str("e"), str("E")]), or([str("+"), str("-")])]), ([first, second]) => first + second)
// const decimalExponent = map(cat([decimal, map(opt(exponent), (res) => res.status === "some" ? res.value : ""), decimal]), ([first, second, third]) => first+second+third)
// export const number: Parser<number> = map(cat([sign, decimal, map(opt(cat([point, decimalExponent])), (res) => res.status === "some" ? res.value.join("") : "")]), (res) => Number.parseFloat(res.join("")))

/**
  * number or -でスタート
  * 浮動小数点数の場合は0スタートでもOK or(nonZeroNumber,)
  * .と何かの数値 cat[point, nonZeroNumber]
  *
*/


const sign: Parser<'-'> = char('-');
const integer: Parser<string> = or([char('0'), map(cat([diff(digit, char('0')), rep(digit)]), ([first, rest]) => [first, ...rest].join(''))]);
const fraction: Parser<string> = map(cat([char('.'), rep(digit, 1)]), ([dot, digits]) => [dot, ...digits].join(''));
const exponent: Parser<string> = map(cat([or([char('E'), char('e')]), opt(or([char('+'), char('-')])), rep(digit, 1)]), ([e, sign, digits]) => [e, sign.status === 'some' ? sign.value : '', ...digits].join(''));

export const number: Parser<number> = map(cat([opt(sign), integer, opt(fraction), opt(exponent)]), ([sign, integer, fraction, exponent]) => {
  const optOrEmpty = (opt: Option<string>) => opt.status === 'some' ? opt.value : '';
  const numberString = [optOrEmpty(sign), integer, optOrEmpty(fraction), optOrEmpty(exponent)].join('');
  return Number.parseFloat(numberString);
});
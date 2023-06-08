import {  char, map } from "../../char";
import { or, rep } from "../../combinators";
import { Parser } from "../../types";

export const whitespace: Parser<null> = map(rep(or([...'\t\n\r '].map(char))), () => null);

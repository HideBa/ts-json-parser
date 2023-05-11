import {  map } from "../char";
import { or } from "../combinators";
import { Parser } from "../types";
import { str } from "../util";

type BoolFunc = Parser<boolean>


export const bool:BoolFunc = map(or([str("true"),str("false")]), c => c === "true")
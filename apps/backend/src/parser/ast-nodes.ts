import { Data } from "effect";

export interface Literal {
  _tag: "Literal";
  value: string;
}
export const Literal = Data.tagged<Literal>("Literal");

export interface Equal {
  _tag: "Equal";
  left: Literal;
  right: Literal;
}
export const Equal = Data.tagged<Equal>("Equal");

export interface Union {
  _tag: "Union";
  left: Equal | Union;
  right: Equal | Union;
}
export const Union = Data.tagged<Union>("Union");

export type Node = Literal | Equal | Union;

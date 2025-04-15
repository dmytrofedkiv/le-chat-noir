import { Effect, Equal, Match } from "effect";
import * as ast from "../parser/ast-nodes";

export function evaluate(node: ast.Literal): Effect.Effect<string>;
export function evaluate(node: ast.Equal): Effect.Effect<boolean>;
export function evaluate(node: ast.Union): Effect.Effect<boolean>;
export function evaluate(node: ast.Equal | ast.Union): Effect.Effect<boolean>;
export function evaluate(node: ast.Node): Effect.Effect<string | boolean> {
  return Match.value(node).pipe(
    Match.tag("Union", (node) =>
      Effect.zipWith(
        Effect.suspend(() => evaluate(node.left)),
        Effect.suspend(() => evaluate(node.right)),
        (left, right) => left && right,
      ),
    ),
    Match.tag("Equal", (node) =>
      Effect.zipWith(
        Effect.suspend(() => evaluate(node.left)),
        Effect.suspend(() => evaluate(node.right)),
        (left, right) => Equal.equals(left, right),
      ),
    ),
    Match.tag("Literal", (node) => Effect.succeed(node.value)),
    Match.exhaustive,
  );
}

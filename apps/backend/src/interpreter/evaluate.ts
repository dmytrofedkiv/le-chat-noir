import { Effect, Equal, Match } from "effect";
import { Node } from "../parser/ast-nodes";

export const evaluate = Match.type<Node>().pipe(
  Match.tag(
    "Equal",
    (node): Effect.Effect<boolean> =>
      Effect.zipWith(
        Effect.suspend(() => evaluate(node.left)),
        Effect.suspend(() => evaluate(node.right)),
        (left, right) => Equal.equals(left, right),
      ),
  ),
  Match.tag("Literal", (node) => Effect.succeed(node.value)),
  Match.exhaustive,
);

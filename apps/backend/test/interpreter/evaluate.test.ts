import { describe, expect, test } from "bun:test";
import { evaluate } from "../../src/interpreter/evaluate";
import { Effect } from "effect";
import { Equal, Literal } from "../../src/parser/ast-nodes";

describe(`function ${evaluate.name}`, () => {
  test("evaluate whether two literals are equal", () => {
    const node = Equal({
      left: Literal({ value: "value" }),
      right: Literal({ value: "value" }),
    });

    const result = evaluate(node);

    expect(Effect.runSync(result)).toBeTrue();
  });

  test("evaluate whether two literals are not equal", () => {
    const node = Equal({
      left: Literal({ value: "left" }),
      right: Literal({ value: "right" }),
    });

    const result = evaluate(node);

    expect(Effect.runSync(result)).toBeFalse();
  });
});

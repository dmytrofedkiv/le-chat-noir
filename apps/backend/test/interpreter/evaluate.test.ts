import { describe, expect, test } from "bun:test";
import { evaluate } from "../../src/interpreter/evaluate";
import { Effect } from "effect";
import { Equal, Literal, Union } from "../../src/parser/ast-nodes";

describe("evaluate function", () => {
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

  test("evaluate a union whether both sides are true", () => {
    const node = Union({
      left: Equal({
        left: Literal({ value: "value" }),
        right: Literal({ value: "value" }),
      }),
      right: Equal({
        left: Literal({ value: "value" }),
        right: Literal({ value: "value" }),
      }),
    });

    const result = evaluate(node);

    expect(Effect.runSync(result)).toBeTrue();
  });

  test("evaluate a union whether only one side is true", () => {
    const node = Union({
      left: Equal({
        left: Literal({ value: "value" }),
        right: Literal({ value: "value" }),
      }),
      right: Equal({
        left: Literal({ value: "left" }),
        right: Literal({ value: "right" }),
      }),
    });

    const result = evaluate(node);

    expect(Effect.runSync(result)).toBeFalse();
  });

  test("evaluate a union whether both sides are false", () => {
    const node = Union({
      left: Equal({
        left: Literal({ value: "value" }),
        right: Literal({ value: "value" }),
      }),
      right: Equal({
        left: Literal({ value: "left" }),
        right: Literal({ value: "right" }),
      }),
    });

    const result = evaluate(node);

    expect(Effect.runSync(result)).toBeFalse();
  });

  test("evaluate a deeply neasted union whether both sides are true", () => {
    const node = Union({
      left: Equal({
        left: Literal({ value: "value" }),
        right: Literal({ value: "value" }),
      }),
      right: Union({
        left: Equal({
          left: Literal({ value: "value" }),
          right: Literal({ value: "value" }),
        }),
        right: Equal({
          left: Literal({ value: "value" }),
          right: Literal({ value: "value" }),
        }),
      }),
    });

    const result = evaluate(node);

    expect(Effect.runSync(result)).toBeTrue();
  });

  test("evaluate a deeply neasted union whether only one side is true", () => {
    const node = Union({
      left: Equal({
        left: Literal({ value: "value" }),
        right: Literal({ value: "value" }),
      }),
      right: Union({
        left: Equal({
          left: Literal({ value: "value" }),
          right: Literal({ value: "value" }),
        }),
        right: Equal({
          left: Literal({ value: "left" }),
          right: Literal({ value: "right" }),
        }),
      }),
    });

    const result = evaluate(node);

    expect(Effect.runSync(result)).toBeFalse();
  });

  test("evaluate a deeply neasted union whether both sides are false", () => {
    const node = Union({
      left: Equal({
        left: Literal({ value: "left" }),
        right: Literal({ value: "right" }),
      }),
      right: Union({
        left: Equal({
          left: Literal({ value: "value" }),
          right: Literal({ value: "value" }),
        }),
        right: Equal({
          left: Literal({ value: "left" }),
          right: Literal({ value: "right" }),
        }),
      }),
    });

    const result = evaluate(node);

    expect(Effect.runSync(result)).toBeFalse();
  });
});

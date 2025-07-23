import { describe, expect, it } from "vitest";
import { NonDecreasingArray } from "./nondecreasingArray";

describe("NonDecreasingArray", () => {
    it.each([
        { data: [4, 2, 3], expected: true },
        { data: [4, 2, 1], expected: false },
        { data: [2, 3, 4, 2, 3], expected: false },
    ])("should solve return $expected when input is $data", ({ data, expected }) => {
        const actual = NonDecreasingArray.solve(data)
        expect(actual).toBeDefined()
        expect(actual).toEqual(expected)
    });
})
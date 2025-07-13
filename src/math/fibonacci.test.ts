import { describe, expect, it } from "vitest";
import { Fibonacci } from "./fibonacci";

describe("Fibonacci", () => {
    it.each([
        { data: 0, expected: 0 },
        { data: 1, expected: 1 },
        { data: 2, expected: 1 },
        { data: 3, expected: 2 },
        { data: 5, expected: 5 },
        { data: -6, expected: -8 },
    ])("should solve return $expected when input is $data", ({ data, expected }) => {
        const actual = Fibonacci.solve5(data)
        expect(actual).toBeDefined()
        expect(actual).toEqual(expected)
    });
})
import { describe, expect, it } from "vitest";
import { SquareSum } from "./squareSum";

describe("SquareSum", () => {
    it.each([
        { data: 5, expected: true },
        { data: 3, expected: false },
    ])("should solve return $expected when input is $data", ({ data, expected }) => {
        const actual = SquareSum.solve(data)
        expect(actual).toEqual(expected)
    });

    it.each([
        { data: 5, expected: true },
        { data: 3, expected: false },
    ])("should solve1 return $expected when input is $data", ({ data, expected }) => {
        const actual = SquareSum.solve1(data)
        expect(actual).toEqual(expected)
    });
})
import { describe, expect, it } from "vitest";
import { Sqrt } from "./sqrt";

describe("Sqrt", () => {
    it.each([
        { data: 0, expected: 0 },
        { data: 8, expected: 2 },
        { data: 9, expected: 3 },
        { data: 15, expected: 3 },
        { data: 144, expected: 12 },
    ])("should solve return $expected when input is $data", ({ data, expected }) => {
        const actual = Sqrt.solve(data)
        expect(actual).toEqual(expected)
    });

    it.each([
        { data: 0, expected: 0 },
        { data: 8, expected: 2 },
        { data: 9, expected: 3 },
        { data: 15, expected: 3 },
        { data: 144, expected: 12 },
    ])("should solve1 return $expected when input is $data", ({ data, expected }) => {
        const actual = Sqrt.solve1(data)
        expect(actual).toEqual(expected)
    });
})
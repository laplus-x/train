import { describe, expect, it } from "vitest";
import { IntegerPartition } from "./integerPartition";

describe("IntegerPartition", () => {
    it.each([
        { data: 1, expected: 1 },
        { data: 2, expected: 2 },
        { data: 3, expected: 3 },
        { data: 4, expected: 5 },
        { data: 5, expected: 7 },
        { data: 6, expected: 11 },
        { data: 7, expected: 15 },
        { data: 8, expected: 22 },
        { data: 9, expected: 30 },
        // { data: 10, expected: 42 },
        // { data: 20, expected: 627 },
        // { data: 30, expected: 5604 },
        // { data: 50, expected: 204226 },
        // { data: 100, expected: 190569292 },
    ])("should solve return $expected when input is $data", ({ data, expected }) => {
        const actual = IntegerPartition.solve(data)
        expect(actual).toBeDefined()
        expect(actual).toEqual(expected)
    });

    it.each([
        // { data: 1, expected: 1 },
        // { data: 2, expected: 1 },
        { data: 3, expected: 2 },
        // { data: 4, expected: 2 },
        // { data: 5, expected: 3 },
        // { data: 6, expected: 4 },
        // { data: 7, expected: 5 },
        // { data: 8, expected: 6 },
        // { data: 9, expected: 8 },
        // { data: 10, expected: 10 },
    ])("should solve1 return $expected when input is $data", ({ data, expected }) => {
        const actual = IntegerPartition.solve1(data)
        expect(actual).toBeDefined()
        expect(actual).toEqual(expected)
    });
})
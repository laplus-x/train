import { describe, expect, it } from "vitest";
import { Stock } from "./stock";

describe("Stock", () => {
    it.each([
        { data: [3, 4, 1, 6], expected: 5 },
        { data: [7, 6, 4, 3, 1], expected: 0 },
        { data: [7, 2, 4, 3, 10, 1], expected: 8 },
    ])("should solve return $expected when input is $data", ({ data, expected }) => {
        const actual = Stock.solve(data)
        expect(actual).toBeDefined()
        expect(actual).toEqual(expected)
    });

    it.each([
        { data: [7, 1, 5, 3, 6, 4], expected: 7 },
        { data: [1, 2, 3, 4, 5], expected: 4 },
        { data: [7, 6, 4, 3, 1], expected: 0 },
    ])("should solve1 return $expected when input is $data", ({ data, expected }) => {
        const actual = Stock.solve1(data)
        expect(actual).toBeDefined()
        expect(actual).toEqual(expected)
    });

    it.each([
        { data: [3, 3, 5, 0, 0, 3, 1, 4], expected: 6 },
        { data: [1, 2, 3, 4, 5], expected: 4 },
        { data: [7, 6, 4, 3, 1], expected: 0 },
    ])("should solve2 return $expected when input is $data", ({ data, expected }) => {
        const actual = Stock.solve2(data)
        expect(actual).toBeDefined()
        expect(actual).toEqual(expected)
    });

    it.each([
        { n: 2, data: [2, 4, 1], expected: 2 },
        { n: 2, data: [3, 2, 6, 5, 0, 3], expected: 7 },
    ])("should solve3 return $expected when input is $n and $data", ({ n, data, expected }) => {
        const actual = Stock.solve3(n, data)
        expect(actual).toBeDefined()
        expect(actual).toEqual(expected)
    });

    it.each([
        { data: [1, 2, 3, 0, 2], expected: 3 },
        { data: [1], expected: 0 },
    ])("should solve4 return $expected when input is $data", ({ data, expected }) => {
        const actual = Stock.solve4(data)
        expect(actual).toBeDefined()
        expect(actual).toEqual(expected)
    });

    it.each([
        { data: [1, 3, 2, 8, 4, 9], fee: 2, expected: 8 },
        { data: [1, 3, 7, 5, 10, 3], fee: 3, expected: 6 },
        { data: [1, 3, 7, 5, 1, 10, 3], fee: 3, expected: 9 },
    ])("should solve5 return $expected when input is $fee and $data", ({ data, fee, expected }) => {
        const actual = Stock.solve5(data, fee)
        expect(actual).toBeDefined()
        expect(actual).toEqual(expected)
    });
})
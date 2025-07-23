import { describe, expect, it } from "vitest";
import { BinarySearch } from "./binary";

describe("BinarySearch", () => {
    it.each([
        { data: [5, 7, 8, 10], t: 5, expected: 0 },
        { data: [5, 7, 8, 10], t: 8, expected: 2 },
        { data: [5, 7, 8, 10], t: 11, expected: -1 },
    ])("should solve return $expected when input is $data", ({ data, t, expected }) => {
        const actual = BinarySearch.solve(data, t)
        expect(actual).toBeDefined()
        expect(actual).toEqual(expected)
    });
})
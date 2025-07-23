import { describe, expect, it } from "vitest";
import { MergeSortedArray } from "./mergeSortedArray";

describe("MergeSortedArray", () => {
    it.each([
        { n1: [1, 2, 3, 0, 0, 0], m: 3, n2: [2, 5, 6], n: 3, expected: [1, 2, 2, 3, 5, 6] },
        { n1: [0], m: 1, n2: [2], n: 1, expected: [2] },
    ])("should solve return $expected when input is $data", ({ n1, m, n2, n, expected }) => {
        MergeSortedArray.solve(n1, m, n2, n)
        expect(n1).toEqual(expected)
    });
})
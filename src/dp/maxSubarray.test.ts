import { describe, expect, it } from "vitest";
import { MaxSubArray } from "./maxSubarray";

describe("MaxSubArray", () => {
    it.each([
        { data: [-2, 1, -3, 4, -1, 2, 1, -5, 4], expected: 6 },
        { data: [1], expected: 1 },
        { data: [5, 4, -1, 7, 8], expected: 23 },
    ])("should solve return $expected when input is $data", ({ data, expected }) => {
        const actual = MaxSubArray.solve(data)
        expect(actual).toBeDefined()
        expect(actual).toEqual(expected)
    });
})
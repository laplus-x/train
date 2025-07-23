import { describe, expect, it } from "vitest";
import { LongestSubstring } from "./longestSubstring";

describe("LongestSubstring", () => {
    it.each([
        { data: "aaabb", k: 3, expected: 3 },
        { data: "aabba", k: 3, expected: 0 },
        { data: "ababbc", k: 2, expected: 5 },
    ])("should solve return $expected when input is $data", ({ data, k, expected }) => {
        const actual = LongestSubstring.solve(data, k)
        expect(actual).toEqual(expected)
    });
})
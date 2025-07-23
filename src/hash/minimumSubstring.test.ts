import { describe, expect, it } from "vitest";
import { MinimumSubstring } from "./minimumSubstring";

describe("MinimumSubstring", () => {
    it.each([
        // { data: "ADOBECODEBAANC", t: "ABC", expected: "BAANC" },
        { data: "aaaaccaaabb", t: "abc", expected: "caaab" },
        // { data: "a", t: "a", expected: "a" },
        // { data: "a", t: "aa", expected: "" },
    ])("should solve return $expected when input is $data", ({ data, t, expected }) => {
        const actual = MinimumSubstring.solve(data, t)
        expect(actual).toEqual(expected)
    });
})
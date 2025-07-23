import { describe, expect, it } from "vitest";
import { LongestWordDictionary } from "./longestWordDictionary";

describe("LongestWordDictionary", () => {
    it.each([
        { data: "abpcplea", dict: ["ale", "apple", "monkey", "plea"], expected: "apple" },
        { data: "abpcplea", dict: ["a", "b", "c"], expected: "a" },
        { data: "abpcplea", dict: ["m"], expected: "" },
    ])("should solve return $expected when input is $data", ({ data, dict, expected }) => {
        const actual = LongestWordDictionary.solve(data, dict)
        expect(actual).toBeDefined()
        expect(actual).toEqual(expected)
    });
})
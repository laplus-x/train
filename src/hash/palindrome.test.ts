import { describe, expect, it } from "vitest";
import { Palindrome } from "./palindrome";

describe("Palindrome", () => {
    it.each([
        { data: "aba", expected: true },
        { data: "abca", expected: true },
        { data: "abac", expected: true },
        { data: "caba", expected: true },
        { data: "abbac", expected: true },
        { data: "abc", expected: false },
    ])("should solve return $expected when input is $data", ({ data, expected }) => {
        const actual = Palindrome.solve(data)
        expect(actual).toBeDefined()
        expect(actual).toEqual(expected)
    });
})
import { describe, expect, it } from "vitest";
import { BurstBalloon } from "./burstBalloon";

describe("BurstBalloon", () => {
    it.each([
        { data: [[10, 16], [2, 8], [1, 6], [7, 12]], expected: 2 },
        { data: [[1, 2], [3, 4], [5, 6], [7, 8]], expected: 4 },
        { data: [[1, 2], [2, 3], [3, 4], [4, 5]], expected: 2 },
    ])("should solve return $expected when input is $data", ({ data, expected }) => {
        const actual = BurstBalloon.solve(data)
        expect(actual).toBeDefined()
        expect(actual).toEqual(expected)
    });
})
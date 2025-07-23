import { describe, expect, it } from "vitest";
import { PlaceFlower } from "./placeFlower";

describe("NonDecreasingArray", () => {
    it.each([
        { data: [1, 0, 0, 0, 1], n: 1, expected: true },
        { data: [1, 0, 0, 0, 1], n: 2, expected: false },
        { data: [0, 1, 0, 0, 1], n: 1, expected: false },
        { data: [0, 1, 0, 0, 0], n: 1, expected: true },
    ])("should solve return $expected when input is $data", ({ data, n, expected }) => {
        const actual = PlaceFlower.solve(data, n)
        expect(actual).toBeDefined()
        expect(actual).toEqual(expected)
    });
})
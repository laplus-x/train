import { describe, expect, it } from "vitest";
import { QueueReconstruction } from "./queueReconstruction";

describe("QueueReconstruction", () => {
    it.each([
        { data: [[7, 0], [4, 4], [7, 1], [5, 0], [6, 1], [5, 2]], expected: [[5, 0], [7, 0], [5, 2], [6, 1], [4, 4], [7, 1]] },
        { data: [[6, 0], [5, 0], [4, 0], [3, 2], [2, 2], [1, 4]], expected: [[4, 0], [5, 0], [2, 2], [3, 2], [1, 4], [6, 0]] },
    ])("should solve return $expected when input is $data", ({ data, expected }) => {
        const actual = QueueReconstruction.solve(data)
        expect(actual).toBeDefined()
        expect(actual).toEqual(expected)
    });
})
import { describe, expect, it } from "vitest";
import { PartitionLabel } from "./partitionLabel";

describe("PartitionLabel", () => {
    it.each([
        { data: "ababcbacadefegdehijhklij", expected: [9, 7, 8] },
        { data: "eccbbbbdec", expected: [10] },
    ])("should solve return $expected when input is $data", ({ data, expected }) => {
        const actual = PartitionLabel.solve(data)
        expect(actual).toBeDefined()
        expect(actual).toEqual(expected)
    });
})
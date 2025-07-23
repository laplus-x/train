import { describe, expect, it } from "vitest";
import { LinkedListCycle, ListNode } from "./linkedListCycle";

describe("LinkedListCycle", () => {
    it.each([
        { head: [3, 2, 0, -4], pos: 1, expected: new ListNode(2) },
        { head: [1, 2], pos: 0, expected: new ListNode(1) },
        { head: [1], pos: -1, expected: null },
    ])("should solve return $expected when input is $data", ({ head, pos, expected }) => {
        const data = ListNode.generate(head, pos)
        const actual = LinkedListCycle.solve(data)
        expect(actual).toBeDefined()
        expect(actual?.value).toEqual(expected?.value)
    });
})
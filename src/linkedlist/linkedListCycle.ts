type Nullable<T> = T | null | undefined

// 142
export class LinkedListCycle {
    public static solve(head: ListNode): Nullable<ListNode> {
        for (let slow: Nullable<ListNode> = head.next, fast: Nullable<ListNode> = head.next?.next;
            slow && fast?.next;
            slow = slow.next, fast = fast.next.next) {
            if (slow !== fast) continue

            let pointer: Nullable<ListNode> = head
            while (slow && pointer && pointer !== slow) {
                pointer = pointer.next
                slow = slow.next
            }
            return pointer
        }
        return null
    }
}

export class ListNode {
    public value: number;
    public next: Nullable<ListNode>;

    constructor(value: number = 0, next: Nullable<ListNode> = null) {
        this.value = value;
        this.next = next
    }

    public static generate(head: number[], pos: number): ListNode {
        const tmp = new ListNode()

        let curr = tmp
        let cycleNode = null
        for (let i = 0; i < head.length; i++) {
            curr.next = new ListNode(head[i])
            curr = curr.next
            if (i === pos) cycleNode = curr
        }
        if (cycleNode !== null) {
            curr.next = cycleNode
        }
        return tmp.next!
    }
}
export class MaxSubArray {
    public static solve(n: number[]) {
        if (n.length === 0) return 0
        else if (n.length === 1) return n[0]

        let sum = n[0]
        let result = n[0]
        for (let i = 1; i < n.length; i++) {
            sum = Math.max(sum + n[i], n[i])
            result = Math.max(result, sum)
        }
        return result
    }
}
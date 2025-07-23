export class Sqrt {
    public static solve(n: number) {
        if (n === 0) return 0;

        let result = 1
        while (result ** 2 <= n) {
            result++
        }
        return result - 1
    }

    public static solve1(n: number) {
        for (let i = n >> 1, left = 0, right = n; left < right; i = Math.floor((right + left) / 2)) {
            const v = i ** 2
            const nv = (i + 1) ** 2
            if (v <= n && nv > n) {
                return i
            }
            if (v < n) {
                left = i
            } else {
                right = i
            }
        }
        return 0
    }
}
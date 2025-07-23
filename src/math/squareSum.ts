export class SquareSum {
    public static solve(n: number): boolean {
        const sq: Record<number, boolean> = {}
        for (let i = 1; i ** 2 < n; i++) {
            sq[i ** 2] = true
        }
        for (let i = 1; i ** 2 < n; i++) {
            if (sq[n - i ** 2]) return true
        }
        return false
    }

    public static solve1(n: number): boolean {
        for (let i = 1, j = Math.floor(Math.sqrt(n)); i <= j;) {
            const sum = i ** 2 + j ** 2
            if (sum === n) return true
            if (sum < n) i++
            else j--
        }
        return false
    }
}
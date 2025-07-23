export class Stock {
    // 121
    public static solve(prices: number[]) {
        return this.solve3(1, prices)
    }

    // 122
    public static solve1(prices: number[]) {
        let result = 0
        let hold = -Infinity
        for (const price of prices) {
            [hold, result] = [Math.max(hold, result - price), Math.max(result, hold + price)]
        }
        return result
    }

    // 123
    public static solve2(prices: number[]) {
        return this.solve3(2, prices)
    }

    // 188
    public static solve3(k: number, prices: number[]) {
        const result = Array(k + 1).fill(0)
        const hold = Array(k + 1).fill(-Infinity)
        for (const price of prices) {
            for (let i = k; i > 0; i--) {
                [hold[i], result[i]] = [Math.max(hold[i], result[i - 1] - price), Math.max(result[i], hold[i] + price)]
            }
        }
        return result[k]
    }

    // 309
    public static solve4(prices: number[]) {
        let pre_result = 0
        let result = 0
        let hold = -Infinity
        for (const price of prices) {
            const pre = result;
            [hold, result] = [Math.max(hold, pre_result - price), Math.max(result, hold + price)];
            pre_result = pre
        }
        return result
    }

    // 714
    public static solve5(prices: number[], fee: number) {
        let result = 0
        let hold = -Infinity
        for (const price of prices) {
            [hold, result] = [Math.max(hold, result - price), Math.max(result, hold + price - fee)];
        }
        return result
    }
}
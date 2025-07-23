// 665
export class NonDecreasingArray {
    public static solve(n: number[]) {
        let count = 0
        for (let i = 0; i < n.length; i++) {
            if (n[i] > n[i + 1]) {
                count++;
                if (count > 1) return false;

                if (i === 0 || n[i - 1] <= n[i + 1]) {
                    n[i] = n[i + 1];
                } else {
                    n[i + 1] = n[i];
                }
            }

        }
        return true
    }
}
// 763
export class PartitionLabel {
    public static solve(s: string): number[] {
        let result = []

        const idx: Record<string, number> = {}
        for (const c of s) {
            idx[c] ??= s.lastIndexOf(c)
        }

        let l = 0
        for (let i = 0, j = 0; i + l < s.length; l++) {
            if (i + l > j) {
                result.push(l);
                [i, l] = [i + l, 0]
            };
            j = Math.max(j, idx[s[i + l]])
        }
        result.push(l)

        return result
    }
}
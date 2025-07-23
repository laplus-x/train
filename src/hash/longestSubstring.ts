// 395
export class LongestSubstring {
    public static solve(s: string, k: number): number {
        const freq: Record<string, number> = {}
        for (const c of s) {
            freq[c] = (freq[c] ?? 0) + 1
        }

        for (let i = 0; i < s.length; i++) {
            if (freq[s[i]] < k) {
                const left = LongestSubstring.solve(s.slice(0, i), k)
                const right = LongestSubstring.solve(s.slice(i + 1, 0), k)
                return Math.max(left, right)
            }
        }

        return s.length
    }
}
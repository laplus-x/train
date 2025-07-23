// 680
export class Palindrome {
    public static solve(s: string): boolean {
        const freq: Record<string, number> = {}
        for (const c of s) {
            freq[c] = (freq[c] ?? 0) + 1
        }

        let count = 0
        for (let i = 0, j = s.length - 1; i < j;) {
            if (s[i] === s[j]) {
                i++
                j--
            } else if (freq[s[i]] === 1) {
                count++
                i++
            } else if (freq[s[j]] === 1) {
                count++
                j--
            }
            if (count > 1) return false
        }
        return true
    }
}
// 76
export class MinimumSubstring {
    public static solve(s: string, t: string): string {
        if (s.length < t.length) return "";

        const need: Record<string, number> = {};
        const window: Record<string, number> = {};

        for (const c of t) {
            need[c] = (need[c] || 0) + 1;
        }
        const keys = Object.keys(need)

        let start = 0, len = Infinity;
        for (let left = 0, right = 0, count = 0; right < s.length; right++) {
            const c = s[right];

            if (need[c] === undefined) continue

            window[c] = (window[c] || 0) + 1;
            if (window[c] === need[c]) count++;

            for (; count === keys.length; left++) {
                if (right - left < len) {
                    start = left;
                    len = right - left + 1;
                }

                const d = s[left];

                if (need[d] === undefined) continue

                if (window[d] === need[d]) count--;
                window[d]--;
            }
        }

        return len === Infinity ? "" : s.substring(start, start + len);
    }
}
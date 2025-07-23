// 524
export class LongestWordDictionary {
    public static solve(s: string, dict: string[]) {
        let result = ""
        for (const d of dict) {
            if (d.length <= result.length) continue

            let i = 0
            for (let j = 0; i < d.length && j < s.length;) {
                if (d[i] === s[j]) i++
                else j++
            }
            if (i < d.length) continue
            
            result = d
        }
        return result
    }
}
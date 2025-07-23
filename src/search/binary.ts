export class BinarySearch {
    public static solve(n: number[], t: number) {
        for (let i = n.length >> 1, left = 0, right = n.length - 1; left <= right; i = Math.floor((left + right) / 2)) {
            if (n[i] === t) return i
            if (n[i] < t) left = i + 1
            else if (n[i] > t) right = i
        }
        return -1
    }
}
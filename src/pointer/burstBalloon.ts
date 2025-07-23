// 452
export class BurstBalloon {
    public static solve(points: number[][]): number {
        points = points.sort((a, b) => a[0] - b[0])

        let result = 0
        for (let i = 0, p = -1; i < points.length; i++) {
            const [left, right] = points[i]
            if (left <= p) continue
            result++
            p = right
        }
        return result
    }
}
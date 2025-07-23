// 406
export class QueueReconstruction {
    public static solve(people: number[][]): number[][] {
        // h 降序，k 升序
        people.sort((a, b) => a[0] !== b[0] ? b[0] - a[0] : a[1] - b[1]);

        let result: number[][] = []
        for (const person of people) {
            result.splice(person[1], 0, person);
        }
        return result
    }
}
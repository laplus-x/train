export class PlaceFlower {
    public static solve(flowerbed: number[], n: number): boolean {
        for (let i = 0; i < flowerbed.length; i++) {
            if ((i === 0 && !flowerbed[i] && !flowerbed[i + 1]) ||
                (!flowerbed[i - 1] && !flowerbed[i] && !flowerbed[i + 1]) ||
                (!flowerbed[i - 1] && !flowerbed[i] && i === flowerbed.length - 1)) {
                n--
                flowerbed[i] = 1
                if (n === 0) return true
            }
        }
        return false
    }
}
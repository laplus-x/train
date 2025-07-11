import { describe, expect, it } from "vitest";
import { Base5, UpsideDownNumber } from "./upsideDownNumber";

describe("Base5", () => {
    it.each([
        { data: "10", expected: 5 },
        { data: "88", expected: 18 },
    ])("should encode return $expected when input is $data", ({ data, expected }) => {
        const actual = Base5.encode(data)
        expect(actual).toBeDefined()
        expect(actual).toEqual(expected)
    });

    it.each([
        { data: 5, expected: "10", },
        { data: 18, expected: "88" },
    ])("should decode return $expected when input is $data", ({ data, expected }) => {
        const actual = Base5.decode(data)
        expect(actual).toBeDefined()
        expect(actual).toEqual(expected)
    });
});

describe("UpsideDownNumber", () => {
    it.each([
        { data: "5", expected: "6" },
        { data: "7", expected: "8" },
        { data: "9", expected: "9" },
    ])('should ceilChar return $expected when input is $data', ({ data, expected }) => {
        const actual = UpsideDownNumber.ceilChar(data)
        expect(actual).toBeDefined()
        expect(actual).toEqual(expected)
    })
    it.each([
        { data: "5", expected: "1" },
        { data: "7", expected: "6" },
        { data: "9", expected: "9" },
    ])('should floorChar return $expected when input is $data', ({ data, expected }) => {
        const actual = UpsideDownNumber.floorChar(data)
        expect(actual).toBeDefined()
        expect(actual).toEqual(expected)
    })
    it.each([
        { data: "19", expected: "19" },
        { data: "29", expected: "60" },
        { data: "79", expected: "80" },
        { data: "97", expected: "98" },
    ])('should ceilPrefix return $expected when input is $data', ({ data, expected }) => {
        const actual = UpsideDownNumber.ceilPrefix(data)
        expect(actual).toBeDefined()
        expect(actual).toEqual(expected)
    })
    it.each([
        { data: "19", expected: "19" },
        { data: "29", expected: "19" },
        { data: "79", expected: "69" },
        { data: "97", expected: "96" },
    ])('should floorPrefix return $expected when input is $data', ({ data, expected }) => {
        const actual = UpsideDownNumber.floorPrefix(data)
        expect(actual).toBeDefined()
        expect(actual).toEqual(expected)
    })

    it.each([
        { data: "0", expected: "0" },
        { data: "2", expected: "8" },
        { data: "9", expected: "11" },
        { data: "10", expected: "11" },
        { data: "19", expected: "69" },
        { data: "99", expected: "101" },
        { data: "109", expected: "111" },
        { data: "190", expected: "609" },
        { data: "999", expected: "1001" },
        { data: "1009", expected: "1111" },
        { data: "3241", expected: "6009" },
    ])('should start return $expected when input is $data', ({ data, expected }) => {
        const actual = UpsideDownNumber.start(data)
        expect(actual).toBeDefined()
        expect(actual).toEqual(expected)
    })
    it.each([
        { data: "0", expected: "0" },
        { data: "2", expected: "1" },
        { data: "6", expected: "1" },
        { data: "10", expected: "8" },
        { data: "19", expected: "11" },
        { data: "99", expected: "96" },
        { data: "100", expected: "96" },
        { data: "109", expected: "101" },
        { data: "190", expected: "181" },
        { data: "999", expected: "986" },
        { data: "1000", expected: "986" },
        { data: "1009", expected: "1001" },
        { data: "3241", expected: "1961" },
    ])('should end return $expected when input is $data', ({ data, expected }) => {
        const actual = UpsideDownNumber.end(data)
        expect(actual).toBeDefined()
        expect(actual).toEqual(expected)
    })
    it.each([
        // { min: "0", max: "10", expected: 3 },
        // { min: "10", max: "100", expected: 4 },
        // { min: "100", max: "999", expected: 12 },
        // { min: "1000", max: "9999", expected: 20 },
        // { min: "10000", max: "99999", expected: 60 },
        // { min: "100000", max: "999999", expected: 100 },
        // { min: "1000000", max: "9999999", expected: 300 },
        // { min: "10000000", max: "99999999", expected: 500 },

        { min: "8", max: "0", expected: 0 },
        { min: "6", max: "25", expected: 2 },
        { min: "0", max: "1000", expected: 19 },
        { min: "69", max: "10001", expected: 36 },
        { min: "846", max: "99066", expected: 82 },
        { min: "616", max: "861198", expected: 150 },
        { min: "86199", max: "32414333", expected: 547 },
        { min: "100000", max: "12345678900000000", expected: 718650 },
        { min: "10000000000", max: "10000000000000000000000", expected: 78120000 },
        { min: "861813545615", max: "9813815838784151548487", expected: 74745418 },
        { min: "5748392065435706", max: "643572652056324089572278742", expected: 2978125000 },
        { min: "9090908074312", max: "617239057843276275839275848", expected: 2919867187 },
        { min: "1", max: "45898942362076547326957326537845432452352", expected: 209808349609373 },
    ])('should solve return $expected when input from $min to $max', ({ min, max, expected }) => {
        const actual = UpsideDownNumber.solve(min, max)
        // console.log({ min, max, actual })
        expect(actual).toBeDefined()
        expect(actual).toEqual(expected)
    })
})
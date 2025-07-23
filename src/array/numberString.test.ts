import { describe, expect, it } from "vitest";
import { NumberString } from "./numberString";

describe("NumberString", () => {
    it.each([
        { data: "00.00", expected: { sign: 0, value: "0", exp: 0 } },
        { data: "00.03", expected: { sign: 0, value: "3", exp: -2 } },
        { data: "-10", expected: { sign: 1, value: "1", exp: 1 } },
        { data: "88", expected: { sign: 0, value: "88", exp: 0 } },
        { data: "3.000001", expected: { sign: 0, value: "3000001", exp: -6 } },
    ])("should NumberString return $expected when input is $data", ({ data, expected }) => {
        const actual = new NumberString(data)
        expect(actual).toBeDefined()
        expect(actual).toEqual(expected)
    });

    it.each([
        { data: "00.00", expected: "0" },
        { data: "00.03", expected: "0.03" },
        { data: "-10", expected: "-10" },
        { data: "88", expected: "88" },
    ])("should toString return $expected when input is $data", ({ data, expected }) => {
        const actual = new NumberString(data).toString()
        expect(actual).toBeDefined()
        expect(actual).toEqual(expected)
    });

    it.each([
        { data: "0", expected: "0" },
        { data: "0.03", expected: "-0.03" },
        { data: "-10", expected: "10" },
        { data: "88", expected: "-88" },
    ])("should neg return $expected when input is $data", ({ data, expected }) => {
        const n = new NumberString(data)
        const actual = n.neg().toString()
        expect(actual).toBeDefined()
        expect(actual).toEqual(expected)
    });

    it.each([
        { n1: "9", n2: "10", expected: -1 },
        { n1: "10", n2: "9", expected: 1 },
        { n1: "1", n2: "1", expected: 0 },
    ])("should compare return $expected when input is $n1 and $n2", ({ n1, n2, expected }) => {
        const v1 = new NumberString(n1)
        const v2 = new NumberString(n2)
        const actual = v1.compare(v2)
        expect(actual).toBeDefined()
        expect(actual).toEqual(expected)
    });

    it.each([
        { n1: "10", n2: "2", expected: "8" },
        { n1: "2", n2: "2", expected: "0" },
    ])("should sub return $expected when input is $n1 and $n2", ({ n1, n2, expected }) => {
        const v1 = new NumberString(n1)
        const v2 = new NumberString(n2)
        const actual = v1.sub(v2).toString()
        expect(actual).toBeDefined()
        expect(actual).toEqual(expected)
    });

    it.each([
        { n1: "1", n2: "9", expected: "10" },
        { n1: "0", n2: "1000", expected: "1000" },
        { n1: "02.01", n2: "-3.0000", expected: "-0.99" },
        { n1: "-02.01", n2: "3.0000", expected: "0.99" },
        { n1: "-2", n2: "-3.000001", expected: "-5.000001" },
    ])("should add return $expected when input is $n1 and $n2", ({ n1, n2, expected }) => {
        const v1 = new NumberString(n1)
        const v2 = new NumberString(n2)
        const actual = v1.add(v2).toString()
        expect(actual).toBeDefined()
        expect(actual).toEqual(expected)
    });

    it.each([
        { n1: "0", n2: "-1000", expected: "0" },
        { n1: "02.01", n2: "3.0000", expected: "6.03" },
        { n1: "2", n2: "-3.000001", expected: "-6.000002" },
        { n1: "0.00080", n2: "0.01000001", expected: "0.000008000008" },
    ])("should mul return $expected when input is $n1 and $n2", ({ n1, n2, expected }) => {
        const v1 = new NumberString(n1)
        const v2 = new NumberString(n2)
        const actual = v1.mul(v2).toString()
        expect(actual).toBeDefined()
        expect(actual).toEqual(expected)
    });

    it.each([
        { n1: "0", n2: "2", expected: "0" },
        { n1: "2", n2: "0", expected: "Infinity" },
        { n1: "1", n2: "3", expected: "0.33333" },
        { n1: "1", n2: "2", expected: "0.5" },
        { n1: "1", n2: "-1000", expected: "-0.001" },
    ])("should div return $expected when input is $n1 and $n2", ({ n1, n2, expected }) => {
        const v1 = new NumberString(n1)
        const v2 = new NumberString(n2)
        const actual = v1.div(v2).toString()
        expect(actual).toBeDefined()
        expect(actual).toEqual(expected)
    });
});
import { describe, expect, it } from "vitest";
import { Base91 } from "./base91";

describe("Base91", () => {
    it.each([
        {
            data: "test",
            expected: "fPNKd"
        },
        {
            data: "Hello World!",
            expected: ">OwJh>Io0Tv!8PE"
        },
    ])("should encode return $expected when input is $data", ({ data, expected }) => {
        const actual = Base91.encode(data)
        expect(actual).toBeDefined()
        expect(actual).toEqual(expected)
    });

    it.each([
        {
            data: "fPNKd",
            expected: "test",
        },
        {
            data: ">OwJh>Io0Tv!8PE",
            expected: "Hello World!"
        },
    ])("should decode return $expected when input is $data", ({ data, expected }) => {
        const actual = Base91.decode(data)
        expect(actual).toBeDefined()
        expect(actual).toEqual(expected)
    });
});

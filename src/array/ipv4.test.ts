import { describe, expect, it } from "vitest";
import { IpSubnet, IPv4 } from "./ipv4";

describe("IpSubnet", () => {
    it.each([
        {
            data: "101.12.145.122", sub: "255.255.255.252",
            expected: {
                count: 4,
                ip: new IPv4("101.12.145.122"),
                subnet: new IPv4("255.255.255.252"),
                wildcard: new IPv4("0.0.0.3"),
                network: new IPv4("101.12.145.120"),
                broadcast: new IPv4("101.12.145.123")
            },
        },
        {
            data: "101.12.145.122", sub: "255.255.255.255",
            expected: {
                count: 1,
                ip: new IPv4("101.12.145.122"),
                subnet: new IPv4("255.255.255.255"),
                wildcard: new IPv4("0.0.0.0"),
                network: new IPv4("101.12.145.122"),
                broadcast: new IPv4("101.12.145.122")
            },
        },
    ])("should IpSubnet return $expected when input is $data", ({ data, sub, expected }) => {
        const actual = new IpSubnet(data, sub)
        expect(actual).toBeDefined()
        expect(actual).toEqual(expected)
    });

    it.each([
        {
            data: "101.12.145.122", sub: "255.255.255.252",
            expected: {
                count: 2,
                start: new IPv4("101.12.145.121"),
                end: new IPv4("101.12.145.122"),
            },
        },
        {
            data: "101.12.145.122", sub: "255.255.255.254",
            expected: null,
        },
    ])("should IpSubnet return $expected when input is $data", ({ data, sub, expected }) => {
        const ip = new IpSubnet(data, sub)
        const actual = ip.usage
        expect(actual).toBeDefined()
        expect(actual).toEqual(expected)
    });
})

describe("IPv4", () => {
    it.each([
        { data: 0, expected: "0.0.0.0", },
        { data: 256, expected: "0.0.1.0", },
    ])("should IPv4 return $expected when input is $data", ({ data, expected }) => {
        const ip = new IPv4(data)
        const actual = ip.toString()
        expect(actual).toBeDefined()
        expect(actual).toEqual(expected)
    });

    it.each([
        { data: "0.0.0.0", expected: "0.0.0.1", },
        { data: "0.0.0.255", expected: "0.0.1.0", },
        { data: "101.12.145.120", expected: "101.12.145.121", },
    ])("should next return $expected when input is $data", ({ data, expected }) => {
        const ip = new IPv4(data)
        const actual = ip.next().toString()
        expect(actual).toBeDefined()
        expect(actual).toEqual(expected)
    });

    it.each([
        { data: "0.0.0.1", expected: "0.0.0.0", },
        { data: "0.0.1.0", expected: "0.0.0.255", },
    ])("should prev return $expected when input is $data", ({ data, expected }) => {
        const ip = new IPv4(data)
        const actual = ip.prev().toString()
        expect(actual).toBeDefined()
        expect(actual).toEqual(expected)
    });
});
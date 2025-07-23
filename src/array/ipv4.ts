export class IpSubnet {
    public readonly ip: IPv4;
    public readonly subnet: IPv4;

    public readonly count: number;
    public readonly wildcard: IPv4;

    public readonly network: IPv4;
    public readonly broadcast: IPv4;

    constructor(ip: string, subnet: string) {
        this.ip = new IPv4(ip)
        this.subnet = new IPv4(subnet)

        this.count = IPv4.MAX_VALUE - this.subnet.value
        this.wildcard = new IPv4(this.count - 1)

        const d = this.ip.class(4)
        const n = this.ip.value - (d % this.count)
        this.network = new IPv4(n)
        this.broadcast = new IPv4(n + this.count - 1)
    }

    public get usage() {
        if (this.count < 3) return null;
        return {
            start: this.network.next(),
            end: this.broadcast.prev(),
            count: this.count - 2,
        }
    }
}

export class IPv4 {
    public static readonly MAX_VALUE = (1 << 32) - 1
    private static readonly BYTE_SIZE = 8
    private static readonly SIZE = 4

    private readonly addr: number[];

    constructor(ip: string)
    constructor(ip: number)
    constructor(ip: number[])
    constructor(ip: string | number | number[]) {
        if (typeof ip === "string") {
            this.addr = ip.split(".").map(Number)
        } else if (typeof ip === "number") {
            let tmp = ip
            this.addr = Array.from({ length: IPv4.SIZE }, () => {
                const v = tmp & this.bitmask(IPv4.BYTE_SIZE)
                tmp >>= IPv4.BYTE_SIZE
                return v
            }).reverse()
        } else {
            this.addr = ip
        }
        this.isValid()
    }

    private bitmask(size: number): number {
        return (1 << size) - 1
    }

    private isValid() {
        if (this.addr.length !== IPv4.SIZE) throw new Error("Invalid length")
        if (this.addr.some(isNaN)) throw new Error("Invalid format")
        if (this.addr.some(i => i > this.bitmask(IPv4.BYTE_SIZE) || i < 0)) throw new Error("Invalid value")
    }

    public class(n: number) {
        return this.addr[n - 1]
    }

    public prev(): IPv4 {
        const result = Array(IPv4.SIZE + 1).fill(0)
        result[0]--

        const value = this.addr.reverse()
        for (let i = 0; i < value.length; i++) {
            let v = result[i] + value[i]
            if (v < 0) {
                result[i + 1]--
                v += 1 << IPv4.BYTE_SIZE
            }
            result[i] = v
        }
        if (result[IPv4.SIZE] !== 0) throw new Error("Invalid value")
        return new IPv4(result.reverse().slice(1))
    }

    public next(): IPv4 {
        const result = Array(IPv4.SIZE + 1).fill(0)
        result[0]++

        const value = this.addr.reverse()
        for (let i = 0; i < value.length; i++) {
            const v = result[i] + value[i]
            result[i + 1] += v >> IPv4.BYTE_SIZE
            result[i] = v & this.bitmask(IPv4.BYTE_SIZE)
        }
        if (result[IPv4.SIZE] !== 0) throw new Error("Invalid value")
        return new IPv4(result.reverse().slice(1))
    }

    public get value() {
        return this.addr.reduce((prev, curr) => (prev << IPv4.BYTE_SIZE) + curr, 0)
    }

    public toBinaryString() {
        return this.addr.map(i => i.toString(2).padStart(IPv4.BYTE_SIZE, "0")).join(".")
    }

    public toString() {
        return this.addr.join(".")
    }
}
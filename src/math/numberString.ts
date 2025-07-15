export class NumberString {
    public exp: number
    public sign: number;
    public value: string;

    constructor()
    constructor(value: string)
    constructor(value: string, sign: number, exp: number)
    constructor(value: string = "0", sign: number = 0, exp: number = 0) {
        this.sign = sign;
        this.exp = exp;
        if (/^\w+$/.test(value)) {
            this.value = value
            return
        }

        this.sign |= +value.startsWith('-')
        if (value.startsWith('-')) {
            value = value.slice(1)
        }
        const [e, v] = this.scientific(value)
        this.exp += e
        this.value = v
    }

    public neg(): NumberString {
        return new NumberString(this.value, this.sign ^ 1, this.exp)
    }

    public sub(n: NumberString): NumberString {
        if (this.value === '0') return n.neg()
        else if (n.value === '0') return this
        else if (this.sign ^ n.sign) this.add(n.neg())

        let value1, value2: string;
        const result = new NumberString()
        result.sign = this.sign;
        [result.exp, value1, value2] = this.align(this, n)

        if (value1.length < value2.length || (value1.length === value2.length && value1.localeCompare(value2) < 0)) {
            [value1, value2] = [value2, value1]
            result.sign ^= 1;
        }
        const v1 = value1.split('').reverse()
        const v2 = value2.split('').reverse()

        const arr = Array(v1.length).fill(0)
        for (let i = 0; i < v1.length; i++) {
            const prev = arr[i]
            let v = Number(v1[i]) - Number(v2[i] ?? '0') + prev
            if (v < 0) {
                arr[i + 1] -= 1
                v += 10
            }
            arr[i] = v
        }

        const [e, v] = this.scientificInteger(arr.reverse().join(''))
        result.value = v
        result.exp += e
        return result
    }

    public add(n: NumberString): NumberString {
        if (this.value === '0') return n
        else if (n.value === '0') return this
        else if (this.sign ^ n.sign) return this.sub(n.neg())

        let value1, value2: string;
        const result = new NumberString()
        result.sign = this.sign;
        [result.exp, value1, value2] = this.align(this, n)
        if (value1.length < value2.length) {
            [value1, value2] = [value2, value1]
        }
        const v1 = value1.split('').reverse()
        const v2 = value2.split('').reverse()

        const arr = Array(v1.length + 1).fill(0)
        for (let i = 0; i < v1.length; i++) {
            const prev = arr[i]
            const v = Number(v1[i]) + Number(v2[i] ?? '0') + prev
            arr[i + 1] += Math.floor(v / 10)
            arr[i] = v % 10
        }

        const [e, v] = this.scientificInteger(arr.reverse().join(''))
        result.value = v
        result.exp += e
        return result
    }

    public mul(n: NumberString): NumberString {
        const result = new NumberString()
        if (this.value === '0' || n.value === '0') return result

        result.sign = this.sign ^ n.sign
        result.exp = this.exp + n.exp

        const v1 = this.value.split('').reverse()
        const v2 = n.value.split('').reverse()

        const arr = Array(v1.length + v2.length).fill(0)
        for (let i = 0; i < v1.length; i++) {
            for (let j = 0; j < v2.length; j++) {
                const prev = arr[i + j]
                const v = Number(v1[i]) * Number(v2[j]) + prev
                arr[i + j + 1] += Math.floor(v / 10)
                arr[i + j] = v % 10
            }
        }

        const [e, v] = this.scientificInteger(arr.reverse().join(''))
        result.value = v
        result.exp += e
        return result
    }

    public div(n: NumberString): NumberString {
        if (this.value === '0') return this
        else if (n.value === '0') return new NumberString("Infinity", this.sign, 0)

        let value1, value2: string;
        const result = new NumberString()
        result.sign = this.sign ^ n.sign;
        [result.exp, value1, value2] = this.align(this, n)

        const pad = 5
        result.exp -= pad
        const v1 = value1 + "0".repeat(pad)
        const v2 = new NumberString(value2)

        const arr = Array(v1.length).fill(0)
        let prev = new NumberString()
        for (let i = 0; i < v1.length; i++) {
            let v = prev.add(new NumberString(v1[i]))
            while (v.compare(v2) >= 0) {
                arr[i]++
                v = v.sub(v2)
            }
            if (v.value !== '0') v.exp++
            prev = v
        }

        const [e, v] = this.scientificInteger(arr.join(''))
        result.value = v
        result.exp += e
        return result
    }

    public compare(n: NumberString): number {
        if (this.sign ^ n.sign) return this.sign ? -1 : 1

        const [_, v1, v2] = this.align(this, n)
        if (v1.length === v2.length) {
            return v1.localeCompare(v2)
        }
        return v1.length < v2.length ? -1 : 1
    }

    public toString(): string {
        if (this.value === '0' || this.value === 'Infinity') return this.value

        let result = this.value
        if (this.exp > 0) {
            result += '0'.repeat(this.exp)
        } else if (this.exp < 0) {
            result = result.padStart(-this.exp + 1, "0")
            result = result.slice(0, this.exp) + "." + result.slice(this.exp)
        }
        const prefix = this.sign ? '-' : ''
        return prefix + result
    }

    private align(n1: NumberString, n2: NumberString): [number, string, string] {
        const exp = Math.min(n1.exp, n2.exp)
        const v1 = n1.value + '0'.repeat(Math.abs(n1.exp - exp))
        const v2 = n2.value + '0'.repeat(Math.abs(n2.exp - exp))
        return [exp, v1, v2]
    }

    private scientific(n: string): [number, string] {
        n = n.replace(/^0+/, "")
        let [p, s = ''] = n.split('.')
        let e: number;
        if (s.length > 0) {
            s = s.replace(/0+$/, "")
            e = -s.length
        } else {
            const idx = n.search(/0+$/)
            e = idx > 0 ? n.length - idx : 0
            p = p.replace(/0+$/, "")
        }
        const v = p.concat(s).replace(/^0+/, "")
        return [e, v || '0']
    }

    private scientificInteger(n: string): [number, string] {
        if (n.includes(".")) throw new Error("Invalid number")
        n = n.replace(/^0+/, "")
        const idx = n.search(/0+$/)
        const exp = idx > 0 ? n.length - idx : 0
        n = n.replace(/0+$/, "")
        return [exp, n || '0']
    }
}
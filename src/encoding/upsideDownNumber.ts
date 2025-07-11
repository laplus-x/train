/**
 * @summary Base5 for UpsideDownNumber
 *
 * @description
 * This class provides functionality to encode and decode strings using a custom base-5 numbering system.
 * 
 * The following characters are used:
 * `01689`
 *
 * @remarks
 * This is useful for converting numeric-like string into compact base-5 integers, or encoding integers
 * into a restricted digit format where only selected characters are allowed (e.g., avoiding ambiguous digits).
 *
 * Time Complexity
 * - `encode`: O(n), where n = length of input string
 * - `decode`: O(log₅(n)), where n = input number
 *
 * Space Complexity
 * - Both methods: O(1) auxiliary, O(output) for return string
 */
export class Base5 {
  /** Number of characters in Base5 encoding */
  public static readonly SIZE: number = 5;
  /** Base5 alphabet */
  public static readonly ALPHA_BET: string = "01689";

  /** Decoding lookup table */
  private static readonly DEC_LOOKUP: string[] = this.ALPHA_BET.split('');
  /** Encoding lookup table */
  private static readonly ENC_LOOKUP: Record<string, number> = Object.fromEntries(this.DEC_LOOKUP.map((v, i) => ([v, i])));

  /**
   * Encodes a string of valid Base5 characters into a number.
   *
   * @param data - A string containing only valid characters: '0', '1', '6', '8', '9'
   * @returns A number representing the base-10 equivalent of the input string in base-5
   * @example
   * encode("016") // 7
   * @remarks
   * Converts a string like `"016"` into its corresponding base-5 numeric value:
   *
   * - "0" → 0  
   * - "1" → 1  
   * - "6" → 2  
   * - So `"016"` → `0 * 5² + 1 * 5¹ + 2 * 5⁰ = 0 + 5 + 2 = 7`
   */
  public static encode(data: string): number {
    return data.split('').reduce((pre, curr) => pre * this.SIZE + this.ENC_LOOKUP[curr], 0)
  }
  /**
   * Decodes a number into its Base5 string representation using the custom alphabet.
   *
   * @param data - A non-negative integer
   * @returns A string composed of characters from the defined alphabet
   * @example
   * decode(7) // "016"
   */
  public static decode(data: number): string {
    if (data === 0) return "0"

    let result = ""
    for (let i = data; i >= 1; i /= this.SIZE) {
      const v = i % this.SIZE
      result = this.DEC_LOOKUP[v] + result
      i -= v
    }
    return result
  }
}

/**
 * @summary Solves the *Upside-Down Numbers* problem for very large ranges.
 *
 * @description
 * In this extended version of the original kata by *KenKamau*, input numbers may be as large as 10^42 - 1.
 * The goal is to count how many **upside-down numbers** exist between two given bounds (inclusive).
 *
 * @remarks
 * Rules:
 * - An upside-down number is a number that appears the same when rotated 180 degrees.
 * - Only the digits `0`, `1`, `6`, `8`, and `9` are valid:
 * ```
 * '0' → '0'
 * '1' → '1'
 * '6' → '9'
 * '8' → '8'
 * '9' → '6'
 * ```
 *
 * Examples of upside-down numbers: `"0"`, `"69"`, `"818"`, `"1961"`, etc.
 * 
 * @param min - A string representing the lower bound of the range (inclusive), consisting of up to 42 decimal digits.
 * @param max - A string representing the upper bound of the range (inclusive), consisting of up to 42 decimal digits.
 * @returns The number of valid upside-down numbers between `min` and `max` (inclusive).
 *
 * @see {@link https://www.codewars.com/kata/59f98052120be4abfa000304 | Codewars - Upside-Down Numbers - Challenge Edition}
 */
export class UpsideDownNumber {
  /** Map of digits that are valid when flipped upside-down */
  private static readonly LOOKUP: Record<string, string> = {
    '0': '0',
    '1': '1',
    '6': '9',
    '8': '8',
    '9': '6',
  }

  /**
   * Get the smallest valid upside-down digit greater than or equal to a given digit.
   */
  public static ceilChar(s: string): string {
    if (Base5.ALPHA_BET.includes(s)) {
      return s
    } else if (s.localeCompare('6') > 0) {
      return '8'
    }
    return '6'
  }

  /**
   * Transform a prefix into the smallest valid upside-down prefix >= the original string.
   */
  public static ceilPrefix(s: string): string {
    let result = s
    for (let i = 0; i < s.length && result.localeCompare(s) <= 0; i++) {
      result = result.slice(0, i) + this.ceilChar(s.slice(i, i + 1)) + "0".repeat(s.length - i - 1)
    }
    return result
  }

  /**
   * Get the largest valid upside-down digit less than or equal to a given digit.
   */
  public static floorChar(s: string): string {
    if (Base5.ALPHA_BET.includes(s)) {
      return s
    } else if (s.localeCompare('6') < 0) {
      return '1'
    }
    return '6'
  }

  /**
   * Transform a prefix into the largest valid upside-down prefix <= the original string.
   */
  public static floorPrefix(s: string): string {
    let result = s
    for (let i = 0; i < s.length && result.localeCompare(s) >= 0; i++) {
      result = result.slice(0, i) + this.floorChar(s.slice(i, i + 1)) + "9".repeat(s.length - i - 1)
    }
    return result
  }

  /**
   * Constructs an upside-down number from a prefix (and optional middle digit).
   * @param pre - The left half of the number
   * @param mid - Optional middle digit (for odd-length numbers)
   * @returns Full upside-down number as a string
   */
  public static upsidedown(pre: string, mid?: string) {
    const suf = [...pre].reverse()
      .map(i => this.LOOKUP[i])
      .join('')
    return mid ? pre.concat(mid).concat(suf) : pre.concat(suf)
  }

  /**
   * Returns the smallest valid upside-down number ≥ given input.
   */
  public static start(s: string): string {
    const pre = this.ceilPrefix(s.slice(0, s.length / 2))

    const even = (s: string, pre: string): string => {
      const result = this.upsidedown(pre)
      if (result.length > s.length || result.localeCompare(s) >= 0) {
        return result
      }
      const max = "9".repeat(pre.length)
      if (pre === max) {
        const v = "1" + "0".repeat(pre.length - 1)
        return odd(s, v)
      }
      const v = Base5.encode(pre)
      return even(s, Base5.decode(v + 1))
    }

    const odd = (s: string, pre: string): string => {
      const mid = ['0', '1', '8']
      let result = ""
      for (const m of mid) {
        result = this.upsidedown(pre, m)
        if (result.length > s.length || result.localeCompare(s) >= 0) {
          return result
        }
      }
      const max = "9".repeat(pre.length)
      if (s.length === 1 || pre === max) {
        const v = "1" + "0".repeat(pre.length)
        return even(s, v)
      }
      const v = Base5.encode(pre)
      return odd(s, Base5.decode(v + 1))
    }

    return s.length % 2 === 0 ? even(s, pre) : odd(s, pre)
  }

  /**
    * Returns the largest valid upside-down number ≤ given input.
    */
  public static end(s: string): string {
    const pre = this.floorPrefix(s.slice(0, s.length / 2))

    const even = (s: string, pre: string): string => {
      const result = this.upsidedown(pre)
      if (result.length < s.length || result.localeCompare(s) <= 0) {
        return result
      }
      const min = "1" + "0".repeat(pre.length - 1)
      if (pre === min) {
        const v = "9".repeat(pre.length - 1)
        return odd(s, v)
      }
      const v = Base5.encode(pre)
      return even(s, Base5.decode(v - 1))
    }

    const odd = (s: string, pre: string): string => {
      const mid = ['8', '1', '0']
      let result = ""
      for (const m of mid) {
        result = this.upsidedown(pre, m)
        if (result.length < s.length || result.localeCompare(s) <= 0) {
          return result
        }
      }
      const min = "1" + "0".repeat(pre.length - 1)
      if (s.length === 1 || pre === min) {
        const v = "9".repeat(pre.length)
        return even(s, v)
      }
      const v = Base5.encode(pre)
      return odd(s, Base5.decode(v - 1))
    }

    return s.length % 2 === 0 ? even(s, pre) : odd(s, pre)
  }

  /**
   * Count valid middle digits (for odd-length numbers) between two values.
   * Valid digits are '0', '1', '8'.
   */
  public static countMiddle(min: string, max: string): number {
    const mid = ['0', '1', '8']
    const n1 = mid.indexOf(min)
    const n2 = max === '9' ? mid.indexOf("8") : mid.indexOf(max)

    if (n1 > n2) return 0
    else if (n1 === n2) return 1
    return n2 - n1 + 1
  }

  /**
   * Count all valid upside-down numbers between two strings of the same length.
   */
  public static count(min: string, max: string): number {
    if (min.length === 1) return this.countMiddle(min, max)

    const len = Math.floor(min.length / 2)
    const n1 = Base5.encode(min.slice(0, len))
    const n2 = Base5.encode(max.slice(0, len))

    if (n1 > n2) return 0
    else if (n1 === n2) return 1

    const middle_cnt = 3
    const multiplier = min.length % 2 === 0 ? 1 : middle_cnt
    const n3 = min.length % 2 === 0 ? 0 : middle_cnt - this.countMiddle(min.slice(len, len + 1), max.slice(len, len + 1))
    return (n2 - n1 + 1) * multiplier - n3
  }

  /**
   * Solves for the number of valid upside-down numbers in the range [min, max].
   *
   * @param min - The lower bound of the range
   * @param max - The upper bound of the range
   * @returns The count of upside-down numbers within the range
   */
  public static solve(min: string, max: string): number {
    const start = this.start(min)
    const end = this.end(max)

    if (start.length > end.length || (start.length === end.length && start.localeCompare(end) > 0)) {
      return 0
    } else if (start.length === end.length) {
      return this.count(start, end)
    }

    let result = this.count(start, "9".repeat(start.length)) + this.count("1" + "0".repeat(end.length - 1), end)
    for (let n = start.length + 1; n < end.length; n++) {
      result += this.count("1" + "0".repeat(n - 1), "9".repeat(n))
    }
    return result
  }
}
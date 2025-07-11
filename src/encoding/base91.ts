/**
 * @summary BasE91 is a method for encoding binary as ASCII characters
 *
 * @description
 * It is more efficient than Base64 and needs 91 characters to represent the encoded data.
 *
 * The following ASCII characters are used:
 * `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!#$%&()*+,./:;<=>?@[]^_`{|}~'\"`
 * 
 * @remarks
 * - The input is processed as a bitstream.
 * - Bits are accumulated in a buffer (`b`) until there are more than 13 bits.
 * - Depending on the value, either 13 or 14 bits are extracted and converted into two Base91 characters.
 * - For decoding, the process is reversed: each character pair is converted back into bits, 
 *   and every 8 bits are extracted to form the original characters.
 * 
 * Time Complexity: 
 * - O(N), where `N` is the length of the input string.
 * 
 * Space Complexity: 
 * - O(N)
 */
export class Base91 {
  /** Bit size of a single byte (8 bits) */
  private static readonly BYTE_SIZE: number = 8;

  /** Number of characters in Base91 encoding */
  private static readonly SIZE: number = 91;
  /** Base91 alphabet */
  private static readonly ALPHA_BET: string = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!#$%&()*+,./:;<=>?@[]^_`{|}~'\"";

  /** Standard bit length to extract per cycle */
  private static readonly CHAR_SIZE: number = 13;
  /** Threshold to decide whether to extract 13 or 14 bits */
  private static readonly CHAR_THRESHOLD: number = 88;

  /** Encoding lookup table */
  private static readonly ENC_LOOKUP: string[] = this.ALPHA_BET.split('');
  /** Decoding lookup table */
  private static readonly DEC_LOOKUP: Record<string, number> = Object.fromEntries(this.ENC_LOOKUP.map((v, i) => ([v, i])));

  /**
   * Returns a bitmask of the specified bit size.
   *
   * @param size - Number of bits
   * @returns Bitmask of size `size`
   * @example
   * bitmask(3) // 0b111 => 7
   */
  public static bitmask(size: number): number {
    return (1 << size) - 1
  }

  /**
   * Converts a string to an array of character codes.
   *
   * @param s - Input string
   * @returns Array of character codes
   */
  public static s2c(s: string): number[] {
    return Array.from({ length: s.length }, (_, i) => s.charCodeAt(i))
  }

  /**
   * Converts a character code to a string.
   *
   * @param c - Character code
   * @returns Single-character string
   */
  public static c2s(c: number): string {
    return String.fromCharCode(c)
  }

  /**
   * Converts a Base91 string to an array of Base91 alphabet indices.
   *
   * @param s - Base91 encoded string
   * @returns Array of alphabet indices
   */
  public static a2i(s: string): number[] {
    return s.split('').map(i => this.DEC_LOOKUP[i]).filter(Boolean)
  }

  /**
   * Encodes a UTF-8 string into a Base91 encoded string.
   *
   * @param data - The original string to encode
   * @returns Base91 encoded string
   *
   * @example
   * encode('test') // 'fPNKd'
   */
  public static encode(data: string): string {
    let b: number = 0,
      n: number = 0,
      c: number = 0;
    let result: string = ""

    const charCodes = this.s2c(data)
    for (const charCode of charCodes) {
      b |= charCode << n
      n += this.BYTE_SIZE

      if (n > this.CHAR_SIZE) {
        c = b & this.bitmask(this.CHAR_SIZE)

        if (c > this.CHAR_THRESHOLD) {
          b >>= this.CHAR_SIZE
          n -= this.CHAR_SIZE
        } else {
          c = b & this.bitmask(this.CHAR_SIZE + 1)
          b >>= this.CHAR_SIZE + 1
          n -= this.CHAR_SIZE + 1
        }

        result += this.ENC_LOOKUP[c % this.SIZE] + this.ENC_LOOKUP[Math.trunc(c / this.SIZE)]
      }
    }

    if (n > 0) {
      c = b & this.bitmask(this.CHAR_SIZE)
      result += this.ENC_LOOKUP[c % this.SIZE]

      if (n >= this.BYTE_SIZE || c >= this.SIZE) {
        result += this.ENC_LOOKUP[Math.trunc(c / this.SIZE)]
      }
    }
    return result
  }

  /**
   * Decodes a Base91 encoded string back to its original UTF-8 string.
   *
   * @param data - The Base91 encoded string
   * @returns The decoded original string
   *
   * @example
   * decode('fPNKd') // 'test'
   */
  public static decode(data: string): string {
    let b: number = 0,
      n: number = 0,
      c: number = 0,
      v: number = - 1;
    let result: string = ""

    const idxs = this.a2i(data)
    for (const idx of idxs) {
      if (v < 0) {
        v = idx
      } else {
        v += idx * this.SIZE

        b |= v << n
        if ((v & this.bitmask(this.CHAR_SIZE)) > this.CHAR_THRESHOLD) {
          n += this.CHAR_SIZE
        } else {
          n += this.CHAR_SIZE + 1
        }

        while (n >= this.BYTE_SIZE) {
          c = b & this.bitmask(this.BYTE_SIZE)
          result += this.c2s(c)
          b >>= this.BYTE_SIZE
          n -= this.BYTE_SIZE
        }

        v = -1
      }
    }

    if (v > 0) {
      b |= v << n
      c = b & this.bitmask(this.BYTE_SIZE)
      result += this.c2s(c)
    }

    return result
  }
}
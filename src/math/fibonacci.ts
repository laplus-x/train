/**
 * @summary Implements various Fibonacci number algorithms with support for negative indices.
 * 
 * @remarks
 * The Fibonacci sequence is defined by the recurrence relation:
 * - F(0) = 0
 * - F(1) = 1
 * - F(n) = F(n - 1) + F(n - 2) for n > 1
 * - F(-n) = (-1)^(n + 1) * F(n)
 * 
 */
export class Fibonacci {
  /**
  * Iterative solution using tuple swapping.
  *
  * @remarks
  * Uses two variables `n1` and `n2` to simulate the recurrence, avoiding array allocation.
  *
  * Time Complexity:
  * O(n) — Single pass through the first `n` Fibonacci numbers.
  * 
  * Space Complexity:
  * O(1) — Uses constant.
  *
  * @param n - The index in the Fibonacci sequence.
  * @returns The nth Fibonacci number.
  */
  public static solve(n: number): number {
    if (n < 0) return (-1) ** (-n + 1) * this.solve(-n)
    else if (n < 2) return n;

    let n1 = 0,
      n2 = 1;
    for (let i = 1; i <= n; i++) {
      [n1, n2] = [n2, n1 + n2];
    }
    return n1;
  }

  /**
   * Iterative solution using a results array to store intermediate Fibonacci numbers.
   *
   * @remarks
   * Uses dynamic programming (bottom-up DP) by building a list of results from F(0) to F(n).
   *
   * Time Complexity:
   * O(n) — Computes and stores all Fibonacci values up to `n`.
   * 
   * Space Complexity:
   * O(n) — Due to result array.
   *
   * @param n - The index in the Fibonacci sequence.
   * @returns The nth Fibonacci number.
   */
  public static solve1(n: number): number {
    if (n < 0) return (-1) ** (-n + 1) * this.solve1(-n)
    else if (n < 2) return n;

    const result = [0, 1]
    for (let i = 2; i <= n; i++) {
      result.push(result[i - 1] + result[i - 2])
    }
    return result[n]
  }

  /**
   * Naive recursive solution without memoization.
   *
   * @remarks
   * Classic recursive definition. Demonstrates simplicity but is extremely inefficient.
   *
   * Time Complexity:
   * O(2^n) — Exponential due to repeated recomputation.
   * 
   * Space Complexity:
   * O(n) — Due to recursive call stack depth.
   *
   * @param n - The index in the Fibonacci sequence.
   * @returns The nth Fibonacci number.
   */
  public static solve2(n: number): number {
    if (n < 0) return (-1) ** (-n + 1) * this.solve2(-n)
    else if (n < 2) return n;

    return this.solve2(n - 1) + this.solve2(n - 2)
  }

  /**
   * Generator-based solution using an infinite Fibonacci generator.
   *
   * @remarks
   * Uses a generator to yield Fibonacci numbers lazily and retrieves the nth value.
   *
   * Time Complexity:
   * O(n) — Iterates through the sequence linearly to nth value.
   * 
   * Space Complexity:
   * O(1) — generator uses constant memory.
   *
   * @param n - The index in the Fibonacci sequence.
   * @returns The nth Fibonacci number.
   */
  public static solve3(n: number): number {
    if (n < 0) return (-1) ** (-n + 1) * this.solve3(-n)
    else if (n < 2) return n;

    const generator = function* (n: number) {
      let a = 0;
      let b = 1;

      for (let i = 0; i <= n; i++) {
        yield a;
        [a, b] = [b, a + b];
      }
    }

    let result = 0
    const g = generator(n)
    for (const v of g) {
      result = v
    }
    return result
  }

  /**
   * Efficient matrix exponentiation solution.
   *
   * @remarks
   * Uses the property that:
   * ```
   * |F(n+1) F(n)  | = |1 1|^n
   * |F(n)   F(n-1)|   |1 0|
   * ```
   * Raises the matrix to the (n-1)th power using binary exponentiation.
   *
   * Time Complexity:
   * O(log n) — Efficient exponentiation reduces the recursion tree depth.
   * 
   * Space Complexity:
   * O(1) — Uses fixed-size 2x2 matrices, no recursion or array growth.
   *
   * @param n - The index in the Fibonacci sequence.
   * @returns The nth Fibonacci number.
   */
  public static solve4(n: number): number {
    if (n < 0) return (-1) ** (-n + 1) * this.solve4(-n)
    else if (n < 2) return n;

    /**
     * A = | a  b |  B = | e  f |
     *     | c  d |      | g  h |   
     * 
     * A · B = | ae+bg  af+bh | 
     *         | ce+dg  cf+dh |   
     */
    const multiply = (A: [[number, number], [number, number]], B: [[number, number], [number, number]]): [[number, number], [number, number]] => {
      return [
        [A[0][0] * B[0][0] + A[0][1] * B[1][0], A[0][0] * B[0][1] + A[0][1] * B[1][1]],
        [A[1][0] * B[0][0] + A[1][1] * B[1][0], A[1][0] * B[0][1] + A[1][1] * B[1][1]]
      ]
    }

    // matrix exponentiation
    const power = (matrix: [[number, number], [number, number]], n: number) => {
      let result: [[number, number], [number, number]] = [[1, 0], [0, 1]] // identity matrix
      for (let i = n; i > 0; i >>= 1) {
        if (i & 1) {
          result = multiply(result, matrix)
        }
        matrix = multiply(matrix, matrix)
      }
      return result
    }

    const matrix: [[number, number], [number, number]] = [
      [1, 1],
      [1, 0]
    ];

    /**
     * | F(n+1)  F(n)  | = | F(n)    F(n-1) | * | F(n)   F(n-1) |
     * | F(n)    F(n-1)|   | F(n-1)  F(n-2) |   | F(n-1) F(n-2) |
     * 
     * C^n = | F(n+1)   F(n)   |
     *       | F(n)     F(n-1) |
     */
    const result = power(matrix, n - 1)
    return result[0][0]
  }

  /**
  * Fast doubling Fibonacci algorithm.
  *
  * @remarks
  * Uses the identities:
  * - F(2k) = F(k) * [2*F(k+1) − F(k)]
  * - F(2k+1) = F(k+1)^2 + F(k)^2
  *
  * This approach avoids full matrix multiplication by using recursion with mathematical shortcuts.
  *
  * Time Complexity:
  * O(log n) — Due to divide-and-conquer based on bit position.
  * 
  * Space Complexity:
  * O(log n) — Recursive depth is log(n), each call consumes stack space.
  *
  * @param n - The index in the Fibonacci sequence.
  * @returns The nth Fibonacci number.
  */
  public static solve5(n: number): number {
    if (n < 0) return (-1) ** (-n + 1) * this.solve5(-n)
    else if (n < 2) return n;
    else if (n === 2) return 1;

    /** 
     * | F(n+1)  F(n)  | = | F(n)    F(n-1) | * | F(n)   F(n-1) |
     * | F(n)    F(n-1)|   | F(n-1)  F(n-2) |   | F(n-1) F(n-2) |
     * 
     * C^n = | F(n+1)   F(n)   |
     *       | F(n)     F(n-1) |
     * 
     * C^(m+n) = | F(m+n+1) F(m+n)   | = | F(m+1) F(m)   | · | F(n+1) F(n)   |
     *           | F(m+n)   F(m+n-1) |   | F(m)   F(m-1) |   | F(n)   F(n-1) |
     * 
     * A = | a  b |  B = | e  f |
     *     | c  d |      | g  h |   
     * 
     * A · B = | ae+bg  af+bh | 
     *         | ce+dg  cf+dh |   
     * 
     * F(m+n+1) = F(m+1) * F(n+1) + F(m) * F(n) 
     * => F(2k+1) = F(k+1)^2 + F(k)^2
     * 
     * F(m+n)   = F(m) * F(n+1) + F(m-1) * F(n) 
     * => F(2k) = F(k) * (F(k+1) + F(k-1)) 
     * => F(2k) = F(k) * (F(k+1) + (F(k+1) - F(k))) 
     * => F(2k) = F(k) * (2*F(k+1) − F(k))
     * 
     */

    const k = n >> 1
    if (n & 1) {
      return this.solve5(k + 1) ** 2 + this.solve5(k) ** 2
    }

    const fk = this.solve5(k)
    return fk * (2 * this.solve5(k + 1) - fk)
  }
}

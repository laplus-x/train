export class IntegerPartition {

  /**
   * @summary Calculates the number of **integer partitions**.
   *
   * @remarks
   * An **integer partition** of `n` is a multiset of positive integers whose sum is `n`,
   * written in weakly‑decreasing order.  
   * Example ( `n = 5` ):  
   * `[5] , [4,1] , [3,2] , [3,1,1] , [2,2,1] , [2,1,1,1] , [1,1,1,1,1]`
   * 
   * @param n - Positive integer ( `n ≥ 1` )
   * @returns the number of integer partitions
   */
  public static solve(n: number) {
    const dp = Array.from<number>({ length: n + 1 }).fill(0)
    /** dp[x]: 數字之和 = x 的可重複數字組合數
     * dp[1] = 1
     * dp[2] = 11, 2
     * dp[3] = 111, 21, 3
     * 
     * i = 1
     * dp[1] += dp[0] => 1
     * dp[2] += dp[1] => 1
     * dp[3] += dp[2] => 1
     * 
     * i = 2
     * dp[2] += dp[0] => 1
     * dp[3] += dp[1] => 1
     * 
     * i = 3
     * dp[3] += dp[0] => 1
     */

    dp[0] = 1
    for (let i = 1; i < n + 1; i++) {
      // i 為 數字面額
      for (let k = 0, j = k + i; j < n + 1; k++, j++) {
        // 若要湊出數字之和 j，可以在「湊出 k」的基礎上，再放一個 i
        dp[j] += dp[k]
      }
    }
    return dp[n]
  }

  /**
   * @summary Calculates the number of **integer partitions** with distinct parts.
   *
   * @remarks
   * An integer partition with distinct parts of n is a decreasing list of positive integers which sum to n, 
   * in which no number occurs more than once.
   * Example ( `n = 5` ):  
   * `[5], [4,1], [3,2]`
   * 
   * @param n - Positive integer ( `n ≥ 1` )
   * @returns the number of integer partitions
   */
  public static solve1(n: number) {
    const dp = Array.from<number>({ length: n + 1 }).fill(0)
    /** dp[x]: 數字之和 = x 的不重複數字組合數
     * dp[1] = 1
     * dp[2] = 2
     * dp[3] = 21, 3
     * 
     * i = 1 
     * dp[3] += dp[2] => 0 不可能用小於 i 的數字湊出
     * dp[2] += dp[1] => 0 不可能用小於 i 的數字湊出
     * dp[1] += dp[0] => 1 不用數字
     * 
     * i = 2 
     * dp[3] += dp[1] => 1 用 1 可以湊出
     * dp[2] += dp[0] => 1 不用數字
     * 
     * i = 3
     * dp[3] += dp[0] => 1 不用數字
     * 
     */

    dp[0] = 1
    for (let i = 1; i < n + 1; i++) {
      // i 為 數字面額
      for (let j = n; j >= i; j--) {
        // 若要湊出數字之和 j，可以在「湊出 j-i」的基礎上，再放一個 i
        dp[j] += dp[j - i]
      }
    }
    return dp[n]
  }
}
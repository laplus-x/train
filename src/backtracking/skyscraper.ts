
/**
 * @summary Solves a 4x4 skyscraper puzzle based on given visibility clues.
 *
 * @description The puzzle consists of a 4x4 grid where each cell contains a skyscraper of height 1 to 4.
 *
 * Rules:
 * - Each row and each column must contain skyscrapers with all heights from 1 to 4, without repetition.
 * - A clue is a number placed outside the grid that represents how many skyscrapers are visible
 *   from that direction in the corresponding row or column.
 * - A taller skyscraper blocks the view of any shorter skyscrapers behind it from a specific direction.
 *
 * @param clues - An array of 16 numbers (0-4) representing the visibility clues from the
 *   outside of the grid. The clues are given in the following order:
 *   - Top side (left to right): indices 0-3
 *   - Right side (top to bottom): indices 4-7
 *   - Bottom side (right to left): indices 8-11
 *   - Left side (bottom to top): indices 12-15
 *
 *   A value of 0 indicates no clue for that direction.
 *
 * @returns A 4x4 grid (array of arrays) filled with numbers 1 to 4, representing the solution
 *   to the skyscraper puzzle. Returns `null` if no solution exists.
 *
 * @see {@link https://www.codewars.com/kata/5671d975d81d6c1c87000022 | Codewars - 4x4 Skyscrapers Puzzle}
 * 
 */
export class Skyscraper {
  private readonly size: number = 0
  private grid: number[][] = []
  private tbs: [top: number, bottom: number][] = []
  private lrs: [left: number, right: number][] = []

  /**
   * Initialize an empty grid and set puzzle size.
   * @param size Grid dimension (e.g., 4 for a 4x4 puzzle)
   */
  constructor(size: number) {
    this.size = size;
  }

  /**
   * Parses clues from a flat array into structured top-bottom and left-right pairs.
   * @param clues Array of 4N clues (0-N)
   * @returns A tuple of [top-bottom clues, left-right clues]
   */
  public parse(clues: number[]): [[top: number, bottom: number][], [left: number, right: number][]] {
    const tbs: [number, number][] = [];
    const lrs: [number, number][] = [];
    for (let i = 0; i < this.size; i++) {
      tbs.push([clues[i], clues[this.size * 3 - 1 - i]]);
      lrs.push([clues[this.size * 4 - 1 - i], clues[this.size + i]]);
    }
    return [tbs, lrs];
  }

  /**
   * Returns a reversed copy of an array.
   * @param arr Array to reverse
   */
  public reverse(arr: number[]): number[] {
    return [...arr].reverse();
  }

  /**
   * Computes how many skyscrapers are visible in a line.
   * @param cells A row or column of heights
   * @returns The number of visible buildings
   */
  public canSee(cells: number[]): number {
    let result = 1;
    for (let i = 1, max = cells[0]; i < cells.length; i++) {
      if (cells[i] <= max) continue
      result++;
      max = cells[i];
    }
    return result;
  }

  /**
   * Checks if a line satisfies its clue.
   * @param cells A row or column
   * @param clue The visibility clue (0 means no clue)
   */
  public isValidLine(cells: number[], clue: number): boolean {
    return clue === 0 || this.canSee(cells) === clue;
  }

  /**
   * Checks if a column is valid against its top and bottom clues.
   * @param idx Column index
   */
  public isValidCol(idx: number): boolean {
    const col = this.grid.map(row => row[idx])
    const [top, bottom] = this.tbs[idx];
    return this.isValidLine(col, top) && this.isValidLine(this.reverse(col), bottom)
  }

  /**
   * Checks if a row is valid against its left and right clues.
   * @param idx Row index
   */
  public isValidRow(idx: number): boolean {
    const row = this.grid[idx];
    const [left, right] = this.lrs[idx];
    return this.isValidLine(row, left) && this.isValidLine(this.reverse(row), right)
  }

  /**
   * Checks if a value is unique in its row and column.
   * @param i Row index
   * @param j Column index
   * @param v Value to check
   */
  public isUnique(i: number, j: number, v: number): boolean {
    for (let k = 0; k < this.size; k++) {
      if (this.grid[i][k] === v || this.grid[k][j] === v) return false
    }
    return true
  }

  /**
   * Returns all valid candidate values for a given cell.
   * @param i Row index
   * @param j Column index
   */
  public getValue(i: number, j: number): number[] {
    let clue;
    if (i === 0) {
      [clue] = this.tbs[j]
    } else if (i === this.size - 1) {
      [, clue] = this.tbs[j]
    } else if (j === 0) {
      [clue] = this.lrs[i]
    } else if (j === this.size - 1) {
      [, clue] = this.lrs[i]
    }
    if (clue === this.size) {
      return [1]
    } else if (clue === 1) {
      return [this.size]
    }

    const result: number[] = []
    for (let n = 1; n <= this.size; n++) {
      if (!this.isUnique(i, j, n)) continue
      result.push(n)
    }
    return result
  }

  /**
   * Recursive backtracking function to place values on the board.
   * @param i Row index
   * @param j Column index
   * @returns Whether a valid placement was found
   */
  public place(i: number, j: number): boolean {
    if (i === this.size) {
      return true;
    } else if (j === this.size) {
      return this.isValidRow(i) ? this.place(i + 1, 0) : false
    }

    // console.log(i, j, this.grid)
    const values = this.getValue(i, j)
    for (const value of values) {
      this.grid[i][j] = value

      if (i === this.size - 1) {
        const isValid = this.isValidCol(j)
        if (!isValid) continue
      }

      const found = this.place(i, j + 1);
      if (found) return true;

      this.grid[i][j] = 0
    }
    this.grid[i][j] = 0
    return false;
  }

  /**
   * Solves the puzzle using backtracking and returns the completed grid.
   * @param clues An array of 4N visibility clues (0 to N)
   * @returns A solved grid of dimensions N x N
   * @throws If no valid solution is found
   * 
   * @remarks The puzzle is solved using **backtracking with pruning**:
   * At each grid position (i, j), we try all valid heights (1..N) that maintain uniqueness in the row and column.
   * We validate rows and columns against the visibility clues as soon as they are complete.
   * If a row or column violates its clue, we backtrack.
   * 
   * Time Complexity:
   * - Worst case: O((N!)^N) — similar to Latin square solving with additional pruning
   * - However, early pruning on uniqueness and clue constraints drastically reduce the search space.
   *
   * Space Complexity:
   * - O(N^2) for the grid
   * - O(N) for temporary arrays during clue checking
   * 
   * @see {@link https://www.geeksforgeeks.org/dsa/backtracking-algorithms | Backtracking Algorithm}
   * @see {@link https://www.geeksforgeeks.org/dsa/prune-and-search-a-complexity-analysis-overview | Prune-and-Search Algorithm}
   */
  public solve(clues: number[]): number[][] {
    if (clues.length !== this.size * 4) {
      throw new Error("Invalid clues")
    }

    [this.tbs, this.lrs] = this.parse(clues);
    
    this.grid = Array.from({ length: this.size }, () => Array(this.size).fill(0));
    const found = this.place(0, 0)
    if (!found) {
      throw new Error("Solve Fail")
    }
    return this.grid;
  }
}
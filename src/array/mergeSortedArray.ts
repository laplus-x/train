// 88
export class MergeSortedArray {
    public static solve(nums1: number[], m: number, nums2: number[], n: number
    ) {
        for (let pos = nums1.length - 1, i = m - 1, j = n - 1; pos >= 0; pos--) {
            nums1[pos] = j < 0 || nums1[i] > nums2[j] ? nums1[i--] : nums2[j--]
        }
    }
}
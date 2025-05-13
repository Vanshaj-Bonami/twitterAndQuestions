function twoSum(nums, target) {
    for (let i = 0; i < nums.length; i++) {
        for (let j = i + 1; j < nums.length; j++) {
            if (nums[i] + nums[j] === target) {
                return [nums[i], nums[j]];
            }
        }
    }
    return [];
}

console.log(twoSum([2, 7, 11, 15], 9));

// Time Complexity: O(n^2)
// Space Complexity: O(1)
// The time complexity is O(n^2) because we have two nested loops, each iterating through the array of length n.
// The space complexity is O(1) because we are not using any additional data structures that grow with the input size.

// Optimized solution using a hash map
function twoSumOptimized(nums, target) {
    let map = {};
    for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i];
        if(map.hasOwnProperty(complement)){
            // If the complement exists in the map, we found the two numbers
            // that add up to the target
            // Return the numbers instead of their indices
            // to match the original problem statement
            return [complement, nums[i]];
        }else{
            map[nums[i]] = i;
        }
    }
    return [];
}
console.log(twoSumOptimized([2, 7, 11, 15], 9));
// Time Complexity: O(n)
// Space Complexity: O(n)
// The time complexity is O(n) because we are iterating through the array once.
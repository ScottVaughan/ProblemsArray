import { useState, useEffect } from "react";
import './App.css';

function App() {

  const [nums, setNums] = useState([0,1,0,0,5,8,0,0,0,0,12,12,14,15,0]);

    useEffect(() => {
        console.time()
        rotateArray([1,2,3,4,5,6], 4)
        mergeArrays([5,4,7,8,5,9], [6,7,6,2,8,9,1,2])
        longestPrefix(["flower","flow","flight"]);
        numberIndexFound([1,3,5,6], 7);
        findTargetFromThree([3,7,1,2,8,4,5],20);
        findZeroSumFromThree([-1,0,1,2,-1,-4]);
        console.timeEnd();
    },[]);

    /**
     * rotate an array by n
     * orignalArray = [1,2,3,4,5,6], n = 4, solution [3,4,5,6,1,2]
     * Speed O(1), Space O(n)
     */
    const rotateArray = (orignalArray, n) => {
        const start = orignalArray.length - 4;
        const end = orignalArray.length;
        // get 3,4,5,6 into a new array
        const newArray = orignalArray.slice(start, end);
        // splice or remove 3,4,5,6 from array
        orignalArray.splice(start, end);
        // merge arrays
        const mergedArray = [].concat(newArray, orignalArray);
        document.getElementById("rotate").innerHTML = mergedArray;
    }

    /**
     * sort, remove duplicates, and merge two arrays
     * arr1=[5,4,7,8,5,9], arr2=[6,7,6,2,8,9,1,2], solution [2,4,5,6,7,8,9]
     */
    const mergeArrays = (arr1, arr2) => {
        // merge
        let mergedArray = [].concat(arr1, arr2);
        // sort
        mergedArray.sort();
        // remove all duplicates with a Set
        mergedArray = [...new Set(mergedArray)];
    }

    const longestPrefix = (strs) => {
        strs.sort();
        for (let i = 0; i < strs[0].length; i++) {
          if (strs[0][i] !== strs[strs.length - 1][i]) return strs[0].substr(0, i);
        }
        return strs[0];
    }

    const numberIndexFound = (nums, target) => {
        let found = -1;
        for(let i = 0; i < nums.length; i++){
            if(target === nums[i]){
                found = i;
                break;
            }
            if(target < nums[i]){
                found = i;
                break;
            }
        }
        if(found === -1) found = nums.length;
        return found; 
    }

    /**
     * any three numbers in an array sum to target value
     * nums = [3,7,1,2,8,4,5], target =20, then solution 5+7+8 = 20
     *  */ 
    const findTargetFromThree = (nums, target) => {
        const sumArray = [];
        nums.sort();
        // this double loop lets us add two numbers
        // Example: 3+7, 3+1, 3+2, 3+8, 3+4, 3+5, 7+1, 7+2....
        for(let i = 0; i < nums.length; i++){
            for(let x = i+1; x < nums.length; x++){
                const sum = nums[i] + nums[x];
                // if sum is greater than target then we can save time by stop iterating
                if(sum > target){
                    break;
                }else{
                    // don't push duplicates
                    if(!sumArray.includes(sum)){
                        sumArray.push(sum);
                    }
                }
            }
        }
        // now let iterate through the two number sums
        // Example: 3+7=10, so 20 - 10 = 10, does nums array have a 10
        for(let i = 0; i < sumArray.length; i++){
            const num = target - sumArray[i]; 
            if(nums.includes(num)){
                return true;
            }
        }
        return false;
    }

    /***
     * Find three numbers in an array that sum to 0
     * nums = [-1,0,1,2,-1,-4], then solution [[-1,-1,2],[-1,0,1]]
     *  */ 
    const findZeroSumFromThree = (nums) => {
        // const sumArray = [];
        // for(let i = 0; i < nums.length; i++){
        //     for(let x = i+1; x < nums.length; x++){
        //         // we have two of the three numbers with sum
        //         const sum = nums[i] + nums[x];
        //         // the third number must 0 out the sum
        //         const thirdNum = sum * -1;
        //         // see if that number is in the array
        //         if(nums.includes(thirdNum)){
        //             // NOTE we are getting repeats so this doesn't work 100%
        //             sumArray.push([nums[i],nums[x],thirdNum].sort());
        //         }
        //     }
        // }
    }

  return (
    <div className="App">
      <h1>Arrays</h1>
      <p id="rotate"></p>
    </div>
  );
}

export default App;

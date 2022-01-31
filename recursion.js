// find sum of elements in array;
const array = [2, 4, 6];
let total = 0;
function countSum(arr, sum) {
  sum = sum || 0;
  if (arr.length) {
    return countSum(arr, sum + arr.shift());
  } else {
    return sum;
  }
}

countSum(array, total);

// count elements in array
function countElements(arr, el = 0) {
  if (arr.length) {
    arr.pop();
    return countElements(arr, el + 1);
  } else {
    return el;
  }
}

// the highest number in array
function findTheHighestNumber(arr, num = 0) {
  if (!arr.length) {
    return num;
  } else {
    if (num < arr[0]) {
      num = arr[0];
    }
    arr.shift();
    return findTheHighestNumber(arr, num);
  }
}





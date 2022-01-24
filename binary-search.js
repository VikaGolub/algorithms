const guessedBySystemOneNumber = Math.round(Math.random() * 100);

const arr = [];

for (let i = 1; i <= 100; i++) {
  arr.push(i);
}

console.log("Guessed a number by system:", guessedBySystemOneNumber);

const low = 0;
const high = arr.length - 1;
const mid = Math.round((high - low) / 2);

let currentGuess = arr[mid - 1];
let countOfIteration = 0;

function binarySearch(guessNumber) {
  currentGuess = Math.round(currentGuess / 2); // 25 // 13 // 7 // 4 // 2 // 1
  if (guessedBySystemOneNumber < guessNumber) {
    countOfIteration += 1;
    console.log("currentGuess ", guessNumber);
    console.log("Less");

    return binarySearch(
      currentGuess === 50 ? currentGuess : guessNumber - currentGuess
    );
  } else if (guessedBySystemOneNumber > guessNumber) {
    countOfIteration += 1;
    console.log("currentGuess ", guessNumber);
    console.log("More");

    return binarySearch(guessNumber + currentGuess);
  } else if (guessNumber === guessedBySystemOneNumber) {
    console.log("currentGuess ", guessNumber);
    console.log("You won!");
  }
}

binarySearch(currentGuess);
console.log("Count of iteration:", countOfIteration);

const guessedBySystemOneNumber = Math.round(Math.random() * 100);

const arr = [];

for (let i = 1; i <= 100; i++) {
  arr.push(i);
}

console.log("guessedBySystemOneNumber", guessedBySystemOneNumber);

const low = 0;
const high = arr.length - 1;
const mid = Math.round((high - low) / 2);

let currentGuess = arr[mid - 1];
let countOfIteration = 0;

function guessNumber(crntGuess) {
  currentGuess = Math.round(currentGuess / 2); // 25 // 13 // 7 // 4 // 2 // 1
  if (guessedBySystemOneNumber < crntGuess) {
    countOfIteration += 1;
    console.log("currentGuess ", crntGuess);
    console.log("Less");

    return guessNumber(
      currentGuess === 50 ? currentGuess : crntGuess - currentGuess
    );
  } else if (guessedBySystemOneNumber > crntGuess) {
    countOfIteration += 1;
    console.log("currentGuess ", crntGuess);
    console.log("More");

    return guessNumber(crntGuess + currentGuess);
  } else if (crntGuess === guessedBySystemOneNumber) {
    console.log("currentGuess ", crntGuess);
    console.log("You won!");
  }
}

guessNumber(currentGuess);
console.log("Count of iteration: ", countOfIteration);

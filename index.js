// Constants
const ROWS_COUNT = 10;
const COLUMN_COUNT = 10;
const COL_MIN_VALUE = -100;
const COL_MAX_VALUE = 100;

// Main array
const arr = [];

// Generate random int from interval
function randomIntFromInterval(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function isPositive(number) {
  return number > 0;
}

// Row with minimal column value info
let rowWithMinColIndex = 0;
let rowMinColValue = COL_MAX_VALUE;

// Fill the main array
// Fill rows
for (let i = 0; i < ROWS_COUNT; i++) {
  const row = [];
  let minPositiveColumnInRow = COL_MAX_VALUE;

  // Fill columns
  for (let j = 0; j < COLUMN_COUNT; j++) {
    // Generate column value
    const column = randomIntFromInterval(COL_MIN_VALUE, COL_MAX_VALUE);
    row.push(column);

    // Compare current column and minimal positive column in current row
    if (isPositive(column) && column < minPositiveColumnInRow) {
      minPositiveColumnInRow = column;
    }

    // Compare current column and minimal column value
    if (column < rowMinColValue) {
      rowWithMinColIndex = i;
      rowMinColValue = column;
    }
  }

  // Fill metainfo
  row.push(`min:${minPositiveColumnInRow}`);

  arr.push(row);

  // If last iteration
  if (i === ROWS_COUNT - 1) {
    for (let i = 0; i < arr.length; i++) {
      const row = arr[i];
      const number = calculateMinNumberOfNumbers(row);
      row.push(`minNumberToReplace:${number}`);
    }
  }
}

// Calculate minimum number of numbers that must be replaced so that
// there are no 3 positive or negative numbers in a row.
function calculateMinNumberOfNumbers(arr) {
  let number = 0;
  // Sequence is {length:number}
  const positiveSequences = [];
  const negativeSequences = [];

  //  Current sequences' length
  let positiveSequenceLength = 0;
  let negativeSequenceLength = 0;

  // Fill the sequences
  for (let i = 0; i < arr.length; i++) {
    const value = arr[i];
    // If positive
    if (value > 0) {
      positiveSequenceLength++;

      if (negativeSequenceLength >= 3) {
        negativeSequences.push({ length: negativeSequenceLength });
      }
      negativeSequenceLength = 0;
    } else if (value < 0) {
      // If negative
      negativeSequenceLength++;
      if (positiveSequenceLength >= 3) {
        positiveSequences.push({ length: positiveSequenceLength });
      }
      positiveSequenceLength = 0;
    } else {
      // zero
      if (positiveSequenceLength >= 3)
        positiveSequences.push({ length: positiveSequenceLength });
      if (negativeSequenceLength >= 3)
        negativeSequences.push({ length: negativeSequenceLength });

      positiveSequenceLength = 0;
      negativeSequenceLength = 0;
    }
  }

  //   Calculate number
  const sequences = [...positiveSequences, ...negativeSequences];

  for (let i = 0; i < sequences.length; i++) {
    const sequence = sequences[i];
    // Formula of min number replace count for sequence is Math.min(n/3)
    number += Math.floor(sequence.length / 3);
  }

  return number;
}

// Print the array in readable form
function logPrettifiedTwoDimensionalArray(array) {
  let strToLog = "";

  for (let i = 0; i < arr.length; i++) {
    const row =
      "|" + arr[i].join("|") + "|" + (i === rowWithMinColIndex ? "*" : "");
    strToLog +=
      row +
      "\n|-------------------------------------------------------------------|\n";
  }

  console.log(strToLog);
}

logPrettifiedTwoDimensionalArray(arr);

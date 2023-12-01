// This solution is implemented using the sliding-window pattern

let numberMap: Record<string, string> = {
  one: "1",
  two: "2",
  three: "3",
  four: "4",
  five: "5",
  six: "6",
  seven: "7",
  eight: "8",
  nine: "9",
  zero: "0",
  "1": "1",
  "2": "2",
  "3": "3",
  "4": "4",
  "5": "5",
  "6": "6",
  "7": "7",
  "8": "8",
  "9": "9",
  "0": "0",
};

function movePointer(start: number, end: number) {
  if (end - start > 1) {
    // move starting pointer closer
    return [start + 1, end];
  } else {
    // if one char, move pointer
    return [end, end + 1];
  }
}

function sumLine(line: string) {
  const foundInLine: string[] = [];

  let startingPointer = 0;
  let endingPointer = 1;

  while (
    line.slice(startingPointer, endingPointer) &&
    endingPointer <= line.length
  ) {
    let slice = line.slice(startingPointer, endingPointer);

    if (slice in numberMap) {
      foundInLine.push(numberMap[slice]);

      let [newStart, newEnd] = movePointer(startingPointer, endingPointer);
      startingPointer = newStart;
      endingPointer = newEnd;
    } else {
      if (
        Object.keys(numberMap).some((numberKey) => {
          return numberKey.startsWith(slice);
        })
      ) {
        // If it starts with the number then extend the window by one
        endingPointer += 1;
      } else {
        // Otherwise, move the starting pointer
        let [newStart, newEnd] = movePointer(startingPointer, endingPointer);
        startingPointer = newStart;
        endingPointer = newEnd;
      }
    }
  }

  if (!foundInLine) throw new Error("No digit found");

  let first = foundInLine[0];
  let last = foundInLine.at(-1);

  let combined = parseInt(first + last);

  return combined;
}

function totalLines(strArr: string[]) {
  let total = 0;

  for (let line of strArr) {
    total += sumLine(line);
  }

  return total;
}

const input: string[] = [
  // PLACE INPUT HERE
];
console.log(totalLines(input));

let board = ["", "", "", "", "", "", "", "", ""];

let patterns = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [0, 4, 8],
];

function placeMarker(board, i, marker, patterns) {
  if (board[i] === "") {
    board[i] = marker;
  } else {
    console.log("Place already filled");
  }
  console.log(board);
  if (checkWin(board, patterns)) {
    console.log("We got a winner");
  } else if (!hasEmptySpaces(board)) {
    console.log("It's a tie");
  } else {
    console.log("Pass to second player");
  }
}

function hasEmptySpaces(board) {
  for (let i = 0; i < 9; i++) {
    if (board[i] === "") return true;
  }
  return false;
}

function checkWin(board, patterns) {
  for (let i = 0; i < patterns.length; i++) {
    if (
      board[patterns[i][0]] === board[patterns[i][1]] &&
      board[patterns[i][1]] === board[patterns[i][2]] &&
      board[patterns[i][0]] !== ""
    ) {
      return true;
    }
  }
  return false;
}

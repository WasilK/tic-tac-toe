const GameBoard = (function () {
  let board = ["", "", "", "", "", "", "", "", ""];
  function placeMarker(index, marker) {
    if (board[index] === "") {
      board[index] = marker;
      return true;
    } else {
      return false;
    }
  }
  function getBoard() {
    return board;
  }
  function reset() {
    board = ["", "", "", "", "", "", "", "", ""];
  }
  return { placeMarker, getBoard, reset };
})();

const GameController = (function () {
  let activePlayer = "X";
  let gameOver = false;
  const patterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [0, 4, 8],
  ];
  function playRound(index) {
    if (gameOver) return "over";
    const success = GameBoard.placeMarker(index, activePlayer);
    if (!success) return "invalid";
    if (checkWin()) {
      gameOver = true;
      return "win";
    } else if (checkTie()) {
      gameOver = true;
      return "tie";
    }
    switchPlayer();
    return "continue";
  }
  function checkWin() {
    let board = GameBoard.getBoard();
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
  function checkTie() {
    let board = GameBoard.getBoard();
    return !hasEmptySpaces(board);
  }
  function hasEmptySpaces(board) {
    for (let i = 0; i < 9; i++) {
      if (board[i] === "") return true;
    }
    return false;
  }
  function switchPlayer() {
    activePlayer = activePlayer === "X" ? "O" : "X";
  }
  function resetGame() {
    activePlayer = "X";
    gameOver = false;
  }
  return { playRound, resetGame };
})();

const DisplayController = (function () {
  const cells = document.querySelectorAll(".cell");
  function render() {
    let board = GameBoard.getBoard();
    cells.forEach((cell, index) => {
      cell.textContent = board[index];
    });
  }
  let status = document.querySelector(".status");
  function handleClick() {
    cells.forEach((cell) => {
      cell.addEventListener("click", () => {
        const index = parseInt(cell.dataset.index);
        const result = GameController.playRound(index);

        render();

        if (result === "win") {
          status.textContent = "Player wins!";
        } else if (result === "tie") {
          status.textContent = "It's a tie!";
        }
      });
    });
  }
  const restart = document.querySelector("button");
  restart.addEventListener("click", () => {
    GameBoard.reset();
    GameController.resetGame();
    status.textContent = "";
    render();
  });
  handleClick();
  return { render };
})();

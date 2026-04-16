const cells = document.querySelectorAll('.cell');
const restartBtn = document.querySelector("#restartBtn");
const display = document.querySelector("#turnDisplay");
const resetScoreBtn = document.querySelector("#resetScore");

let currentPlayer = "X";
let gameActive = true;

// Start game
function startGame() {
    loadScoreToUI();
    updateUI();
    attachCellEvents();
};

function attachCellEvents() {
    cells.forEach(cell => {
        cell.addEventListener('click', handleMove, { once: true });
    });
};

function handleMove(e) {
    const cell = e.target;

    if (!gameActive || cell.textContent !== "") return;

    cell.textContent = currentPlayer;

    const result = checkWinner();

    if (result) {
        display.textContent = `Player ${result.winner} wins! 🎉`;
        gameActive = false;
    
        showWinningLine(result.line);

        updateScore(result.winner);
        return;
    }

    currentPlayer = currentPlayer === "X" ? "O" : "X";
    updateUI();
}

function updateUI() {
    display.textContent = `Player ${currentPlayer}'s turn`;
};

// Represent Win Conditions
const winPatterns = [
    { pattern: [0,1,2], line: ".row-1" },
    { pattern: [3,4,5], line: ".row-2" },
    { pattern: [6,7,8], line: ".row-3" },

    { pattern: [0,3,6], line: ".col-1" },
    { pattern: [1,4,7], line: ".col-2" },
    { pattern: [2,5,8], line: ".col-3" },

    { pattern: [0,4,8], line: ".diag-1" },
    { pattern: [2,4,6], line: ".diag-2" }
];

// Win Checker Function
function checkWinner() {
    const board = Array.from(cells).map(cell => cell.textContent);

    for (let item of winPatterns) {
        const [a, b, c] = item.pattern;

        if (
            board[a] &&
            board[a] === board[b] &&
            board[a] === board[c]
        ) {
            return {
                winner: board[a],
                line: document.querySelector(item.line)
            };
        }
    }

    return null;
}
function checkDraw() {
    return Array.from(cells).every(cell => cell.textContent !== "");
};

// Show Winning Line
function showWinningLine(lineElement) {
    lineElement.classList.add("show-line");
}

// Reset Game
function resetGame() {
    cells.forEach(cell => {
        cell.textContent = "";
    });

    currentPlayer = "X";
    gameActive = true;

    updateUI();

    attachCellEvents(); // re-enable clicking

    // Reset Lines on Restart
    resetLines();
};

// Reset Score
resetScoreBtn.addEventListener("click", () => {
    score = { X: 0, O: 0 };

    document.querySelector("#scoreX").textContent = 0;
    document.querySelector("#scoreO").textContent = 0;

    // clear storage
    localStorage.removeItem("ttt-score");
});

// Sice we attached { once: true }, we have to re-enable the click
function attachCellEvents() {
    cells.forEach(cell => {
        cell.removeEventListener("click", handleMove);
        cell.addEventListener("click", handleMove, { once: true });
    });
};
function resetLines() {
    document.querySelectorAll('.line').forEach(line => {
        line.classList.remove('show-line');
    });
};

restartBtn.addEventListener("click", resetGame);

// Create Score State
let score = JSON.parse(localStorage.getItem("ttt-score")) || {
    X: 0,
    O: 0
};

function loadScoreToUI() {
    document.querySelector("#scoreX").textContent = score.X;
    document.querySelector("#scoreO").textContent = score.O;
}

// Update Score Function
function updateScore(winner) {
    if (winner === "X") {
        score.X++;
    } else if (winner === "O") {
        score.O++;
    }

    // update UI
    document.querySelector("#scoreX").textContent = score.X;
    document.querySelector("#scoreO").textContent = score.O;

    // SAVE TO localStorage
    localStorage.setItem("ttt-score", JSON.stringify(score));
}

startGame();
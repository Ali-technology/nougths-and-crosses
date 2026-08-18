/* =========================================
   DOM ELEMENTS
========================================= */

const cells = document.querySelectorAll(".cell");
const main = document.querySelector(".main");
const restartBtn = document.querySelector("#restartBtn");
const display = document.querySelector("#turnDisplay");
const resetScoreBtn = document.querySelector("#resetScore");
const themeToggle = document.querySelector("#themeToggle");
const scoreXDisplay = document.querySelector("#scoreX");
const scoreODisplay = document.querySelector("#scoreO");


/* =========================================
   AUDIO DOM ELEMENTS
========================================= */
const backgroundMusic = document.querySelector("#backgroundMusic");
const audioOptions = document.querySelector(".audio-options");
const audioOptionsContainer = document.querySelector(".audio-options-container");
const musicToggle = document.querySelector("#musicToggle");
const volumeControl = document.querySelector("#volumeControl");
const audioOverlay = document.querySelector(".audio-overlay");

/* =========================================
AUDIO SETTINGS
========================================= */

backgroundMusic.volume = 0.5; // This Will Set the Volume of the Background Music Based on the Slider Value


/* =========================================
AUDIO OPTIONS MENU
========================================= */
audioOptions.addEventListener("click", () => {
    audioOptionsContainer.classList.toggle("show-audio-options");

    audioOverlay.classList.toggle("show-overlay");
});


/* =========================================
PLAY BACKGROUND MUSIC
========================================= */

function playBackgroundMusic() {
    backgroundMusic.play().catch(error => {
        console.log("Music could not start:", error);
    });
}


/* =========================================
TOGGLE MUSIC
========================================= */

function toggleMusic() {

    if (backgroundMusic.paused) {

        playBackgroundMusic();

        musicStarted = true;

        musicToggle.textContent = "🔊";

        localStorage.setItem("music", "on");

    } else {

        backgroundMusic.pause();

        musicToggle.textContent = "🔇";

        localStorage.setItem("music", "off");
    }
}


/* =========================================
VOLUME CONTROL
========================================= */

volumeControl.addEventListener("input", () => {

    backgroundMusic.volume = volumeControl.value;

});


/* =========================================
RESTORE MUSIC PREFERENCE
========================================= */

function restoreMusicPreference() {

    const savedMusic = localStorage.getItem("music");

    if (savedMusic === "off") {

        backgroundMusic.pause();

        musicToggle.textContent = "🔇";

    } else {

        musicToggle.textContent = "🔊";
    }
}


/* =========================================
   GAME STATE
========================================= */

let currentPlayer = "X";
let gameActive = true;

let musicStarted = false;
let musicPausedByUser = false;

let score = JSON.parse(localStorage.getItem("ttt-score")) || {
    X: 0,
    O: 0
};


/* =========================================
   WINNING PATTERNS
========================================= */

const winPatterns = [
    { pattern: [0, 1, 2], line: ".row-1" },
    { pattern: [3, 4, 5], line: ".row-2" },
    { pattern: [6, 7, 8], line: ".row-3" },

    { pattern: [0, 3, 6], line: ".col-1" },
    { pattern: [1, 4, 7], line: ".col-2" },
    { pattern: [2, 5, 8], line: ".col-3" },

    { pattern: [0, 4, 8], line: ".diag-1" },
    { pattern: [2, 4, 6], line: ".diag-2" }
];


/* =========================================
   START GAME
========================================= */

function startGame() {
    loadScoreToUI();
    restoreTheme();
    restoreMusicPreference();
    resetLines();
    updateUI();
    attachCellEvents();
}


/* =========================================
   CELL EVENTS
========================================= */

function attachCellEvents() {
    cells.forEach(cell => {
        cell.addEventListener("click", handleMove, { once: true });
    });
}


/* =========================================
   HANDLE PLAYER MOVE
========================================= */

function handleMove(event) {
    const cell = event.currentTarget;

    // Prevent moves when the game has ended
    if (!gameActive) return;

    // Prevent overwriting an already occupied cell
    if (cell.textContent !== "") return;

    // Start music only on the first player interaction
    if (!musicStarted && localStorage.getItem("music") !== "off") {
        playBackgroundMusic();

        musicStarted = true;
    }

    // Place the current player's mark
    cell.textContent = currentPlayer;

    // Check for a winner
    const result = checkWinner();

    if (result) {
        endGameWithWinner(result);
        return;
    }

    // Check for a draw
    if (checkDraw()) {
        endGameAsDraw();
        return;
    }

    // Switch player
    switchPlayer();

    // Update turn display
    updateUI();
}


/* =========================================
   SWITCH PLAYER
========================================= */

function switchPlayer() {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
}


/* =========================================
   UPDATE GAME UI
========================================= */

function updateUI() {
    display.textContent = `Player ${currentPlayer}'s turn`;
}


/* =========================================
   CHECK WINNER
========================================= */

function checkWinner() {
    const board = Array.from(cells).map(cell => cell.textContent);

    for (const { pattern, line } of winPatterns) {
        const [a, b, c] = pattern;

        const hasWinner =
            board[a] &&
            board[a] === board[b] &&
            board[a] === board[c];

        if (hasWinner) {
            return {
                winner: board[a],
                line: document.querySelector(line)
            };
        }
    }

    return null;
}


/* =========================================
   CHECK DRAW
========================================= */

function checkDraw() {
    return Array.from(cells).every(
        cell => cell.textContent !== ""
    );
}


/* =========================================
   END GAME - WINNER
========================================= */

function endGameWithWinner(result) {
    gameActive = false;

    display.textContent = `Player ${result.winner} wins! 🎉`;

    showWinningLine(result.line);

    updateScore(result.winner);
}


/* =========================================
   END GAME - DRAW
========================================= */

function endGameAsDraw() {
    gameActive = false;

    display.textContent = "It's a draw! 🤝";
}


/* =========================================
   SHOW WINNING LINE
========================================= */

function showWinningLine(lineElement) {
    if (!lineElement) return;

    lineElement.classList.add("show-line");
}


/* =========================================
   RESET WINNING LINES
========================================= */

function resetLines() {
    document.querySelectorAll(".line").forEach(line => {
        line.classList.remove("show-line");
    });
}


/* =========================================
   RESET GAME
========================================= */

function resetGame() {
    // Clear the board
    cells.forEach(cell => {
        cell.textContent = "";
    });

    // Reset game state
    currentPlayer = "X";
    gameActive = true;

    // Remove winning lines
    resetLines();

    // Re-enable cell events
    attachCellEvents();

    // Update display
    updateUI();
}


/* =========================================
   LOAD SCORE
========================================= */

function loadScoreToUI() {
    scoreXDisplay.textContent = score.X;
    scoreODisplay.textContent = score.O;
}


/* =========================================
   UPDATE SCORE
========================================= */

function updateScore(winner) {
    if (!score.hasOwnProperty(winner)) return;

    score[winner]++;

    // Update UI
    loadScoreToUI();

    // Save score
    localStorage.setItem(
        "ttt-score",
        JSON.stringify(score)
    );
}


/* =========================================
   RESET SCORE
========================================= */

function resetScore() {
    score = {
        X: 0,
        O: 0
    };

    loadScoreToUI();

    localStorage.removeItem("ttt-score");
}


/* =========================================
   THEME SYSTEM
========================================= */

function toggleTheme() {
    document.body.classList.toggle("light-mode");
    main.classList.toggle("light-mode");

    const isLightMode = main.classList.contains("light-mode");

    localStorage.setItem(
        "theme",
        isLightMode ? "light" : "dark"
    );
}


/* =========================================
   RESTORE SAVED THEME
========================================= */

function restoreTheme() {
    const savedTheme = localStorage.getItem("theme");

    const isLightMode = savedTheme === "light";

    document.body.classList.toggle(
        "light-mode",
        isLightMode
    );

    main.classList.toggle(
        "light-mode",
        isLightMode
    );
}


/* =========================================
   EVENT LISTENERS
========================================= */

restartBtn.addEventListener("click", resetGame);

resetScoreBtn.addEventListener("click", resetScore);

themeToggle.addEventListener("click", toggleTheme);

musicToggle.addEventListener("click", toggleMusic);


/* =========================================
   INITIALIZE GAME
========================================= */

startGame();
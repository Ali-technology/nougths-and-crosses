/* =========================================
   DOM ELEMENTS
========================================= */

const cells = document.querySelectorAll(".cell");

const main = document.querySelector(".main");

const display = document.querySelector("#turnDisplay");

const resetScoreBtn = document.querySelector("#resetScore");

const themeToggle = document.querySelector("#themeToggle");

const scoreXDisplay = document.querySelector("#scoreX");

const scoreODisplay = document.querySelector("#scoreO");

const scoreDrawDisplay = document.querySelector("#scoreDraw");

const scoreXName = document.querySelector("#scoreXName");

const scoreOName = document.querySelector("#scoreOName");


/* =========================================
   START SCREEN
========================================= */

const gameStartScreen = document.querySelector("#gameStartScreen");

const startGameBtn = document.querySelector("#start-game-btn");


/* =========================================
   GAME MODE
========================================= */

const modeOptions = document.querySelectorAll(".mode-option");

const gameModeDisplay = document.querySelector("#gameModeDisplay");

const changeModeBtn = document.querySelector("#changeModeBtn");

const resultChangeModeBtn = document.querySelector("#resultChangeModeBtn");


/* =========================================
   PLAYER SETUP
========================================= */

const playerXNameInput = document.querySelector("#playerXName");

const playerONameInput = document.querySelector("#playerOName");

const playerONameContainer = document.querySelector("#playerONameContainer");


/* =========================================
   DIFFICULTY
========================================= */

const difficultySection = document.querySelector("#difficultySection");

const difficultyOptions = document.querySelectorAll( ".difficulty-option");


/* =========================================
   RESULT OVERLAY
========================================= */

const resultOverlay = document.querySelector("#resultOverlay");

const resultIcon = document.querySelector("#resultIcon");

const resultTitle = document.querySelector("#resultTitle");

const resultMessage = document.querySelector("#resultMessage");

const playAgainBtn = document.querySelector("#playAgainBtn");


/* =========================================
   AUDIO DOM ELEMENTS
========================================= */

const backgroundMusic = document.querySelector("#backgroundMusic");

const audioOptions = document.querySelector(".audio-options");

const audioOptionsContainer = document.querySelector(".audio-options-container");

const musicToggle = document.querySelector("#musicToggle");

const soundToggle = document.querySelector("#soundToggle");

const volumeControl = document.querySelector("#volumeControl");

const audioOverlay = document.querySelector(".audio-overlay");

const clickSound = document.querySelector("#clickSound");

const moveSound = document.querySelector("#moveSound");

const winSound = document.querySelector("#winSound");

const loseSound = document.querySelector("#loseSound");

const drawSound = document.querySelector("#drawSound");

const errorSound = document.querySelector("#errorSound");


/* =========================================
   AUDIO SETTINGS
========================================= */

backgroundMusic.volume = Number(volumeControl.value);


/* =========================================
   GAME SOUND EFFECT
========================================= */

function playSound(sound) {

    if (!soundEnabled) {
        return;
    }

    sound.currentTime = 0;

    sound.play().catch(error => {

        console.log(
            "Sound could not play:",
            error
        );

    });

}


/* =========================================
   GAME STATE
========================================= */

let currentPlayer = "X";

let gameActive = false;

let gameMode = "two-player";

let difficulty = "easy";

let playerNames = {

    X: "Player X",

    O: "Player O"

};


/*
    Computer is always O.
*/

const COMPUTER_PLAYER = "O";

const HUMAN_PLAYER = "X";


/*
    Used to prevent the computer from
    making a move after the game has ended.
*/

let computerThinking = false;


/* =========================================
   MUSIC STATE
========================================= */

let musicStarted = false;

let musicPausedByUser = false;


/* =========================================
   SOUND EFFECT STATE
========================================= */

let soundEnabled =
    localStorage.getItem(
        "ttt-sound"
    ) !== "off";


/* =========================================
   SCORE
========================================= */

/*
    The game now keeps separate scores for
    Two Player and Computer modes.

    An older score format is also supported.
*/

const savedScore =
    JSON.parse(
        localStorage.getItem(
            "ttt-score"
        )
    );


let scores;


if (
    savedScore &&
    savedScore.twoPlayer &&
    savedScore.computer
) {

    scores = savedScore;

} else if (
    savedScore &&
    typeof savedScore.X === "number"
) {

    /*
        Migrate the old score format.
    */

    scores = {

        twoPlayer: {

            X: savedScore.X || 0,

            O: savedScore.O || 0,

            draws: 0

        },

        computer: {

            X: 0,

            O: 0,

            draws: 0

        }

    };

} else {

    scores = {

        twoPlayer: {

            X: 0,

            O: 0,

            draws: 0

        },

        computer: {

            X: 0,

            O: 0,

            draws: 0

        }

    };
}


/* =========================================
   WINNING PATTERNS
========================================= */

const winPatterns = [

    {
        pattern: [0, 1, 2],
        line: ".row-1"
    },

    {
        pattern: [3, 4, 5],
        line: ".row-2"
    },

    {
        pattern: [6, 7, 8],
        line: ".row-3"
    },

    {
        pattern: [0, 3, 6],
        line: ".col-1"
    },

    {
        pattern: [1, 4, 7],
        line: ".col-2"
    },

    {
        pattern: [2, 5, 8],
        line: ".col-3"
    },

    {
        pattern: [0, 4, 8],
        line: ".diag-1"
    },

    {
        pattern: [2, 4, 6],
        line: ".diag-2"
    }

];


/* =========================================
   GAME MODE SELECTION
========================================= */

modeOptions.forEach(button => {

    button.addEventListener(
        "click",
        () => {

            const selectedMode =
                button.dataset.mode;

            setGameMode(
                selectedMode
            );

        }
    );

});


function setGameMode(mode) {

    gameMode = mode;


    modeOptions.forEach(button => {

        button.classList.toggle(
            "active",
            button.dataset.mode === mode
        );

    });


    if (mode === "computer") {

        playerONameContainer.style.display =
            "none";

        difficultySection.style.display =
            "block";

        gameModeDisplay.textContent =
            "Vs Computer";

    } else {

        playerONameContainer.style.display =
            "flex";

        difficultySection.style.display =
            "none";

        gameModeDisplay.textContent =
            "Two Players";
    }


    loadScoreToUI();
}


/* =========================================
   DIFFICULTY SELECTION
========================================= */

difficultyOptions.forEach(button => {

    button.addEventListener(
        "click",
        () => {

            difficulty =
                button.dataset.difficulty;


            difficultyOptions.forEach(
                option => {

                    option.classList.toggle(
                        "active",
                        option.dataset.difficulty ===
                            difficulty
                    );

                }
            );

        }
    );

});


/* =========================================
   AUDIO OPTIONS MENU
========================================= */

audioOptions.addEventListener("click", () => {

        playSound(clickSound);

        audioOptionsContainer.classList.toggle("show-audio-options");

        audioOverlay.classList.toggle("show-overlay");
    }
);


/* =========================================
   CLOSE AUDIO MENU
========================================= */

audioOverlay.addEventListener("click", closeAudioMenu);


function closeAudioMenu() {
    audioOptionsContainer.classList.remove( "show-audio-options");

    audioOverlay.classList.remove("show-overlay");
}


/* =========================================
   SOUND TOGGLE
========================================= */

function toggleSound() {

    soundEnabled = !soundEnabled;

    soundToggle.textContent = soundEnabled ? "🔊" : "🔇";

    localStorage.setItem("ttt-sound", soundEnabled ? "on" : "off");

    if (soundEnabled) {
        playSound(clickSound);
    }
}


/* =========================================
   PLAY BACKGROUND MUSIC
========================================= */

function playBackgroundMusic() {

    backgroundMusic
        .play()
        .then(() => {

            musicStarted =
                true;

            musicPausedByUser =
                false;

            musicToggle.textContent =
                "🔊";

            localStorage.setItem(
                "music",
                "on"
            );

        })
        .catch(error => {

            console.log(
                "Music could not start:",
                error
            );

        });
}


/* =========================================
   TOGGLE MUSIC
========================================= */

function toggleMusic() {

    if (!backgroundMusic.paused) {

        backgroundMusic.pause();

        musicPausedByUser =
            true;

        musicToggle.textContent =
            "🔇";

        localStorage.setItem(
            "music",
            "off"
        );

        return;
    }


    playBackgroundMusic();
}


/* =========================================
   VOLUME CONTROL
========================================= */

volumeControl.addEventListener(
    "input",
    () => {

        backgroundMusic.volume =
            Number(
                volumeControl.value
            );

    }
);


/* =========================================
   RESTORE MUSIC PREFERENCE
========================================= */

function restoreMusicPreference() {

    const savedMusic =
        localStorage.getItem(
            "music"
        );


    if (savedMusic === "off") {

        backgroundMusic.pause();

        musicToggle.textContent =
            "🔇";

        musicPausedByUser =
            true;

        return;
    }


    musicToggle.textContent =
        "🔊";

    musicPausedByUser =
        false;
}


/* =========================================
   RESTORE SOUND PREFERENCE
========================================= */

function restoreSoundPreference() {

    soundEnabled =
        localStorage.getItem(
            "ttt-sound"
        ) !== "off";


    soundToggle.textContent =
        soundEnabled
            ? "🔊"
            : "🔇";
}


/* =========================================
   START GAME
========================================= */

function startGame() {

    const xName =
        playerXNameInput.value.trim();

    const oName =
        playerONameInput.value.trim();


    playerNames.X =
        xName || "Player X";


    if (gameMode === "computer") {

        playerNames.O =
            "Computer";

    } else {

        playerNames.O =
            oName || "Player O";
    }


    loadScoreToUI();

    restoreTheme();

    restoreMusicPreference();

    resetBoard();


    currentPlayer =
        "X";

    gameActive =
        true;

    computerThinking =
        false;


    updateUI();


    attachCellEvents();


    gameStartScreen.classList.add(
        "hide"
    );


    if (
        !musicStarted &&
        !musicPausedByUser &&
        localStorage.getItem(
            "music"
        ) !== "off"
    ) {

        playBackgroundMusic();
    }
}


/* =========================================
   START BUTTON
========================================= */

startGameBtn.addEventListener("click", () => {

    playSound(clickSound);
    startGame();

});


/* =========================================
   CELL EVENTS
========================================= */

function attachCellEvents() {

    cells.forEach(cell => {

        cell.removeEventListener(
            "click",
            handleMove
        );

        cell.addEventListener(
            "click",
            handleMove
        );

    });
}


/* =========================================
   HANDLE PLAYER MOVE
========================================= */

function handleMove(event) {

    if (!gameActive) {
        return;
    }

    if (computerThinking) {
        return;
    }

    if (gameMode === "computer" && currentPlayer === COMPUTER_PLAYER) {
        return;
    }

    const cell = event.currentTarget;

    if (cell.textContent !== "") {
        playSound(errorSound);
        return;
    }

    makeMove(cell, currentPlayer);
}


function makeMove(cell, player) {

    cell.textContent = player;

    playSound(moveSound);

    cell.classList.remove("mark-added");

    void cell.offsetWidth;

    cell.classList.add("mark-added");

    const result = checkWinner();

    if (result) {
        endGameWithWinner(result);
        return;
    }

    if (checkDraw()) {
        endGameAsDraw();
        return;
    }

    switchPlayer();

    updateUI();

    if (gameMode === "computer" && currentPlayer === COMPUTER_PLAYER && gameActive) {
        computerMove();
    }
}


/* =========================================
   SWITCH PLAYER
========================================= */

function switchPlayer() {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
}


/* =========================================
   UPDATE UI
========================================= */

function updateUI() {

    if (gameMode === "computer" && currentPlayer === COMPUTER_PLAYER) {

        display.textContent = "Computer is thinking...";

        display.classList.add("thinking");

        return;
    }


    display.classList.remove("thinking");


    display.textContent = `${playerNames[currentPlayer]}'s turn`;
}


/* =========================================
   CHECK WINNER
========================================= */

function checkWinner(boardState = null) {

    const board = boardState || Array.from(cells).map(cell => cell.textContent);


    for (const { pattern, line } of winPatterns) {

        const [a, b, c] = pattern;

        const hasWinner = board[a] && board[a] === board[b] && board[a] === board[c];


        if (hasWinner) {

            return {
                winner: board[a],
                pattern,
                line: document.querySelector(line)
            };
        }
    }


    return null;
}


/* =========================================
   CHECK DRAW
========================================= */

function checkDraw(boardState = null) {

    const board = boardState || Array.from(cells).map(cell => cell.textContent);

    return board.every(cell => cell !== "");
}


/* =========================================
   COMPUTER MOVE
========================================= */

function computerMove() {

    computerThinking = true;

    updateUI();


    /*
        Small delay makes the computer feel
        more natural.
    */

    setTimeout(() => {

        if (!gameActive) {
            computerThinking = false;
            return;
        }

        const board = getBoardState();

        let move;

        if (difficulty === "easy") {

            move = getEasyMove(board);

        } else if (difficulty === "medium") {

            move = getMediumMove(board);

        } else {

            move = getHardMove(board);

        }


        if (move !== null && move !== undefined) {
            makeMove(cells[move], COMPUTER_PLAYER);
        }


        computerThinking = false;

    }, 750);
}


/* =========================================
   GET BOARD STATE
========================================= */

function getBoardState() {

    return Array.from(cells).map(
        cell => cell.textContent
    );
}


/* =========================================
   GET EMPTY CELLS
========================================= */

function getEmptyCells(board) {

    return board.map((value, index) => value === "" ? index : null).filter(
        index => index !== null
    );
}


/* =========================================
   EASY COMPUTER
========================================= */

function getEasyMove(board) {

    const emptyCells = getEmptyCells(board);

    if (!emptyCells.length) {
        return null;
    }

    // Computer Picks Randomly
    const randomIndex = Math.floor(Math.random() * emptyCells.length);

    return emptyCells[randomIndex];
}


/* =========================================
   MEDIUM COMPUTER
========================================= */

function getMediumMove(board) {

    const emptyCells = getEmptyCells(board);

    if (!emptyCells.length) {
        return null;
    }


    /*
        1. Try to win.
    */

    const winningMove = findWinningMove(board, COMPUTER_PLAYER);

    if (winningMove !== null) {
        return winningMove;
    }


    /*
        2. Block the human.
    */

    const blockingMove = findWinningMove(board, HUMAN_PLAYER);

    if (blockingMove !== null) {
        return blockingMove;
    }


    /*
        3. Take center.
    */

    if (board[4] === "") {
        return 4;
    }


    /*
        4. Take a corner.
    */

    const corners = [0, 2, 6, 8].filter(index => board[index] === "");

    if (corners.length) {
        return corners[Math.floor(Math.random() * corners.length)];
    }


    /*
        5. Random move.
    */

    return getEasyMove(board);
}


/* =========================================
   FIND WINNING MOVE
========================================= */

function findWinningMove(board,player) {

    const emptyCells = getEmptyCells(board);

    for (const index of emptyCells) {

        const testBoard = [...board];

        testBoard[index] = player;

        if (checkWinner(testBoard)) {
            return index;
        }
    }

    return null;
}


/* =========================================
   HARD COMPUTER
   MINIMAX
========================================= */

function getHardMove(board) {

    const emptyCells = getEmptyCells(board);

    if (!emptyCells.length) {
        return null;
    }


    /*
        If this is the first move, use a
        strategic opening.
    */

    if (emptyCells.length === 9) {
        return 4;
    }


    let bestScore = -Infinity;

    let bestMove = emptyCells[0];


    for (const index of emptyCells) {

        const testBoard = [...board];

        testBoard[index] = COMPUTER_PLAYER;

        const score = minimax(testBoard, false, 0);

        if (score > bestScore) {

            bestScore = score;

            bestMove = index;
        }
    }


    return bestMove;
}


/* =========================================
   MINIMAX ALGORITHM
========================================= */

function minimax(board, maximizing, depth) {

    const result = checkWinner(board);

    if (result) {

        if (result.winner === COMPUTER_PLAYER) {
            return 10 - depth;
        }

        return depth - 10;
    }

    if (checkDraw(board)) {
        return 0;
    }

    const emptyCells = getEmptyCells(board);

    if (maximizing) {

        let bestScore = -Infinity;

        for (const index of emptyCells) {

            const testBoard = [...board];

            testBoard[index] = COMPUTER_PLAYER;

            const score = minimax(testBoard, false, depth + 1);

            bestScore = Math.max(bestScore, score);
        }


        return bestScore;

    } else {

        let bestScore = Infinity;

        for (const index of emptyCells) {

            const testBoard = [...board];

            testBoard[index] = HUMAN_PLAYER;

            const score = minimax(testBoard, true, depth + 1);

            bestScore = Math.min(bestScore, score);
        }


        return bestScore;
    }
}


/* =========================================
   END GAME - WINNER
========================================= */

function endGameWithWinner(result) {

    gameActive = false;

    computerThinking = false;

    display.classList.remove("thinking");

    showWinningLine(result);

    updateScore(result.winner);

    if (gameMode === "computer") {

        if (result.winner === HUMAN_PLAYER) {

            showResult( "🎉", "You Win!", "Excellent move!");
            playSound(winSound);

        } else {

            showResult("🤖", "Computer Wins!", "Better luck next round!");
            playSound(loseSound);

        }

    } else {

        showResult( "🎉", `${playerNames[result.winner]} Wins!`, "Excellent game!");
        playSound(winSound);
    
    }

}



/* =========================================
   END GAME - DRAW
========================================= */

function endGameAsDraw() {

    gameActive = false;

    computerThinking = false;

    display.classList.remove("thinking");

    updateDrawScore();

    showResult("🤝", "It's a Draw!", "Nobody wins this round.");

    playSound(drawSound);

}


/* =========================================
   SHOW RESULT
========================================= */

function showResult(icon, title, message) {

    resultIcon.textContent = icon;

    resultTitle.textContent = title;

    resultMessage.textContent = message;


    resultOverlay.classList.add(
        "show"
    );
}


/* =========================================
   CLOSE RESULT
========================================= */

function closeResult() {

    resultOverlay.classList.remove(
        "show"
    );
}


/* =========================================
   SHOW WINNING LINE
========================================= */

function showWinningLine(
    result
) {

    if (!result.line) {
        return;
    }


    result.line.classList.add(
        "show-line"
    );


    result.pattern.forEach(
        index => {

            cells[index].classList.add(
                "winning-cell"
            );

        }
    );
}


/* =========================================
   RESET WINNING LINES
========================================= */

function resetLines() {

    document
        .querySelectorAll(".line")
        .forEach(line => {

            line.classList.remove(
                "show-line"
            );

        });


    cells.forEach(cell => {

        cell.classList.remove(
            "winning-cell"
        );

    });
}


/* =========================================
   RESET BOARD
========================================= */

function resetBoard() {

    cells.forEach(cell => {

        cell.textContent =
            "";

        cell.classList.remove(
            "mark-added"
        );

        cell.classList.remove(
            "winning-cell"
        );

    });


    resetLines();


    currentPlayer =
        "X";

    gameActive =
        true;

    computerThinking =
        false;


    updateUI();


    attachCellEvents();
}


/* =========================================
   RESET GAME
========================================= */

function resetGame() {

    closeResult();

    resetBoard();


    /*
        Music deliberately does NOT start here.

        If the user paused music, it remains paused.
    */
}


/* =========================================
   LOAD SCORE
========================================= */

function loadScoreToUI() {
    const scoreKey = gameMode === "two-player" ? "twoPlayer" : "computer";

    const currentScore = scores[scoreKey];

    scoreXDisplay.textContent = currentScore.X;

    scoreODisplay.textContent = currentScore.O;

    scoreDrawDisplay.textContent = currentScore.draws;

    scoreXName.textContent = gameMode === "computer" ? "You" : playerNames.X;

    scoreOName.textContent = gameMode === "computer" ? "Computer" : playerNames.O;
}


/* =========================================
   UPDATE SCORE
========================================= */

function updateScore(winner) {

    const scoreKey = gameMode === "two-player" ? "twoPlayer" : "computer";

    const currentScore = scores[scoreKey];

    if (!Object.prototype.hasOwnProperty.call(currentScore, winner)) {
        return;
    }

    currentScore[winner]++;

    loadScoreToUI();

    localStorage.setItem("ttt-score", JSON.stringify(scores));
}


/* =========================================
   UPDATE DRAW SCORE
========================================= */

function updateDrawScore() {

    scores[gameMode].draws++;


    loadScoreToUI();


    localStorage.setItem(
        "ttt-score",
        JSON.stringify(
            scores
        )
    );
}


/* =========================================
   RESET SCORE
========================================= */

function resetScore() {

    const scoreKey = gameMode === "two-player" ? "twoPlayer" : "computer";

    scores[scoreKey] = {

        X: 0,

        O: 0,

        draws: 0

    };

    loadScoreToUI();

    localStorage.setItem("ttt-score", JSON.stringify(scores));

    playSound(clickSound);
}


/* =========================================
   CHANGE MODE
========================================= */

function changeGameMode() {

    closeResult();

    gameActive = false;

    computerThinking = false;

    gameStartScreen.classList.remove(
        "hide"
    );

    /*
        Keep the current names and selections.
        The player can simply select another mode.
    */
}


/* =========================================
   THEME SYSTEM
========================================= */

function toggleTheme() {

    document.body.classList.toggle(
        "light-mode"
    );

    main.classList.toggle(
        "light-mode"
    );

    const isLightMode = main.classList.contains("light-mode");

    localStorage.setItem("theme", isLightMode ? "light" : "dark");
}


/* =========================================
   RESTORE SAVED THEME
========================================= */

function restoreTheme() {
    const savedTheme = localStorage.getItem("theme");

    const isLightMode = savedTheme === "light";

    document.body.classList.toggle("light-mode", isLightMode);

    main.classList.toggle("light-mode", isLightMode);
}


/* =========================================
   EVENT LISTENERS
========================================= */

resetScoreBtn.addEventListener("click", () => {

    playSound(clickSound);
    resetScore();

});

themeToggle.addEventListener("click", () => {
   
    playSound(clickSound);
    toggleTheme();

});

musicToggle.addEventListener("click", () => {

    playSound(clickSound);
    toggleMusic();

});

soundToggle.addEventListener("click", toggleSound);

playAgainBtn.addEventListener("click", resetGame);

changeModeBtn.addEventListener("click", changeGameMode);

resultChangeModeBtn.addEventListener("click", changeGameMode);


/* =========================================
   INITIALIZE
========================================= */

loadScoreToUI();

restoreTheme();

restoreMusicPreference();

restoreSoundPreference();

resetLines();

setGameMode("two-player");
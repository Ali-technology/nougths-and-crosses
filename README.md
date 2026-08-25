# 🎮 Noughts & Crosses

A modern, responsive, and interactive **Noughts & Crosses (Tic-Tac-Toe)** game built with **HTML, CSS, and JavaScript**.

The game features multiple game modes, computer difficulty levels, sound effects, background music, dark/light themes, persistent scores, and a polished responsive interface.

---


## 🚀 Live Demo

🔗 **Play the Game:**  
[Live Demo](YOUR_LIVE_DEMO_LINK)

---


## 📸 Preview

![Noughts & Crosses Preview](/assets/images/X-O.png)

---


## ✨ Features

### 🎮 Multiple Game Modes

Choose between:

- 👥 **Two Player Mode**
  - Play against another person on the same device.
  - Enter custom player names.
  - Automatic board reset after a completed round.

- 🤖 **Computer Mode**
  - Play against the computer.
  - Computer plays as **O**.
  - Player plays as **X**.

---

### 🧠 Computer Difficulty

Computer mode includes three difficulty levels:

#### 🟢 Easy

The computer selects an available cell randomly.

Best for:
- Beginners
- Casual gameplay
- Learning the game

#### 🟡 Medium

The computer uses basic strategy:

1. Attempts to win.
2. Blocks the player's winning move.
3. Takes the center when available.
4. Prioritizes corners.
5. Makes a random move when necessary.

#### 🔴 Hard

Uses the **Minimax algorithm** to evaluate possible game states and select the optimal move.

The Hard difficulty is designed to provide a much stronger opponent and can play strategically to avoid losing.

---


## 🔊 Audio System

The game includes a complete audio feedback system.

### Sound Effects

#### Different sounds are triggered by different interactions:

- 🖱️ Click sound
- ✖️ Move sound
- 🏆 Win sound
- 🤝 Draw sound
- ❌ Error sound
- 🤖 Computer loss/win feedback

### Background Music

#### Players can:

- Play background music
- Pause background music
- Adjust volume
- Enable/disable music

Audio preferences are remembered using `localStorage`.

---


## 🌙 Dark & Light Mode

### The game supports both:

- 🌙 Dark Mode
- ☀️ Light Mode

The selected theme is stored using `localStorage`, so the player's preferred theme can be restored when they return.

---


## 🏆 Score System

The game keeps track of:

- X wins
- O wins
- Draws

Scores are stored separately for each game mode.

### Two Player

```text
Player X
Player O
Draws

Computer
You
Computer
Draws

Scores persist even after refreshing the page.
```


## 🔄 Automatic Round Reset

In Two Player Mode, the board automatically resets approximately 2 seconds after:

A player wins
The game ends in a draw

This allows the result to remain visible briefly before the next round begins.

The score is preserved between rounds.


## 🎨 Interactive Game UI

### The interface includes:

1. Animated player moves
2. Winning-line animation
3. Winning-cell highlighting
4. Turn indicator
5. Computer thinking indicator
6. Result overlay
7. Game mode display
8. Responsive controls


## 📱 Responsive Design

### The game is designed to work across different screen sizes:

1. 💻 Desktop
2. 💻 Laptop
3. 📱 Mobile
4. 📱 Landscape mobile
5. 📟 Tablet

The layout adapts to smaller screens while maintaining an accessible game board and controls.


## 💾 Local Storage

The game uses browser localStorage to preserve important user preferences and game data.

### Stored information includes:

1. Theme preference
2. Music preference
3. Sound preference
4. Game scores

This means users don't lose their preferences when they refresh the page.


## 🧠 How the Game Works

### Noughts & Crosses is played on a 3 × 3 grid.

#### Two players take turns placing their marks:

- X
- O

The first player to place three matching marks in a straight line wins.

A winning combination can be:

Horizontal
Vertical
Diagonal

If all nine cells are occupied without a winning combination, the round ends in a draw.


## 🎮 How to Play

### Two Player Mode

1. Open the game.
2. Select Two Players.
3. Enter the player names.
4. Start the game.
5. Player X makes the first move.
6. Players take turns selecting empty cells.
7. The first player to get three marks in a row wins.

After a win or draw, the board automatically resets after approximately two seconds.

### Computer Mode

1. Open the game.
2. Select Vs Computer.
3. Choose a difficulty level.
4. Start the game.
5. You play as X.
6. The computer plays as O.
7. Try to defeat the computer.


## 🛠️ Technologies Used

1. Frontend
2. HTML5
3. CSS3
4. JavaScript (ES6+)
5. Browser APIs
6. DOM API
7. HTML5 Audio API
8. local Storage


## 📂 Project Structure

### The project is organized into separate folders for HTML, CSS, JavaScript, images, and audio assets.

```
noughts-and-crosses/
│
├── audio/
│   ├── background-music.mp3
│   ├── click.mp3
│   ├── move.mp3
│   ├── win.mp3
│   ├── lose.mp3
│   ├── draw.mp3
│   └── error.mp3
│
├── CSS/
│   └── n-and-c.css
│
├── html/
│   └── n-and-c.html
│
├── images/
│   ├── PngItem_516981.png
│   ├── UI-background-2.png
│   ├── X_O.jpg
│   └── X-O.png
│
├── JavaScript/
│   └── n-and-c.js
│
└── README.md
```
Note: The folder names and file names above reflect the current structure of the project.

## 📁 Folder Overview
### audio/
Contains all audio assets used by the game, including background music and gameplay sound effects.

### CSS/
Contains the stylesheet responsible for the game's visual design, layout, animations, themes, and responsive behavior.

### CSS/
└── n-and-c.css

### html/
Contains the main HTML document that defines the game's interface and structure.

### html/
└── n-and-c.html

### images/
Contains the image assets used throughout the project.

### images/
├── PngItem_516981.png
├── UI-background-2.png
├── X_O.jpg
└── X-O.png

### JavaScript/
#### Contains the main game logic, including:
Game state management
Player turns
Computer AI
Difficulty levels
Win detection
Draw detection
Score management
Audio controls
Theme management
Game-mode switching
Board resetting

### JavaScript/
└── n-and-c.js

### README.md

#### The project documentation containing information about the game, features, technologies, project structure, and usage.


## ⚙️ Main JavaScript Systems

### The JavaScript application is divided into several functional systems.

#### Game Management
startGame()
resetGame()
resetBoard()

##### Responsible for starting and resetting game rounds.

#### Game Modes
setGameMode()
changeGameMode()

##### Controls switching between Two Player and Computer modes.

#### Player Moves
handleMove()
makeMove()
switchPlayer()

##### Handles player interactions and turn management.

#### Win & Draw Detection
checkWinner()
checkDraw()

##### Determines the current state of the game.

#### Computer AI
computerMove()
getEasyMove()
getMediumMove()
getHardMove()
minimax()

##### Controls the computer's behavior across the three difficulty levels.

#### Score Management
loadScoreToUI()
updateScore()
updateDrawScore()
resetScore()

##### Manages and displays game scores.

#### Audio
playSound()
toggleSound()
toggleMusic()
playBackgroundMusic()

##### Controls sound effects and background music.

#### Theme
toggleTheme()
restoreTheme()

##### Controls Dark and Light Mode.


## 🧠 Minimax Algorithm

The Hard computer difficulty uses the Minimax algorithm.

The algorithm evaluates possible future game states and assigns scores based on the outcome.

Conceptually:

```
Computer Win
     ↓
 Positive Score

Draw
     ↓
     0

Computer Loss
     ↓
 Negative Score
```

The computer evaluates the available moves and chooses the move that produces the strongest possible outcome.

This makes the Hard difficulty considerably more challenging than the Easy and Medium modes.


## 🎯 Game Rules

### The objective is simple:

Get three of your marks in a row before your opponent does.

### Winning combinations include:
```
X X X
- - -
- - -

X - -
X - -
X - -

X - -
- X -
- - X
```

The first player to complete a horizontal, vertical, or diagonal line wins.

If all nine cells are occupied and neither player has three in a row, the game ends in a draw.


## 🔮 Future Improvements

### Possible future improvements include:

 1. Online multiplayer
 2. Real-time multiplayer using WebSockets
 3. Player profiles
 4. Player avatars
 5. Win streak tracking
 6. Match history
 7. Leaderboards
 8. Tournament mode
 9. Custom board sizes
 10. Advanced AI
 11. AI statistics
 12. Game replay system
 13. Keyboard accessibility
 14. Additional themes
 15. Custom sound settings
 16. Progressive Web App (PWA) support


## 🔐 Privacy

Noughts & Crosses does not require users to create an account.

Game preferences and scores are stored locally in the browser using localStorage.

The game does not require a backend server to operate.


## 👨‍💻 Author
### Habeeb Ali

### Front-End Developer, UI/UX Designer & Graphic Designer


## 📬 Contact
- Email: havisuuals26@gmail.com
- GitHub: https://github.com/Ali-technology
- Facebook: https://www.facebook.com/profile.php?id=100067484664093


## ⭐ Support

If you enjoyed the project or found it useful, consider giving the repository a ⭐ on GitHub.

#### Your support is greatly appreciated!

## 📄 License

### This project is available for educational and personal use.

### You are welcome to study, modify, and improve the project for your own learning and development.

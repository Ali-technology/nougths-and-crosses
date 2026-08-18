# 🎮 Noughts & Crosses

A polished, responsive **Noughts & Crosses (Tic-Tac-Toe)** game built with **HTML, CSS, and modern JavaScript (ES6+)**.

The project focuses not only on the game logic, but also on creating an engaging user experience through responsive design, theme switching, background ambience, audio controls, persistent scores, and animated winning indicators.

---

## ✨ Features

* 🎮 **Two-player gameplay** — Players X and O can play against each other.
* 🏆 **Winner detection** — Automatically detects all possible winning combinations.
* 🤝 **Draw detection** — Detects when the board is completely filled without a winner.
* 📈 **Persistent scoreboard** — Scores are stored using `localStorage` and remain after refreshing the page.
* 🔄 **Restart Game** — Start a new round without losing the overall scoreboard.
* 🗑️ **Reset Score** — Completely reset both players' scores.
* 🎵 **Background music** — Ambient background music enhances the gaming experience.
* ▶️ **Play/Pause controls** — Users can manually control the background music.
* 🔊 **Volume control** — Adjust the music volume using the audio settings.
* 💾 **Saved audio preference** — The game remembers whether the user turned the music on or off.
* 🌙 **Dark mode** — A visually immersive dark gaming interface.
* ☀️ **Light mode** — A separate bright visual experience.
* 💾 **Saved theme preference** — The selected theme is remembered between sessions.
* ✨ **Animated winning line** — Highlights the winning combination when a player wins.
* 📱 **Responsive design** — Optimized for desktops, tablets, and mobile devices.
* ♿ **Reduced-motion support** — Respects the user's `prefers-reduced-motion` setting.
* 🖱️ **Interactive UI** — Buttons and game cells include hover and active states.
* 🎨 **Custom visual design** — Neon/glowing interface designed specifically for the game.

---

## 🛠️ Technologies Used

| Technology          | Purpose                                                          |
| ------------------- | ---------------------------------------------------------------- |
| **HTML5**           | Game structure and semantic markup                               |
| **CSS3**            | Layout, responsive design, animations, themes and visual effects |
| **JavaScript ES6+** | Game logic, interactions and state management                    |
| **Web Storage API** | Persistent scores, theme and music preferences                   |
| **HTML5 Audio API** | Background music and audio controls                              |
| **Font Awesome**    | Interface icons                                                  |

---

## 🧠 How the Game Works

The game uses a simple turn-based system.

### 1. Player Turns

The game begins with **Player X**.

After a player selects a cell:

```text
X → O → X → O → X → ...
```

The current player changes after every valid move.

### 2. Winner Detection

After every move, the game checks the board against eight possible winning combinations:

```text
[0, 1, 2]    Top row
[3, 4, 5]    Middle row
[6, 7, 8]    Bottom row

[0, 3, 6]    Left column
[1, 4, 7]    Middle column
[2, 5, 8]    Right column

[0, 4, 8]    Diagonal
[2, 4, 6]    Diagonal
```

If three matching symbols are found, the game ends and the corresponding winning line is displayed.

### 3. Draw Detection

If every cell is occupied and no winning combination exists, the game declares:

> It's a draw! 🤝

### 4. Score Persistence

The scoreboard is stored in the browser using:

```javascript
localStorage
```

This means the scores remain available even after refreshing the page.

---

## 🎵 Audio System

The game includes an ambient background track designed to complement the game's reasoning and concentration-focused atmosphere.

The audio system includes:

* Background music
* Play/Pause functionality
* Volume adjustment
* Saved music preference
* User-initiated playback
* Audio settings panel

### Audio Behavior

The music does not continuously force itself to play.

Once the player interacts with the game, the music can begin according to the user's saved preference.

If the player manually pauses the music, subsequent game moves **do not automatically restart it**.

The user must explicitly press **Play** to resume the music.

This prevents unexpected audio playback during gameplay.

---

## 🌙 Theme System

The game supports two visual modes:

### Dark Mode

The default experience uses a dark, neon-inspired interface with glowing cyan/blue elements.

### Light Mode

The light theme provides a brighter alternative while maintaining the game's visual identity.

The selected theme is saved using:

```javascript
localStorage
```

Therefore, the user's theme preference is preserved between sessions.

---

## 📱 Responsive Design

The interface is designed to adapt to different screen sizes.

Responsive breakpoints account for:

* Desktop screens
* Large tablets
* Tablets
* Mobile phones
* Small mobile phones
* Landscape mobile devices

The game board dynamically scales using CSS variables and responsive sizing techniques.

Example:

```css
--board-size: min(400px, 80vw);
```

This allows the board to remain proportional to the available viewport.

---

## 📂 Project Structure

```text
noughts-and-crosses/
│
├── index.html
│
├── assets/
│   ├── audio/
│   │   └── background-music.mp3
│   │
│   ├── css/
│   │   └── n-and-c.css
│   │
│   ├── images/
│   │   ├── X_O.jpg
│   │   ├── UI-background.png
│   │   └── UI-background-2.png
│   │
│   └── javascript/
│       └── n-and-c.js
│
└── README.md
```

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/YOUR-USERNAME/YOUR-REPOSITORY.git
```

### 2. Open the project

Navigate into the project directory:

```bash
cd noughts-and-crosses
```

### 3. Run the game

You can open `index.html` directly in your browser.

For the best development experience, use a local development server such as **VS Code Live Server**.

---

## 🎮 How to Play

1. Player X starts the game.
2. Click an empty cell to place your symbol.
3. Player O takes the next turn.
4. Continue alternating turns.
5. Get three matching symbols in a row, column, or diagonal to win.
6. If all nine cells are occupied without a winner, the game ends in a draw.
7. Use **Restart Game** to begin another round.
8. Use **Reset Score** to clear the scoreboard.

---

## 🏆 Winning Conditions

A player wins by getting three of their symbols:

```text
X | X | X
---------
O | O | 
---------
  |   |
```

or:

```text
X | O | 
---------
X | O |
---------
X |   |
```

or:

```text
X | O |
---------
O | X |
---------
O |   | X
```

There are eight possible winning combinations in total.

---

## 💾 Local Storage

The project uses browser `localStorage` to persist game preferences.

### Stored data

```text
ttt-score
```

Stores the current X and O scores.

```text
theme
```

Stores the selected visual theme.

```text
music
```

Stores the user's music preference.

This allows the game to maintain its state and preferences across browser sessions.

---

## 🎨 Design Goals

The project was designed around three main principles:

### 1. Simplicity

The rules of Noughts & Crosses are simple, so the interface should remain easy to understand.

### 2. Immersion

The dark neon interface, glowing elements, background ambience and winning animations create a more engaging experience.

### 3. Responsiveness

The game should remain comfortable to play regardless of the device being used.

---

## 🔮 Future Improvements

Possible future improvements include:

* 🤖 Single-player mode with AI
* 🧠 Multiple AI difficulty levels
* 🏅 Player statistics
* 📊 Win/loss history
* 🎯 Best-of-three and tournament modes
* 🔔 Sound effects for moves and wins
* 🎵 Multiple background music tracks
* 🎨 More visual themes
* 🌐 Online multiplayer
* 👤 Player profiles
* 🏆 Achievement system
* 📱 Progressive Web App (PWA) support

---

## 🧪 Current Project Status

**Status:** 🟢 Complete / Playable

The current version supports fully functional two-player gameplay, responsive layouts, persistent scores, theme preferences, background music, audio controls, draw detection, and animated winning indicators.

---

## 👨‍💻 Author

**Habeeb Ali**

Front-End Developer, Graphic Designer, and UI/UX Designer

I built this project as part of my journey in developing interactive web applications while combining programming with modern UI/UX design.

---

## 📄 License

This project is available for learning and portfolio purposes.

If you reuse significant portions of the source code or design, please provide appropriate credit to the original author.

---

## ⭐ Support

If you find this project useful or interesting, consider giving the repository a ⭐ on GitHub.

Thanks for checking out **Noughts & Crosses!** 🎮

// Game configuration
const GOAL_CANS = 20;
let currentCans = 0;
let gameActive = false;
let spawnInterval;
let timerInterval;
let timeLeft = 30;

// Messages
const winMessages = [
  "Amazing! You helped provide clean water 💧",
  "You're making a real impact!",
  "Incredible work, water hero!"
];

const loseMessages = [
  "So close! Try again!",
  "Keep going, every drop counts!",
  "You can do it!"
];

// Create grid
function createGrid() {
  const grid = document.querySelector('.game-grid');
  grid.innerHTML = '';
  for (let i = 0; i < 9; i++) {
    const cell = document.createElement('div');
    cell.className = 'grid-cell';
    grid.appendChild(cell);
  }
}

createGrid();

// Spawn cans
function spawnWaterCan() {
  if (!gameActive) return;

  const cells = document.querySelectorAll('.grid-cell');
  cells.forEach(cell => (cell.innerHTML = ''));

  const randomCell = cells[Math.floor(Math.random() * cells.length)];

  const can = document.createElement('div');
  can.className = 'water-can';

  // CLICK EVENT (CORE FEATURE)
  can.addEventListener('click', () => {
    if (!gameActive) return;

    currentCans++;
    document.getElementById('current-cans').textContent = currentCans;

    // visual feedback
    can.style.transform = "scale(1.2)";
    setTimeout(() => {
      can.style.transform = "scale(1)";
    }, 100);

    // remove after click
    can.remove();
  });

  randomCell.appendChild(can);
}

// TIMER
function startTimer() {
  timeLeft = 30;
  document.getElementById('timer').textContent = timeLeft;

  timerInterval = setInterval(() => {
    timeLeft--;
    document.getElementById('timer').textContent = timeLeft;

    if (timeLeft <= 0) {
      endGame();
    }
  }, 1000);
}

// START GAME
function startGame() {
  if (gameActive) return;

  gameActive = true;
  currentCans = 0;
  document.getElementById('current-cans').textContent = 0;
  document.getElementById('achievements').textContent = "";

  createGrid();
  spawnInterval = setInterval(spawnWaterCan, 800);
  startTimer();
}

// END GAME
function endGame() {
  gameActive = false;
  clearInterval(spawnInterval);
  clearInterval(timerInterval);

  const messageBox = document.getElementById('achievements');

  let message;

  if (currentCans >= GOAL_CANS) {
    message = winMessages[Math.floor(Math.random() * winMessages.length)];
    messageBox.style.color = "green";

    // 🎉 celebration
    setTimeout(() => {
      alert("You Win! 🎉");
    }, 200);

  } else {
    message = loseMessages[Math.floor(Math.random() * loseMessages.length)];
    messageBox.style.color = "red";
  }

  messageBox.textContent = message;
}

// RESET BUTTON (LEVEL UP)
function resetGame() {
  location.reload();
}

// BUTTON EVENTS
document.getElementById('start-game').addEventListener('click', startGame);

// Create Reset Button dynamically
const resetBtn = document.createElement('button');
resetBtn.textContent = "Reset Game";
resetBtn.style.backgroundColor = "#FFC907";
resetBtn.style.color = "#000";
resetBtn.style.marginTop = "10px";

resetBtn.addEventListener('click', resetGame);

document.querySelector('.container').appendChild(resetBtn);

const overlay = document.getElementById('instruction-overlay');
const startOverlayBtn = document.getElementById('start-from-overlay');

// Start game from overlay
startOverlayBtn.addEventListener('click', () => {
  overlay.style.display = 'none';
  startGame();
});

function resetGame() {
  if (confirm("Restart the game?")) {
    location.reload();
  }
}

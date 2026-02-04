const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const SPEEDS = {
  easy: 1.5,
  normal: 2,
  hard: 3
};
const PIPE_SPACING = {
  easy: 250,
  normal: 200,
  hard: 150
};

let currentSpeed = SPEEDS.normal;
let currentMode = 'normal';

const GRAVITY = 0.5;
const FLAP = -8;
const PIPE_WIDTH = 60;
const PIPE_GAP = 150;
const BIRD_SIZE = 30;

let birdY = canvas.height / 2;
let birdV = 0;
let pipes = [];
let score = 0;
let highScore = 0;
let gameOver = false;
let rankings = [];

function loadRankings() {
  const saved = localStorage.getItem('flappy_rankings');
  if (saved) {
    rankings = JSON.parse(saved);
  } else {
    rankings = [];
  }
}

function saveRankings() {
  localStorage.setItem('flappy_rankings', JSON.stringify(rankings));
}

function updateRankings(newScore) {
  rankings.push(newScore);
  rankings = rankings.sort((a, b) => b - a).slice(0, 5);
  saveRankings();
  renderRankings();
}

function renderRankings() {
  const list = document.getElementById('rankingList');
  list.innerHTML = '';
  rankings.forEach((s, i) => {
    const li = document.createElement('li');
    li.textContent = `${i + 1}위: ${s}점`;
    list.appendChild(li);
  });
}

function resetGame() {
  birdY = canvas.height / 2;
  birdV = 0;
  pipes = [];
  score = 0;
  gameOver = false;
  const spacing = PIPE_SPACING[currentMode];
  for (let i = 0; i < 3; i++) {
    pipes.push({
      x: 400 + i * spacing,
      h: Math.random() * 250 + 50
    });
  }
}

function drawBird() {
  ctx.fillStyle = '#FFD700';
  ctx.beginPath();
  ctx.arc(80, birdY, BIRD_SIZE / 2, 0, Math.PI * 2);
  ctx.fill();
}

function drawPipes() {
  ctx.fillStyle = '#228B22';
  pipes.forEach(pipe => {
    // Top pipe
    ctx.fillRect(pipe.x, 0, PIPE_WIDTH, pipe.h);
    // Bottom pipe
    ctx.fillRect(pipe.x, pipe.h + PIPE_GAP, PIPE_WIDTH, canvas.height - pipe.h - PIPE_GAP);
  });
}

function drawScore() {
  ctx.fillStyle = '#fff';
  ctx.font = '32px Arial';
  ctx.fillText(score, 20, 50);
  ctx.font = '16px Arial';
  ctx.fillText('최고점수: ' + highScore, 20, 75);
}

function update() {
  if (gameOver) return;
  birdV += GRAVITY;
  birdY += birdV;

  // Bird hits ground or ceiling
  if (birdY + BIRD_SIZE / 2 > canvas.height || birdY - BIRD_SIZE / 2 < 0) {
    gameOver = true;
    if (score > highScore) highScore = score;
    updateRankings(score);
  }

  // Move pipes
  pipes.forEach(pipe => {
    pipe.x -= currentSpeed;
  });

  // Add new pipe
  if (pipes[0].x < -PIPE_WIDTH) {
    pipes.shift();
    const spacing = PIPE_SPACING[currentMode];
    pipes.push({
      x: pipes[pipes.length - 1].x + spacing,
      h: Math.random() * 250 + 50
    });
    score++;
  }

  // Collision detection
  pipes.forEach(pipe => {
    if (
      80 + BIRD_SIZE / 2 > pipe.x &&
      80 - BIRD_SIZE / 2 < pipe.x + PIPE_WIDTH &&
      (birdY - BIRD_SIZE / 2 < pipe.h || birdY + BIRD_SIZE / 2 > pipe.h + PIPE_GAP)
    ) {
      gameOver = true;
      if (score > highScore) highScore = score;
      updateRankings(score);
    }
  });
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawPipes();
  drawBird();
  drawScore();
  if (gameOver) {
    ctx.fillStyle = 'rgba(0,0,0,0.5)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#fff';
    ctx.font = '40px Arial';
    ctx.fillText('게임 오버', 110, 250);
    ctx.font = '20px Arial';
    ctx.fillText('스페이스바/클릭: 재시작', 110, 300);
  }
}

function gameLoop() {
  update();
  draw();
  requestAnimationFrame(gameLoop);
}

function flap() {
  if (!gameOver) {
    birdV = FLAP;
  }
}

document.addEventListener('keydown', e => {
  if (e.code === 'Space') {
    if (!gameOver) {
      flap();
    } else {
      resetGame();
    }
  }
});
canvas.addEventListener('mousedown', () => {
  if (!gameOver) {
    flap();
  } else {
    resetGame();
  }
});
canvas.addEventListener('touchstart', () => {
  if (!gameOver) {
    flap();
  } else {
    resetGame();
  }
});

// Speed buttons
function setSpeed(mode) {
  currentSpeed = SPEEDS[mode];
  currentMode = mode;
  document.getElementById('easyBtn').classList.remove('active');
  document.getElementById('normalBtn').classList.remove('active');
  document.getElementById('hardBtn').classList.remove('active');
  document.getElementById(mode + 'Btn').classList.add('active');
  resetGame();
}
document.getElementById('easyBtn').onclick = () => setSpeed('easy');
document.getElementById('normalBtn').onclick = () => setSpeed('normal');
document.getElementById('hardBtn').onclick = () => setSpeed('hard');

// Ranking
loadRankings();
renderRankings();

resetGame();
gameLoop();

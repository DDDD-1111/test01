const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// 게임 설정
const box = 20; // 스네이크와 먹이의 크기
let snake = [{ x: 8 * box, y: 10 * box }]; // 시작 위치
let food = { 
  x: Math.floor(Math.random() * 20) * box, 
  y: Math.floor(Math.random() * 20) * box 
};
let score = 0;
let direction;

// 키 입력 감지
document.addEventListener("keydown", changeDirection);

function changeDirection(event) {
  const key = event.keyCode;
  if (key === 37 && direction !== "RIGHT") direction = "LEFT";
  else if (key === 38 && direction !== "DOWN") direction = "UP";
  else if (key === 39 && direction !== "LEFT") direction = "RIGHT";
  else if (key === 40 && direction !== "UP") direction = "DOWN";
}

// 먹이 생성
function drawFood() {
  ctx.fillStyle = "red";
  ctx.fillRect(food.x, food.y, box, box);
}

// 스네이크 그리기
function drawSnake() {
  for (let i = 0; i < snake.length; i++) {
    ctx.fillStyle = i === 0 ? "green" : "lightgreen";
    ctx.fillRect(snake[i].x, snake[i].y, box, box);
  }
}

// 게임 실행
function drawGame() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  drawFood();
  drawSnake();

  // 스네이크 이동
  let snakeX = snake[0].x;
  let snakeY = snake[0].y;

  if (direction === "LEFT") snakeX -= box;
  if (direction === "UP") snakeY -= box;
  if (direction === "RIGHT") snakeX += box;
  if (direction === "DOWN") snakeY += box;

  // 먹이 먹기
  if (snakeX === food.x && snakeY === food.y) {
    score++;
    food = { 
      x: Math.floor(Math.random() * 20) * box, 
      y: Math.floor(Math.random() * 20) * box 
    };
  } else {
    snake.pop();
  }

  // 새로운 머리 위치 추가
  const newHead = { x: snakeX, y: snakeY };

  // 게임 오버 조건
  if (
    snakeX < 0 || snakeY < 0 || 
    snakeX >= canvas.width || snakeY >= canvas.height || 
    collision(newHead, snake)
  ) {
    clearInterval(game);
    alert("Game Over! Score: " + score);
    return;
  }

  snake.unshift(newHead);

  // 점수 표시
  document.getElementById("score").innerText = "Score: " + score;
}

// 충돌 검사
function collision(head, snake) {
  for (let i = 0; i < snake.length; i++) {
    if (head.x === snake[i].x && head.y === snake[i].y) return true;
  }
  return false;
}

// 게임 실행
let game = setInterval(drawGame, 100);


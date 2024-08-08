const playBtn = document.querySelector(".play__btn");
const retryBtn = document.querySelector(".retry__btn");
const timer = document.querySelector(".timer");
const counter = document.querySelector(".counter");
const container = document.querySelector(".container");
const modal = document.querySelector(".modal");
const modalText = document.querySelector(".modal .text");

const __TIME__ = 10;
let interval;
let carrotCount = 10;
let isGameStart = false;

playBtn.addEventListener("click", () => {
  if (isGameStart) {
    stopGame();
    return;
  }

  startGame();
});

container.addEventListener("click", (evt) => {
  if (!isGameStart) {
    return;
  }

  const target = evt.target;
  const targetClass = target.getAttribute("class");
  if (targetClass === "carrot") {
    target.style.display = "none";
    setCounterText(--carrotCount);
    if (carrotCount === 0) {
      modalText.innerText = "you won!";
      modal.style.display = "block";
      stopGame();
    }
  } else if (targetClass === "bug") {
    modalText.innerText = "you lost";
    modal.style.display = "block";
    stopGame();
  }
});

retryBtn.addEventListener("click", () => {
  resetGame();
});

function startGame() {
  isGameStart = true;
  setTimer();
  carrotsAndBugs();
  setCounterText(carrotCount);
  togglePlayButton(true);
  modal.style.display = "none";
}

function stopGame() {
  isGameStart = false;
  clearInterval(interval);
  togglePlayButton(false);
}

function resetGame() {
  stopGame();
  setTimerText(0);
  setCounterText(0);
  carrotCount = 10;
  modal.style.display = "none";
}

function togglePlayButton(play) {
  isGameStart = play;

  if (play) {
    playBtn.classList.add("play__btn--stop");
    playBtn.classList.remove("play__btn--play");
  } else {
    playBtn.classList.remove("play__btn--stop");
    playBtn.classList.add("play__btn--play");
  }
}

function setTimerText(text) {
  timer.innerText = `0:${text}`;
}

function setTimer() {
  let time = __TIME__;
  setTimerText(time);
  interval = setInterval(() => {
    setTimerText(--time);
    if (time <= 0) {
      stopGame(false);

      modalText.innerText = "you lost";
      modal.style.display = "block";

      return;
    }
  }, 1000);
}

function carrotsAndBugs() {
  document.querySelectorAll(".carrot").forEach(setPosition);
  document.querySelectorAll(".bug").forEach(setPosition);
}

function randomNum(min, max) {
  return Math.floor(Math.random() * max + min);
}

function getPosition() {
  // rect.top ~ rect.bottom, rect.left ~ rect.right
  const rect = container.getBoundingClientRect();

  let top = randomNum(0, rect.height);
  // if (top > rect.height) top -= rect.height;
  // if (top < rect.top) top += rect.top;

  let left = randomNum(rect.left, rect.width);
  // if (left > rect.right) top -= rect.right;
  // if (left < rect.left) top += rect.left;

  return [top, left];
}

function setPosition(el) {
  const [top, left] = getPosition();
  el.style.top = `${top}px`;
  el.style.left = `${left}px`;
  el.style.display = "block";
}

function setCounterText(text) {
  counter.innerText = text;
}

"use strict";

const IMAGE_SIZE = 80;
const COUNT = 5;
const GAME_DURATION = 5;

const field = document.querySelector(".game__field");
const fieldRect = field.getBoundingClientRect();
const gameBtn = document.querySelector(".game__button");
const gameTimer = document.querySelector(".game__timer");
const gameScore = document.querySelector(".game__score");

const popup = document.querySelector(".pop-up");
const popupText = document.querySelector(".pop-up__message");
const popupRefresh = document.querySelector(".pop-up__refresh");

let started = false;
let score = 0;
let timer = undefined;

field.addEventListener("click", onFieldClick);
gameBtn.addEventListener("click", () => {
  if (started) {
    stopGame();
  } else {
    startGame();
  }
});
popupRefresh.addEventListener("click", () => {
  startGame();
  hidePopup();
});

function startGame() {
  started = true;
  initGame();
  showStopButton();
  showTimerAndScore();
  startGameTimer();
}

function stopGame() {
  started = false;
  stopGameTimer();
  hideGameButton();
  showPopupWithText("REPLAY? 😃");
}

function finishGame(win) {
  started = false;
  hideGameButton();
  stopGameTimer();
  showPopupWithText(win ? "YOU WON 🎉" : "YOU LOST 💩");
}

function showStopButton() {
  const icon = gameBtn.querySelector(".fas");
  icon.classList.add("fa-stop");
  icon.classList.remove("fa-play");
  gameBtn.style.visibility = "visible";
}

function hideGameButton() {
  gameBtn.style.visibility = "hidden";
}

function showTimerAndScore() {
  gameTimer.style.visibility = "visible";
  gameScore.style.visibility = "visible";
}

function startGameTimer() {
  let remainingTimeSec = GAME_DURATION;
  updateTimerText(remainingTimeSec);
  timer = setInterval(() => {
    if (remainingTimeSec <= 0) {
      clearInterval(timer);
      finishGame(score === COUNT);
      return;
    }
    updateTimerText(--remainingTimeSec);
  }, 1000);
}

function stopGameTimer() {
  clearInterval(timer);
}

function updateTimerText(time) {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  gameTimer.innerText = `${minutes}:${seconds}`;
}

function showPopupWithText(text) {
  popupText.innerText = text;
  popup.classList.remove("pop-up--hide");
}

function hidePopup() {
  popup.classList.add("pop-up--hide");
}

function initGame() {
  score = 0;
  field.innerHTML = "";
  gameScore.innerText = COUNT;

  addItem("carrot", COUNT, "img/carrot.png");
  addItem("bug", COUNT, "img/bug.png");
}

function onFieldClick(event) {
  if (!started) {
    return;
  }
  const target = event.target;

  if (target.matches(".carrot")) {
    target.remove();
    score++;
    updateScoreBoard();
    if (score === COUNT) {
      finishGame(true);
    }
  } else if (target.matches(".bug")) {
    stopGameTimer();
    finishGame(false);
  }
}

function updateScoreBoard() {
  gameScore.innerText = COUNT - score;
}

function addItem(className, count, imgPath) {
  const x1 = 0;
  const y1 = 0;
  const x2 = fieldRect.width - IMAGE_SIZE;
  const y2 = fieldRect.height - IMAGE_SIZE;

  for (let i = 0; i < count; i++) {
    const item = document.createElement("img");
    item.setAttribute("class", className);
    item.setAttribute("src", imgPath);
    item.style.position = "absolute";
    const x = randomNumber(x1, x2);
    const y = randomNumber(y1, y2);
    item.style.top = `${y}px`;
    item.style.left = `${x}px`;
    field.appendChild(item);
  }
}

function randomNumber(min, max) {
  return Math.random() * (max - min) + min;
}

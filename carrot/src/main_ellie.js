"use strict";

import Popup from "./popup.js";
import Field from "./field.js";
import Game from "./game.js";
import * as sound from "./sound.js";

const COUNT = 5;
const GAME_DURATION = 5;

let started = false;
let score = 0;
let timer = undefined;

const gameFinishBanner = new Popup();
const gameField = new Field(COUNT);
const game = new Game(COUNT, GAME_DURATION);

gameField.setClickListener(onFieldClick);
game.setClickListener(() => {
  if (started) {
    stopGame();
  } else {
    startGame();
  }
});
gameFinishBanner.setClickListener(startGame);

function startGame() {
  started = true;
  initGame();
  game.showStopButton();
  game.showTimerAndScore();
  startGameTimer();
  sound.playBgSound();
}

function stopGame() {
  started = false;
  game.stopGameTimer();
  game.hideGameButton();
  gameFinishBanner.showWithText("REPLAY? 😃");
  sound.playAlertSound();
  sound.stopBgSound();
}

function finishGame(win) {
  started = false;
  game.hideGameButton();
  win ? sound.playWinSound() : sound.playBugSound();
  stopGameTimer();
  sound.stopBgSound();
  gameFinishBanner.showWithText(win ? "YOU WON 🎉" : "YOU LOST 💩");
}

function startGameTimer() {
  let remainingTimeSec = GAME_DURATION;
  game.updateTimerText(remainingTimeSec);
  timer = setInterval(() => {
    if (remainingTimeSec <= 0) {
      clearInterval(timer);
      finishGame(score === COUNT);
      return;
    }
    game.updateTimerText(--remainingTimeSec);
  }, 1000);
}

function stopGameTimer() {
  clearInterval(timer);
}

function initGame() {
  score = 0;
  game.updateScoreBoard(COUNT);
  gameField.init();
}

function onFieldClick(event) {
  if (!started) {
    return;
  }

  if (event === "carrot") {
    score++;
    game.updateScoreBoard(COUNT - score);
    sound.playCarrotSound();
    if (score === COUNT) {
      finishGame(true);
    }
  } else if (event === "bug") {
    finishGame(false);
  }
}

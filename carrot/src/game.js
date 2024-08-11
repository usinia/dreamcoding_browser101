"use strict";

import Field from "./field.js";
import * as sound from "./sound.js";

export default class Game {
  constructor(gameDuration, count) {
    this.gameDuration = gameDuration;
    this.count = count;

    this.gameBtn = document.querySelector(".game__button");
    this.gameTimer = document.querySelector(".game__timer");
    this.gameScore = document.querySelector(".game__score");

    this.field = new Field(count);
    this.field.setClickListener(this.onItemClick);

    this.gameBtn.addEventListener("click", () => {
      if (this.started) {
        this.stop();
      } else {
        this.start();
      }
    });

    this.started = false;
    this.score = 0;
    this.timer = undefined;
  }

  setGameStopListener(onGameStop) {
    this.onGameStop = onGameStop;
  }

  onItemClick = (item) => {
    if (!this.started) {
      return;
    }

    if (item === "carrot") {
      this.score++;
      this.updateScoreBoard(this.count - this.score);
      sound.playCarrotSound();
      if (this.score === this.count) {
        this.finish(true);
      }
    } else if (item === "bug") {
      this.finish(false);
    }
  };

  start() {
    this.started = true;
    this.init();
    this.showStopButton();
    this.showTimerAndScore();
    this.startTimer();
    sound.playBgSound();
  }

  stop() {
    this.started = false;
    this.stopTimer();
    this.hideGameButton();
    this.onGameStop("cancel");
    sound.playAlertSound();
    sound.stopBgSound();
  }

  finish(win) {
    this.started = false;
    this.hideGameButton();
    win ? sound.playWinSound() : sound.playBugSound();
    this.stopTimer();
    sound.stopBgSound();
    this.onGameStop(this.win ? "win" : "lose");
  }

  startTimer() {
    let remainingTimeSec = this.gameDuration;
    this.updateTimerText(remainingTimeSec);
    this.timer = setInterval(() => {
      if (remainingTimeSec <= 0) {
        clearInterval(this.timer);
        this.finish(this.score === this.count);
        return;
      }
      this.updateTimerText(--remainingTimeSec);
    }, 1000);
  }

  stopTimer() {
    clearInterval(this.timer);
  }

  init() {
    this.score = 0;
    this.updateScoreBoard(this.count);
    this.field.init();
  }

  showStopButton() {
    const icon = this.gameBtn.querySelector(".fas");
    icon.classList.add("fa-stop");
    icon.classList.remove("fa-play");
    this.gameBtn.style.visibility = "visible";
  }

  hideGameButton() {
    this.gameBtn.style.visibility = "hidden";
  }

  showTimerAndScore() {
    this.gameTimer.style.visibility = "visible";
    this.gameScore.style.visibility = "visible";
  }

  updateTimerText(time) {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    this.gameTimer.innerText = `${minutes}:${seconds}`;
  }

  updateScoreBoard(text) {
    this.gameScore.innerText = text;
  }
}

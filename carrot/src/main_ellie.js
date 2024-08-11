"use strict";

import Popup from "./popup.js";
import { GameBuilder, Reason } from "./game.js";
import * as sound from "./sound.js";

const COUNT = 5;
const GAME_DURATION = 5;

const gameFinishBanner = new Popup();
const gameBuilder = new GameBuilder()
  .withGameDuration(GAME_DURATION)
  .withCount(COUNT)
  .build();

gameBuilder.setGameStopListener((reason) => {
  let message;
  switch (reason) {
    case Reason.win:
      message = "YOU WON 🎉";
      sound.playWinSound();
      break;
    case Reason.lose:
      message = "YOU LOST 💩";
      sound.playBugSound();
      break;
    case Reason.cancel:
      message = "Replay❓";
      sound.playAlertSound();
      break;
    default:
      throw new Error("not valid reason");
  }
  gameFinishBanner.showWithText(message);
});

gameFinishBanner.setClickListener(() => {
  gameBuilder.start();
});

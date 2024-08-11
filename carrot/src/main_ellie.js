"use strict";

import Popup from "./popup.js";
import GameBuilder from "./game.js";

const COUNT = 5;
const GAME_DURATION = 5;

const gameBuilder = new GameBuilder()
  .withGameDuration(GAME_DURATION)
  .withCount(COUNT)
  .build();

const gameFinishBanner = new Popup();
gameBuilder.setGameStopListener((reason) => {
  let message;
  switch (reason) {
    case "win":
      message = "YOU WON 🎉";
      break;
    case "lose":
      message = "YOU LOST 💩";
      break;
    case "cancel":
      message = "Replay❓";
      break;
    default:
      throw new Error("not valid reason");
  }
  gameFinishBanner.showWithText(message);
});

gameFinishBanner.setClickListener(() => {
  gameBuilder.start();
});

"use strict";

import Popup from "./popup.js";
import Game from "./game.js";

const COUNT = 5;
const GAME_DURATION = 5;

const game = new Game(GAME_DURATION, COUNT);

const gameFinishBanner = new Popup();
game.setGameStopListener((reason) => {
  console.log("setGameStopListener", reason);
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
  game.start();
});

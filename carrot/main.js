const playBtn = document.querySelector(".play__btn");
const timer = document.querySelector(".timer");
const container = document.querySelector(".container");

const __TIME__ = 10;
let interval;

playBtn.addEventListener("click", () => {
  // stop
  if (playBtn.classList.contains("play__btn--stop")) {
    togglePlayButton(false);
    return;
  }

  // play
  let time = __TIME__;
  setTimerText(time);
  interval = setInterval(() => {
    setTimerText(--time);
    if (time <= 0) {
      togglePlayButton(false);
      return;
    }
  }, 1000);

  togglePlayButton(true);
});

function togglePlayButton(play) {
  if (play) {
    playBtn.classList.add("play__btn--stop");
    playBtn.classList.remove("play__btn--play");
  } else {
    playBtn.classList.remove("play__btn--stop");
    playBtn.classList.add("play__btn--play");

    clearInterval(interval);
  }
}

function setTimerText(text) {
  timer.innerText = `0:${text}`;
}

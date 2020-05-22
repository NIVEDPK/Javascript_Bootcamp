class Timer {
  constructor(durationInput, startTimer, pauseTimer) {
    this.durationInput = durationInput;
    this.startTimer = startTimer;
    this.pauseTimer = pauseTimer;

    this.startTimer.addEventListener("click", this.start);
    this.pauseTimer.addEventListener("click", this.pause);
  }

  start = () => {
    this.tick();
    this.intervalId = setInterval(this.tick, 1000);
  };

  tick = () => {
    console.log(this.durationInput.value);
    this.durationInput.value = parseInt(this.durationInput.value) - 1;
  };

  pause = () => {
    clearInterval(this.intervalId);
  };
}

const durationInput = document.querySelector("#duration");

const startTimer = document.querySelector("#start");

const pauseTimer = document.querySelector("#pause");

new Timer(durationInput, startTimer, pauseTimer);

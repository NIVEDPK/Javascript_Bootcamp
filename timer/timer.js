class Timer {
  constructor(durationInput, startTimer, pauseTimer, callbacks) {
    this.durationInput = durationInput;
    this.startTimer = startTimer;
    this.pauseTimer = pauseTimer;

    if (callbacks) {
      this.onStart = callbacks.onStart;
      this.onTick = callbacks.onTick;
      this.onComplete = callbacks.onComplete;
    }

    this.startTimer.addEventListener("click", this.start);
    this.pauseTimer.addEventListener("click", this.pause);
  }

  get timeRemaining() {
    return parseFloat(this.durationInput.value);
  }

  set timeRemaining(time) {
    this.durationInput.value = time.toFixed(2);
  }

  start = () => {
    if (this.onStart) {
      this.onStart(this.timeRemaining);
    }

    this.tick();
    this.intervalId = setInterval(this.tick, 20);
  };

  pause = () => {
    clearInterval(this.intervalId);
  };

  tick = () => {
    if (this.timeRemaining <= 0) {
      if (this.onComplete) {
        this.onComplete();
      }
      this.pause();
    } else {
      this.timeRemaining = this.timeRemaining - 0.02;
      if (this.onTick) {
        this.onTick(this.timeRemaining);
      }
    }
    // const timeRemaining = this.timeRemaining; using getter to retrieve integer value
    // this.timeRemaining = timeRemaining - 1;  reducing time and setting the variable
  };
}

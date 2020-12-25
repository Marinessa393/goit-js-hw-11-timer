import { Container } from "postcss";
import css from "./css/styles.css";
import flatpickr from "flatpickr";
import refs from "./refs.js";
require("flatpickr/dist/themes/confetti.css");
// const fpickr = require("flatpickr");

const dateTime = flatpickr(refs.input, {
  enableTime: true,
  dateFormat: "Y-m-d H:i",
});

function updateClockface() {
  const time = timer.targetDate - Date.now();
  let days = pad(Math.floor(time / 1000 / 60 / 60 / 24));
  let hours = pad(
    Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
  );
  let mins = pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
  let secs = pad(Math.floor((time % (1000 * 60)) / 1000));
  refs.days.textContent = `${days}`;
  refs.hours.textContent = `${hours}`;
  refs.mins.textContent = `${mins}`;
  refs.secs.textContent = `${secs}`;
}

function pad(value) {
  return String(value).padStart(2, "0");
}
// ============================================

const timer = {
  isActive: false,
  intervalId: null,
  targetDate: new Date(),
  start() {
    this.targetDate = new Date(refs.input.value);
    if (this.targetDate < new Date()) {
      clearInterval(this.intervalId);
      return;
    }

    updateClockface();
    this.isActive = true;
    this.intervalId = setInterval(() => {
      updateClockface();
    }, 1000);
  },
  stop() {
    clearInterval(this.intervalId);
    this.intervalId = null;
    this.isActive = false;
  },
};

refs.btnStart.addEventListener("click", timer.start.bind(timer));
refs.btnStop.addEventListener("click", timer.stop.bind(timer));

const startBtn = document.querySelector("#start");
const pausetBtn = document.querySelector("#pause");
const stopBtn = document.querySelector("#stop");
const timer = document.querySelector(".timer");
const workNum = document.querySelector("#work");
const breakNum = document.querySelector("#break");

let isActive = false;
let workDuration;
let timeLeft;
let breakDuration;
let type = "work";

const toggle = (reset) => {
  if (reset) {
    //stop
    stopClock();
  } else {
    if (isActive === true) {
      //pause
      isActive = false;
      clearInterval(clockTimer);
    } else {
      //start
      isActive = true;
      clockTimer = setInterval(() => {
        stepDown();
        displayTimeLeft();
      }, 1000)
    }
  }
}

const displayTimeLeft = () => {
  const secondsLeft = timeLeft;
  let result = "";
  const seconds = secondsLeft % 60;
  const minutes = parseInt(secondsLeft / 60) % 60;
  let hours = parseInt(secondsLeft / 3600);

  function addZero(time) {
    return time < 10 ? `0${time}` : time;
  }

  if (hours > 0) result += `${hours}:`;
  result += `${addZero(minutes)}:${addZero(seconds)}`;
  timer.textContent = result;

}

const stopClock = () => {
  clearInterval(clockTimer);
  isActive = false;
  timeLeft = workDuration;
  displayTimeLeft();
  type = type === "work" ? "break" : "work";
}

const stepDown = () => {
  if (timeLeft > 0) {
    timeLeft--;
  } else if (timeLeft === 0) {
    if (type === "work") {
      timeLeft = breakDuration;
      type = "break";
    } else {
      timeLeft = workDuration;
      type = "work";
    }
  }
}

startBtn.addEventListener("click", () => {
  startBtn.setAttribute("disabled", true);
  pausetBtn.removeAttribute("disabled");
  stopBtn.removeAttribute("disabled");
  workDuration = parseInt(workNum.value) * 60;
  breakDuration = parseInt(breakNum.value) * 60;
  timeLeft = workDuration;
  workNum.setAttribute("disabled", true);
  breakNum.setAttribute("disabled", true);
  toggle();
})

pausetBtn.addEventListener("click", () => {
  pausetBtn.textContent = pausetBtn.textContent === "Pause" ? "Play" : "Pause";
  toggle();
})

stopBtn.addEventListener("click", () => {
  stopBtn.setAttribute("disabled", true);
  pausetBtn.setAttribute("disabled", true);
  workNum.removeAttribute("disabled");
  breakNum.removeAttribute("disabled");
  startBtn.removeAttribute("disabled");
  toggle(true);
})


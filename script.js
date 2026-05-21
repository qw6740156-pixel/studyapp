
let time = 25;
let totalTime = 25;

let interval;
let running = false;

let isBreak = false;

let sessions = localStorage.getItem("sessions") || 0;

const timerEl = document.getElementById("timer");
const sessionsEl = document.getElementById("sessions");
const modeEl = document.getElementById("mode");
const progressBar = document.getElementById("progress-bar");
const minutesInput = document.getElementById("minutes");

timerEl.innerText = time;

sessionsEl.innerText =
  "Completed Sessions: " + sessions;

updateProgressBar();

function startTimer() {

  if (running) return;

  running = true;

  time =
    parseInt(minutesInput.value) || 25;

  totalTime = time;

  timerEl.innerText = time;

  startCountdown();
}

function startCountdown() {

  clearInterval(interval);

  interval = setInterval(() => {

    time--;

    timerEl.innerText = time;

    updateProgressBar();

    if (time <= 0) {

      clearInterval(interval);

      running = false;

      if (!isBreak) {

        sessions++;

        localStorage.setItem(
          "sessions",
          sessions
        );

        sessionsEl.innerText =
          "Completed Sessions: " + sessions;

        startBreak();

      } else {

        startStudy();
      }
    }

  }, 1000);
}

function startBreak() {

  isBreak = true;

  modeEl.innerText = "Break Mode";

  time = 5;

  totalTime = 5;

  timerEl.innerText = time;

  running = true;

  startCountdown();
}

function startStudy() {

  isBreak = false;

  modeEl.innerText = "Study Mode";

  time =
    parseInt(minutesInput.value) || 25;

  totalTime = time;

  timerEl.innerText = time;

  running = true;

  startCountdown();
}

function pauseTimer() {

  clearInterval(interval);

  running = false;
}

function resetTimer() {

  clearInterval(interval);

  running = false;

  isBreak = false;

  modeEl.innerText = "Study Mode";

  time =
    parseInt(minutesInput.value) || 25;

  totalTime = time;

  timerEl.innerText = time;

  updateProgressBar();
}

function toggleDarkMode() {

  document.body.classList.toggle("dark");
}

function updateProgressBar() {

  let percent =
    Math.max(0, (time / totalTime) * 100);

  progressBar.style.width =
    percent + "%";
}

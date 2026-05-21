let time = 25 * 60;
let totalTime = 25 * 60;

let interval = null;
let running = false;
let isBreak = false;

let sessions =
  parseInt(localStorage.getItem("sessions")) || 0;

const timerEl =
  document.getElementById("timer");

const sessionsEl =
  document.getElementById("sessions");

const modeEl =
  document.getElementById("mode");

const progressBar =
  document.getElementById("progress-bar");

const minutesInput =
  document.getElementById("minutes");

const breakInput =
  document.getElementById("breakMinutes");

if (
  localStorage.getItem("darkMode") === "on"
) {
  document.body.classList.add("dark");
}

sessionsEl.innerText =
  "Completed Sessions: " + sessions;

updateTimerDisplay();
updateProgressBar();

function startTimer() {

  if (running) return;

  running = true;

  isBreak = false;

  modeEl.innerText = "Study Mode";

  time =
    Math.max(
      1,
      parseInt(minutesInput.value) || 25
    ) * 60;

  totalTime = time;

  updateTimerDisplay();

  startCountdown();
}

function startCountdown() {

  clearInterval(interval);

  interval = setInterval(() => {

    time--;

    updateTimerDisplay();

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

  time =
    Math.max(
      1,
      parseInt(breakInput.value) || 5
    ) * 60;

  totalTime = time;

  running = true;

  updateTimerDisplay();

  startCountdown();
}

function startStudy() {

  isBreak = false;

  modeEl.innerText = "Study Mode";

  time =
    Math.max(
      1,
      parseInt(minutesInput.value) || 25
    ) * 60;

  totalTime = time;

  running = true;

  updateTimerDisplay();

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
    Math.max(
      1,
      parseInt(minutesInput.value) || 25
    ) * 60;

  totalTime = time;

  updateTimerDisplay();

  updateProgressBar();
}

function toggleDarkMode() {

  document.body.classList.toggle("dark");

  if (
    document.body.classList.contains("dark")
  ) {

    localStorage.setItem(
      "darkMode",
      "on"
    );

  } else {

    localStorage.setItem(
      "darkMode",
      "off"
    );
  }
}

function updateTimerDisplay() {

  let minutes =
    Math.floor(time / 60);

  let seconds =
    time % 60;

  minutes =
    String(minutes).padStart(2, "0");

  seconds =
    String(seconds).padStart(2, "0");

  timerEl.innerText =
    minutes + ":" + seconds;
}

function updateProgressBar() {

  let percent =
    Math.max(
      0,
      (time / totalTime) * 100
    );

  progressBar.style.width =
    percent + "%";
}

et time = 25;
let totalTime = 25;
let interval;
let running = false;

let isBreak = false;

let sessions = localStorage.getItem("sessions") || 0;

document.getElementById("timer").innerText = time;

document.getElementById("sessions").innerText =
  "Completed Sessions: " + sessions;

updateProgressBar();

function startTimer() {

  if (running) return;

  time =
    parseInt(document.getElementById("minutes").value) || 25;

  totalTime = time;

  document.getElementById("timer").innerText = time;

  running = true;

  interval = setInterval(() => {

    time--;

    document.getElementById("timer").innerText = time;

    updateProgressBar();

    if (time <= 0) {

      clearInterval(interval);

      running = false;

      playSound();

      if (!isBreak) {

        sessions++;

        localStorage.setItem("sessions", sessions);

        document.getElementById("sessions").innerText =
          "Completed Sessions: " + sessions;

        startBreak();

      } else {

        startStudy();

      }
    }

  }, 1000);
}

function pauseTimer() {

  clearInterval(interval);

  running = false;
}

function resetTimer() {

  clearInterval(interval);

  running = false;

  isBreak = false;

  document.getElementById("mode").innerText =
    "Study Mode";

  time =
    parseInt(document.getElementById("minutes").value) || 25;

  totalTime = time;

  document.getElementById("timer").innerText = time;

  updateProgressBar();
}

function toggleDarkMode() {

  document.body.classList.toggle("dark");
}

function updateProgressBar() {

  let percent = (time / totalTime) * 100;

  document.getElementById("progress-bar").style.width =
    percent + "%";
}

function startBreak() {

  isBreak = true;

  time = 5;

  totalTime = 5;

  document.getElementById("mode").innerText =
    "Break Mode";

  document.getElementById("timer").innerText = time;

  startAuto();
}

function startStudy() {

  isBreak = false;

  time =
    parseInt(document.getElementById("minutes").value) || 25;

  totalTime = time;

  document.getElementById("mode").innerText =
    "Study Mode";

  document.getElementById("timer").innerText = time;

  startAuto();
}

function startAuto() {

  running = true;

  interval = setInterval(() => {

    time--;

    document.getElementById("timer").innerText = time;

    updateProgressBar();

    if (time <= 0) {

      clearInterval(interval);

      running = false;

      playSound();

      if (!isBreak) {

        sessions++;

        localStorage.setItem("sessions", sessions);

        document.getElementById("sessions").innerText =
          "Completed Sessions: " + sessions;

        startBreak();

      } else {

        startStudy();

      }
    }

  }, 1000);
}

function playSound() {

  let audio = new Audio(
    "https://actions.google.com/sounds/v1/alarms/alarm_clock.ogg"
  );

  audio.play();
}

if ("serviceWorker" in navigator) {

  navigator.serviceWorker.register("/studyapp/sw.js");
}

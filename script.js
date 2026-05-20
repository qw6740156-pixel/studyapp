let time = 25;
let interval;
let running = false;

document.getElementById("timer").innerText = time;

function startTimer() {
  if (running) return;

  time = parseInt(document.getElementById("minutes").value);

  running = true;

  interval = setInterval(() => {
    time--;
    document.getElementById("timer").innerText = time;

    if (time <= 0) {
      clearInterval(interval);
      alert("Time's up!");
      running = false;
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
  time = parseInt(document.getElementById("minutes").value);
  document.getElementById("timer").innerText = time;
}

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("/studyapp/sw.js");
}
